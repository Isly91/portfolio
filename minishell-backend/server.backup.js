import express from "express";
import cors from "cors";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import pty from "node-pty";

const app = express();
const PORT = Number(process.env.PORT || 4000);
const SANDBOX_IMAGE = process.env.MINISHELL_IMAGE || "isly-minishell:latest";

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
}));

app.use(express.json({ limit: "8kb" }));

const MAX_COMMAND_LENGTH = 1000;
const TIMEOUT_MS = 5000;

function runMinishell(command) {
  return new Promise((resolve) => {
    const containerName = `minishell-${randomUUID()}`;

    const dockerArgs = [
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
    ];

    const shell = pty.spawn("docker", dockerArgs, {
      name: "xterm-color",
      cols: 120,
      rows: 30,
      cwd: "/app",
      env: {
        ...process.env,
        TERM: "xterm-256color",
      },
    });

    let output = "";
    let finished = false;

    const finish = (exitCode, stderr = "") => {
      if (finished) return;
      finished = true;

      resolve({
        id: randomUUID(),
        stdout: output,
        stderr,
        exitCode,
      });
    };

    const timeout = setTimeout(() => {
      if (finished) return;

      shell.kill();

      finish(124, "Command timed out.");
    }, TIMEOUT_MS);

    shell.onData((data) => {
      output += data;
    });

    shell.onExit(({ exitCode }) => {
      clearTimeout(timeout);

      if (!finished) {
        finish(exitCode);
      }
    });
    shell.write(`${command}\r`);
  });
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/minishell/run", async (req, res) => {
  const command = typeof req.body?.command === "string"
    ? req.body.command
    : "";

  if (!command.trim()) {
    return res.status(400).json({
      error: "Command is required.",
    });
  }

  if (command.length > MAX_COMMAND_LENGTH) {
    return res.status(413).json({
      error: `Command is too long. Maximum ${MAX_COMMAND_LENGTH} characters.`,
    });
  }

  try {
    const result = await runMinishell(command);
    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to run Minishell.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Minishell backend listening on http://localhost:${PORT}`);
});