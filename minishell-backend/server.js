import express from "express";
import cors from "cors";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import pty from "node-pty";
import { WebSocketServer } from "ws";

const app = express();
const PORT = Number(process.env.PORT || 4000);
const SANDBOX_IMAGE = process.env.MINISHELL_IMAGE || "isly-minishell:latest";

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
}));

app.use(express.json({ limit: "8kb" }));

const MAX_COMMAND_LENGTH = 1000;
const sessions = new Map();

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

async function createSession() {
  const sessionId = randomUUID();
  const containerName = `minishell-${sessionId}`;
  const ptyProcess = pty.spawn(
    "docker",
    [
      "run",
      "-i",
      "-t",
      "--rm",
      "--name", containerName,
      "--network", "none",
      "--memory", "128m",
      "--memory-swap", "128m",
      "--pids-limit", "64",
      "--read-only",
      "--tmpfs", "/tmp:rw,nosuid,nodev,noexec,size=16m",
      "--cap-drop", "ALL",
      "--security-opt", "no-new-privileges",
      "--user", "1000:1000",
      SANDBOX_IMAGE,
    ],
    {
      name: "xterm-color",
      cols: 120,
      rows: 30,
      cwd: "/app",
      env: {
        ...process.env,
        TERM: "xterm-256color",
      },
    },
  );
  const session = {
    id: sessionId,
    containerName,
    pty: ptyProcess,
  };
  sessions.set(sessionId, session);
  ptyProcess.onExit(() => {
    sessions.delete(sessionId);
  });
  return session;
}

async function destroySession(session) {
  sessions.delete(session.id);

  try {
    session.pty.kill();
  } catch {}

  try {
    await docker(["rm", "-f", session.containerName]);
  } catch {}
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/minishell/session", async (_req, res) => {
  try {
    const session = await createSession();

    res.json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Failed to create Minishell session:", error);

    res.status(500).json({
      error: "Failed to create Minishell session.",
    });
  }
});

app.delete("/api/minishell/session/:id", async (req, res) => {
  const session = sessions.get(req.params.id);

  if (session) {
    await destroySession(session);
  }

  res.status(204).end();
});

const server = app.listen(PORT, () => {
  console.log(`Minishell backend listening on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({
  server,
  path: "/api/minishell/ws",
});

wss.on("connection", async (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    ws.close(1008, "Missing sessionId");
    return;
  }

  const session = sessions.get(sessionId);

  if (!session) {
    ws.close(1008, "Invalid session");
    return;
  }

  const dataDisposable = session.pty.onData((data) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({
        type: "output",
        data,
      }));
    }
  });

  ws.on("message", (message) => {
    try {
      const payload = JSON.parse(message.toString());

      if (payload.type === "input" && typeof payload.data === "string") {
        if (payload.data.length > MAX_COMMAND_LENGTH) {
          return;
        }

        session.pty.write(payload.data);
      }

      if (
        payload.type === "resize" &&
        Number.isInteger(payload.cols) &&
        Number.isInteger(payload.rows)
      ) {
        session.pty.resize(
          Math.max(20, Math.min(payload.cols, 200)),
          Math.max(5, Math.min(payload.rows, 100)),
        );
      }
    } catch {
      // Ignore malformed WebSocket messages.
    }
  });

  ws.on("close", () => {
    dataDisposable.dispose();
  });
});
