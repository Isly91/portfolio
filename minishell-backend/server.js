import express from "express";
import cors from "cors";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import pty from "node-pty";
import { WebSocketServer } from "ws";

const app = express();

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const SANDBOX_IMAGE = process.env.MINISHELL_IMAGE || "isly-minishell:latest";

const MAX_COMMAND_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 4096;
const MAX_SESSIONS = 10;
const SESSION_TIMEOUT_MS = 10 * 60 * 1000;

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json({ limit: "8kb" }));

const sessions = new Map();

// ============================================================================
// Utility Functions
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

function cleanupSession(session) {
  if (session.timeout) {
    clearTimeout(session.timeout);
    session.timeout = null;
  }
  if (session.ws && session.ws.readyState === session.ws.OPEN) {
    session.ws.close(1000, "Session expired");
  }
  sessions.delete(session.id);
}

async function destroySession(session) {
  cleanupSession(session);
  try {
    session.pty.kill();
  } catch {}
  try {
    await docker(["rm", "-f", session.containerName]);
  } catch {}
}

// ============================================================================
// Session Management
// ============================================================================

async function createSession() {
  if (sessions.size >= MAX_SESSIONS) {
    throw new Error("Maximum number of active sessions reached.");
  }

  const sessionId = randomUUID();
  const containerName = `minishell-${sessionId}`;

  const ptyProcess = pty.spawn("docker", [
    "run",
    "-i",
    "-t",
    "--rm",
    "--name", containerName,
    "--network", "none",
    "--memory", "128m",
    "--memory-swap", "128m",
    "--read-only",
    "--tmpfs", "/tmp:rw,nosuid,nodev,noexec,size=16m",
    "--cap-drop", "ALL",
    "--security-opt", "no-new-privileges",
    "--user", "1000:1000",
    SANDBOX_IMAGE,
  ], {
    name: "xterm-color",
    cols: 120,
    rows: 30,
    cwd: "/app",
    env: { ...process.env, TERM: "xterm-256color" },
  });

  const session = {
    id: sessionId,
    containerName,
    pty: ptyProcess,
    ws: null,
    timeout: null,
  };

  sessions.set(sessionId, session);

  session.timeout = setTimeout(() => {
    destroySession(session).catch((error) => {
      console.error("Failed to destroy expired session:", error);
    });
  }, SESSION_TIMEOUT_MS);

  ptyProcess.onExit(() => {
    cleanupSession(session);
  });

  return session;
}

// ============================================================================
// HTTP Routes
// ============================================================================

app.get("/health", (_req, res) => {
  res.json({ ok: true, sessions: sessions.size });
});

app.post("/api/minishell/session", async (_req, res) => {
  try {
    const session = await createSession();
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Failed to create Minishell session:", error);
    if (error instanceof Error && error.message === "Maximum number of active sessions reached.") {
      res.status(429).json({ error: "Too many active Minishell sessions." });
      return;
    }
    res.status(500).json({ error: "Failed to create Minishell session." });
  }
});

app.delete("/api/minishell/session/:id", async (req, res) => {
  const session = sessions.get(req.params.id);
  if (session) {
    await destroySession(session);
  }
  res.status(204).end();
});

// ============================================================================
// Server Initialization
// ============================================================================

const server = app.listen(PORT, () => {
  console.log(`Minishell backend listening on http://localhost:${PORT}`);
});

// ============================================================================
// WebSocket Server
// ============================================================================

const wss = new WebSocketServer({ server, path: "/api/minishell/ws" });

wss.on("connection", async (ws, req) => {
  const origin = req.headers.origin;

  // Validate origin
  if (!isAllowedOrigin(origin)) {
    ws.close(1008, "Invalid origin");
    return;
  }

  // Extract session ID from URL query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    ws.close(1008, "Missing sessionId");
    return;
  }

  // Retrieve session
  const session = sessions.get(sessionId);
  if (!session) {
    ws.close(1008, "Invalid session");
    return;
  }

  session.ws = ws;

  // Forward PTY output to WebSocket
  const dataDisposable = session.pty.onData((data) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "output", data }));
    }
  });

  // Handle WebSocket messages
  ws.on("message", (message) => {
    if (message.length > MAX_MESSAGE_LENGTH) return;

    try {
      const payload = JSON.parse(message.toString());

      // Handle terminal input
      if (payload.type === "input" && typeof payload.data === "string") {
        if (payload.data.length > MAX_COMMAND_LENGTH) return;
        session.pty.write(payload.data);
      }

      // Handle terminal resize
      if (payload.type === "resize" && Number.isInteger(payload.cols) && Number.isInteger(payload.rows)) {
        session.pty.resize(
          Math.max(20, Math.min(payload.cols, 200)),
          Math.max(5, Math.min(payload.rows, 100))
        );
      }
    } catch {
      // Ignore malformed WebSocket messages
    }
  });

  // Handle WebSocket disconnect
  ws.on("close", () => {
    dataDisposable.dispose();
    if (session.ws === ws) {
      session.ws = null;
    }
  });
});