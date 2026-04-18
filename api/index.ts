import { createApp } from "../server/app.js";
import express, { type Request, type Response } from "express";
import path from "path";

const app = createApp();
const staticPath = path.join(process.cwd(), "dist/public");

app.use(express.static(staticPath));

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
