"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

const API_URL = "http://localhost:4000";

export default function InteractiveTerminal() {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      fontFamily: "monospace",
      fontSize: 14,
      theme: {
        background: "#000000",
        foreground: "#00ff00",
      },
    });

    const fitAddon = new FitAddon();

    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();

    let socket: WebSocket | null = null;
    let sessionId: string | null = null;
    let disposed = false;

    const startSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/minishell/session`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to create Minishell session");
        }

        const data = await response.json();

        if (disposed) return;

        sessionId = data.sessionId;

        socket = new WebSocket(
          `ws://localhost:4000/api/minishell/ws?sessionId=${sessionId}`,
        );

        socket.addEventListener("open", () => {
          if (!socket) return;

          socket.send(
            JSON.stringify({
              type: "resize",
              cols: terminal.cols,
              rows: terminal.rows,
            }),
          );
        });

        socket.addEventListener("message", (event) => {
          const message = JSON.parse(event.data);

          if (message.type === "output") {
            terminal.write(message.data);
          }
        });

        socket.addEventListener("error", () => {
          terminal.write("\r\n\x1b[31mConnection error.\x1b[0m\r\n");
        });

        terminal.onData((data) => {
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                type: "input",
                data,
              }),
            );
          }
        });
      } catch {
        terminal.write(
          "\x1b[31mFailed to start Minishell.\x1b[0m\r\n",
        );
      }
    };

    const handleResize = () => {
      fitAddon.fit();

      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "resize",
            cols: terminal.cols,
            rows: terminal.rows,
          }),
        );
      }
    };

    window.addEventListener("resize", handleResize);

    startSession();

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);

      socket?.close();

      if (sessionId) {
        fetch(`${API_URL}/api/minishell/session/${sessionId}`, {
          method: "DELETE",
        }).catch(() => {});
      }

      terminal.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      className="min-h-[320px] w-full p-6"
    />
  );
}