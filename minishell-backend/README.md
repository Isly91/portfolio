# Minishell backend

This backend exposes a very small API that runs the real `Isly91/minishell`
binary inside a disposable Docker container.

## Requirements

- Docker
- Node.js 20+

## Start

```bash
npm install
docker compose build
docker compose up
```

The API is available at:

```text
http://localhost:4000
```

Health check:

```text
GET /health
```

Run a command:

```text
POST /api/minishell/run
Content-Type: application/json

{"command":"echo \"Hello world\""}
```

The backend starts a fresh sandbox container for every command.

## Important security note

This is intended as a portfolio/demo architecture. The backend needs access
to the Docker daemon because it creates sandbox containers.

For a public deployment, run this service on a dedicated host/VM and keep the
Docker daemon isolated from the rest of the infrastructure. Do not expose the
Docker socket directly to an untrusted application process.

The sandbox uses:
- no network
- read-only root filesystem
- limited memory/CPU/processes
- dropped Linux capabilities
- `no-new-privileges`
- a non-root user
- a short execution timeout
