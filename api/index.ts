import { createApp } from "../server/app";
import express from "express";
import path from "path";

const app = createApp();

// Serve the Vite-built frontend static files
const staticPath = path.join(process.cwd(), "dist/public");
app.use(express.static(staticPath));

// SPA fallback — unmatched routes serve index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
