"use client";

import { useEffect, useMemo, useState } from "react";

const API = "http://localhost:5000";
const WS = "ws://localhost:5000/api/webserver/ws";

type ResponseData = {
  status: number;
  headers: Record<string, string>;
  body: string;
};

export default function WebserverDemo() {
  const [session, setSession] = useState("");
  const [path, setPath] = useState("/www/");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // Create / destroy sandbox through WebSocket
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const ws = new WebSocket(WS);

    ws.onopen = () => {
      setStarting(true);
      setError("");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "ready") {
        setSession(message.sessionId);
        setStarting(false);
      }

      if (message.type === "error") {
        setError(message.message);
        setStarting(false);
      }
    };

    ws.onerror = () => {
      setError("WebSocket connection failed.");
      setStarting(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Send HTTP request to sandbox
  // ---------------------------------------------------------------------------

  async function sendRequest() {
    if (!session || loading) return;

    try {
      setLoading(true);
      setError("");
      setResponse(null);

      const r = await fetch(
        `${API}/api/webserver/request/${session}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method,
            path,
          }),
        }
      );

      if (!r.ok) {
        throw new Error(await r.text());
      }

      const data: ResponseData = await r.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      sendRequest();
    }
  }

  // ---------------------------------------------------------------------------
  // Rewrite HTML asset URLs
  // ---------------------------------------------------------------------------

  const htmlPreview = useMemo(() => {
    if (!response || !session) return "";

    return response.body
      .replace(
        /src="\/([^"]+)"/g,
        `src="${API}/api/webserver/file/${session}/$1"`
      )
      .replace(
        /src="([^"/][^"]*)"/g,
        `src="${API}/api/webserver/file/${session}/www/$1"`
      )
      .replace(
        /href="\/([^"]+)"/g,
        `href="${API}/api/webserver/file/${session}/$1"`
      )
      .replace(
        /href="([^"/][^"]*)"/g,
        `href="${API}/api/webserver/file/${session}/www/$1"`
      );
  }, [response, session]);

  const contentType =
    response?.headers["content-type"] ??
    response?.headers["Content-Type"] ??
    "";

  // ---------------------------------------------------------------------------

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />

        <p className="ml-3 font-mono text-xs text-zinc-500">
          webserv · sandbox
        </p>

        <div className="ml-auto flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              starting
                ? "bg-yellow-400"
                : error
                ? "bg-red-400"
                : "bg-green-400"
            }`}
          />

          <span className="text-xs text-zinc-500">
            {starting
              ? "starting"
              : error
              ? "error"
              : "online"}
          </span>
        </div>
      </div>

      {/* Request */}
      <div className="border-b border-zinc-800 p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            disabled={starting || loading}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm outline-none"
          >
            <option>GET</option>
            <option>DELETE</option>
          </select>

          <input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            disabled={starting || loading}
            placeholder="/www/"
            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm outline-none"
          />

          <button
            onClick={sendRequest}
            disabled={starting || loading || !session}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

        <p className="mt-2 font-mono text-xs text-zinc-600">
          Try GET: /www/ · /img/ · /test/
        </p>
        <p className="mt-2 font-mono text-xs text-zinc-600">
          Try DELETE /www/ and then GET /www/
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="border-b border-red-900/50 bg-red-950/30 px-4 py-3">
          <p className="font-mono text-sm text-red-400">
            Error: {error}
          </p>
        </div>
      )}

      {/* Response */}
      <div className="min-h-[260px] p-4">
        {!response && !error && (
          <div className="flex min-h-[220px] items-center justify-center">
            <p className="font-mono text-sm text-zinc-500">
              {starting
                ? "Starting Webserver sandbox..."
                : "Send an HTTP request to begin"}
            </p>
          </div>
        )}

        {response && (
          <>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-500">
                RESPONSE
              </span>

              <span
                className={`rounded-md px-2 py-1 font-mono text-xs ${
                  response.status >= 200 &&
                  response.status < 300
                    ? "bg-green-500/10 text-green-400"
                    : response.status >= 400
                    ? "bg-red-500/10 text-red-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                HTTP {response.status}
              </span>
            </div>

            <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
              <p className="mb-3 font-mono text-xs text-zinc-500">
                HEADERS
              </p>

              <pre className="overflow-x-auto font-mono text-xs leading-6 text-zinc-300">
                {Object.entries(response.headers)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join("\n")}
              </pre>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
              <p className="mb-3 font-mono text-xs text-zinc-500">
                BODY PREVIEW
              </p>

              {contentType.includes("text/html") ? (
                <iframe
                  title="Webserver Preview"
                  srcDoc={htmlPreview}
                  className="h-[450px] w-full rounded-lg bg-white"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : contentType.startsWith("image/") ? (
                <img
                  src={`data:${contentType};base64,${response.body}`}
                  alt="Preview"
                  className="max-h-[450px] w-full rounded-lg border border-zinc-700 object-contain"
                />
              ) : (
                <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 text-zinc-300">
                  {response.body}
                </pre>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}