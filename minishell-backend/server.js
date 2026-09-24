import express from "express";
import cors from "cors";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import pty from "node-pty";
import { WebSocketServer } from "ws";

const app = express();

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const SANDBOX_IMAGE =
  process.env.MINISHELL_IMAGE || "isly-minishell:latest";

const MAX_COMMAND_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 4096;
const MAX_CONNECTIONS = 10;

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// Keep track of active websocket sessions.
const activeConnections = new Set();

// ============================================================================
// Utilities
// ============================================================================

function docker(args) {
  return new Promise((resolve, reject) => {
    execFile("docker", args, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }

      resolve(stdout.trim());
    });
  });
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  return origin === FRONTEND_ORIGIN;
}

// ============================================================================
// HTTP Routes
// ============================================================================

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    activeConnections: activeConnections.size,
  });
});

// ============================================================================
// Server
// ============================================================================

const server = app.listen(PORT, () => {
  console.log(`Minishell backend listening on http://localhost:${PORT}`);
});

// ============================================================================
// WebSocket
// ============================================================================

const wss = new WebSocketServer({
  server,
  path: "/api/minishell/ws",
});

wss.on("connection", (ws, req) => {
  const origin = req.headers.origin;

  if (!isAllowedOrigin(origin)) {
    ws.close(1008, "Invalid origin");
    return;
  }

  if (activeConnections.size >= MAX_CONNECTIONS) {
    ws.close(1013, "Server busy");
    return;
  }

  activeConnections.add(ws);

  const containerName = `minishell-${randomUUID()}`;

  console.log(`Starting container ${containerName}`);

  const terminal = pty.spawn(
    "docker",
    [
      "run",
      "-it",
      "--rm",
      "--name",
      containerName,
      "--network",
      "none",
      "--memory",
      "128m",
      "--memory-swap",
      "128m",
      "--read-only",
      "--tmpfs",
      "/tmp:rw,nosuid,nodev,noexec,size=16m",
      "--cap-drop",
      "ALL",
      "--security-opt",
      "no-new-privileges",
      "--user",
      "1000:1000",
      SANDBOX_IMAGE,
    ],
    {
      name: "xterm-256color",
      cols: 120,
      rows: 30,
      cwd: "/app",
      env: {
        TERM: "xterm-256color",
      },
    }
  );

  let ready = false;

  const startupTimeout = setTimeout(() => {
    if (!ready && ws.readyState === ws.OPEN) {
      ws.close(1013, "Container startup timeout");
    }
  }, 5000);

  const disposeOutput = terminal.onData((data) => {
    if (!ready) {
      ready = true;
      clearTimeout(startupTimeout);

      ws.send(JSON.stringify({ type: "ready" }));
    }

    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "output",
          data,
        })
      );
    }
  });

  terminal.onExit(() => {
    if (ws.readyState === ws.OPEN) {
      ws.close(1000, "Terminal exited");
    }
  });

  ws.on("message", (message) => {
    if (message.length > MAX_MESSAGE_LENGTH) return;

    try {
      const payload = JSON.parse(message.toString());

      if (payload.type === "input" && typeof payload.data === "string") {
        if (payload.data.length <= MAX_COMMAND_LENGTH) {
          terminal.write(payload.data);
        }
      }

      if (
        payload.type === "resize" &&
        Number.isInteger(payload.cols) &&
        Number.isInteger(payload.rows)
      ) {
        terminal.resize(
          Math.max(20, Math.min(payload.cols, 200)),
          Math.max(5, Math.min(payload.rows, 100))
        );
      }
    } catch {
      // Ignore malformed websocket messages.
    }
  });

  ws.on("close", async () => {
    console.log(`Destroying container ${containerName}`);

    clearTimeout(startupTimeout);
    disposeOutput.dispose();
    activeConnections.delete(ws);

    try {
      terminal.kill();
    } catch {}

    try {
      await docker(["rm", "-f", containerName]);
    } catch {}
  });

  ws.on("error", () => {
    ws.close();
  });
});