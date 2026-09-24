"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

const WS_URL =
  process.env.NEXT_PUBLIC_MINISHELL_WS ??
  "ws://localhost:4000/api/minishell/ws";

export default function InteractiveTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);

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

    terminal.writeln("\x1b[90mStarting Minishell container...\x1b[0m");

    const socket = new WebSocket(WS_URL);

    let isReady = false;

    socket.addEventListener("open", () => {
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

      switch (message.type) {
        case "ready":
          isReady = true;
          terminal.clear();
          break;

        case "output":
          terminal.write(message.data);
          break;
      }
    });

    socket.addEventListener("close", () => {
      if (!isReady) {
        terminal.writeln("\r\n\x1b[31mFailed to start Minishell.\x1b[0m");
      } else {
        terminal.writeln("\r\n\x1b[90mSession closed.\x1b[0m");
      }
    });

    socket.addEventListener("error", () => {
      terminal.writeln("\r\n\x1b[31mConnection error.\x1b[0m");
    });

    const dataDisposable = terminal.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "input",
            data,
          }),
        );
      }
    });

    const handleResize = () => {
      fitAddon.fit();

      if (socket.readyState === WebSocket.OPEN) {
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

    return () => {
      window.removeEventListener("resize", handleResize);
      dataDisposable.dispose();
      socket.close();
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