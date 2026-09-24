import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 7000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, "project");
const WWW = path.join(ROOT, "www");

// -----------------------------------------------------------------------------
// Static files
// -----------------------------------------------------------------------------

app.use(express.static(WWW, { extensions: ["html"] }));

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------

app.get("/", (_, res) => {
  res.sendFile(path.join(WWW, "index.html"));
});

app.get("*", (req, res) => {
  const file = path.join(WWW, req.path);

  res.sendFile(file, (err) => {
    if (err) {
      res.status(404).send("404 Not Found");
    }
  });
});

// -----------------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Sandbox webserver running on http://127.0.0.1:${PORT}`);
});