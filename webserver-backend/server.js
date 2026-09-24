import express from "express";
import cors from "cors";
import { execFile } from "child_process";
import crypto from "crypto";
import { WebSocketServer } from "ws";

const app = express();

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const IMAGE = process.env.WEBSERVER_IMAGE || "isly-webserver:latest";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json({ limit: "16kb" }));

// sessionId -> containerName
const sessions = new Map();

// ============================================================================
// Utilities
// ============================================================================

function docker(args, encoding = "utf8") {
  return new Promise((resolve, reject) => {
    execFile(
      "docker",
      args,
      {
        maxBuffer: 10 * 1024 * 1024,
        encoding,
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }
        resolve(stdout);
      }
    );
  });
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return origin === FRONTEND_ORIGIN;
}

function validatePath(path) {
  if (typeof path !== "string" || !path.startsWith("/")) {
    throw new Error("Invalid path");
  }

  if (path.length > 512) {
    throw new Error("Path too long");
  }

  if (path.includes("..")) {
    throw new Error("Invalid path");
  }

  return path;
}

function validateMethod(method) {
  const allowed = ["GET", "POST", "DELETE"];

  if (!allowed.includes(method)) {
    throw new Error("Method not allowed");
  }

  return method;
}

// ============================================================================
// HTTP Routes
// ============================================================================

app.get("/health", (_, res) => {
  res.json({
    ok: true,
    sessions: sessions.size,
  });
});

// ----------------------------------------------------------------------------
// Send HTTP request to the C++ webserver running inside the container.
// ----------------------------------------------------------------------------

app.post("/api/webserver/request/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const containerName = sessions.get(sessionId);

    if (!containerName) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    const method = validateMethod(req.body.method || "GET");
    const path = validatePath(req.body.path || "/");

    const output = await docker(
      [
        "exec",
        containerName,
        "curl",
        "-sS",
        "--max-time",
        "5",
        "--path-as-is",
        "-i",
        "-X",
        method,
        `http://127.0.0.1:7000${path}`,
      ],
      "binary"
    );

    const separator = output.indexOf("\r\n\r\n");

    if (separator === -1) {
      return res.json({
        status: 0,
        headers: {},
        body: output,
      });
    }

    const headerPart = output.slice(0, separator);
    const bodyBuffer = Buffer.from(output.slice(separator + 4), "binary");

    const lines = headerPart.split("\r\n");
    const statusLine = lines.shift() || "";

    const statusMatch = statusLine.match(/HTTP\/[\d.]+\s+(\d+)/);

    const headers = {};

    for (const line of lines) {
      const index = line.indexOf(":");
      if (index === -1) continue;

      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();

      headers[key] = value;
    }

    const contentType =
      headers["Content-Type"] || headers["content-type"] || "";

    res.json({
      status: statusMatch ? Number(statusMatch[1]) : 0,
      headers,
      body: contentType.startsWith("image/")
        ? bodyBuffer.toString("base64")
        : bodyBuffer.toString("utf8"),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// ----------------------------------------------------------------------------
// Serve images, CSS and JS from the sandbox container.
// ----------------------------------------------------------------------------

app.get("/api/webserver/file/:sessionId/*path", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const containerName = sessions.get(sessionId);

    if (!containerName) {
      return res.sendStatus(404);
    }

    const filePath = "/" + req.params.path.join("/");

    const output = await docker(
      [
        "exec",
        containerName,
        "curl",
        "-sS",
        "--path-as-is",
        "-i",
        `http://127.0.0.1:7000${filePath}`,
      ],
      "binary"
    );

    const separator = output.indexOf("\r\n\r\n");

    if (separator === -1) {
      return res.sendStatus(500);
    }

    const headerPart = output.slice(0, separator);
    const body = Buffer.from(output.slice(separator + 4), "binary");

    const match = headerPart.match(/Content-Type:\s*(.+)/i);

    res.setHeader(
      "Content-Type",
      match ? match[1].trim() : "application/octet-stream"
    );

    res.send(body);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// ============================================================================
// HTTP Server
// ============================================================================

const server = app.listen(PORT, () => {
  console.log(`Webserver backend listening on port ${PORT}`);
});

// ============================================================================
// WebSocket (owns the Docker container lifecycle)
// ============================================================================

const wss = new WebSocketServer({
  server,
  path: "/api/webserver/ws",
});

wss.on("connection", async (ws, req) => {
  const origin = req.headers.origin;

  if (!isAllowedOrigin(origin)) {
    ws.close(1008, "Invalid origin");
    return;
  }

  const sessionId = crypto.randomUUID();
  const containerName = `portfolio-webserv-${sessionId}`;

  let cleaned = false;

  async function cleanup() {
    if (cleaned) return;
    cleaned = true;

    console.log(`Destroying ${containerName}`);

    sessions.delete(sessionId);

    try {
      await docker(["rm", "-f", containerName]);
    } catch (err) {
      console.error(err);
    }
  }

  try {
    console.log(`Starting ${containerName}`);

    await docker([
      "run",
      "-d",
      "--name",
      containerName,
      "--network",
      "none",
      "--memory",
      "128m",
      "--memory-swap",
      "128m",
      "--pids-limit",
      "64",
      "--cap-drop",
      "ALL",
      "--security-opt",
      "no-new-privileges",
      IMAGE,
    ]);

    sessions.set(sessionId, containerName);

    ws.send(
      JSON.stringify({
        type: "ready",
        sessionId,
      })
    );

    ws.on("close", cleanup);
    ws.on("error", cleanup);
  } catch (err) {
    console.error(err);

    await cleanup();

    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Failed to start Webserver sandbox.",
        })
      );
    }

    ws.close();
  }
});