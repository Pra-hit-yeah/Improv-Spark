import { createApp } from "../server/app";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = createApp();

// Serve the Vite-built frontend
const staticPath = path.join(__dirname, "../dist/public");
app.use(express.static(staticPath));

// SPA fallback — all unmatched routes serve index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
