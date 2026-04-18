import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUserSchema, insertSessionSchema } from "../shared/schema";

const JWT_SECRET = process.env.SESSION_SECRET || "quickwit-secret-key-change-in-production";
const COOKIE_NAME = "qw_token";
const IS_PROD = process.env.NODE_ENV === "production";

function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function setAuthCookie(res: Response, token: string) {
  const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${IS_PROD ? "; Secure" : ""}`
  );
}

function clearAuthCookie(res: Response) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly`
  );
}

function getTokenFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.cookie || "";
  for (const part of cookieHeader.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === COOKIE_NAME) return decodeURIComponent(v.join("="));
  }
  return null;
}

const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export function registerRoutes(app: Express): void {

  // ============= AUTH ROUTES =============

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, username, password } = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) return res.status(400).json({ error: "Email already exists" });

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) return res.status(400).json({ error: "Username already taken" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ email, username, password: hashedPassword });
      await storage.createUserProgress({ userId: user.id });

      const token = signToken(user.id);
      setAuthCookie(res, token);

      res.json({ user: { id: user.id, email: user.email, username: user.username, activated: user.activated } });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

      const user = await storage.getUserByEmail(email);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = signToken(user.id);
      setAuthCookie(res, token);

      res.json({ user: { id: user.id, email: user.email, username: user.username, activated: user.activated } });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", (_req, res) => {
    clearAuthCookie(res);
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/me", requireAuth, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ user: { id: user.id, email: user.email, username: user.username, activated: user.activated } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/users/activate", requireAuth, async (req: any, res) => {
    try {
      const user = await storage.updateUserActivation(req.userId, true);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ user: { id: user.id, email: user.email, username: user.username, activated: user.activated } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= PROGRESS ROUTES =============

  app.get("/api/progress", requireAuth, async (req: any, res) => {
    try {
      const progress = await storage.getUserProgress(req.userId);
      if (!progress) return res.status(404).json({ error: "Progress not found" });
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= TRACK ROUTES =============

  app.get("/api/tracks", async (_req, res) => {
    try {
      res.json(await storage.getAllTracks());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tracks/progress", requireAuth, async (req: any, res) => {
    try {
      res.json(await storage.getAllUserTrackProgress(req.userId));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tracks/:trackId/progress", requireAuth, async (req: any, res) => {
    try {
      const { trackId } = req.params;
      let progress = await storage.getUserTrackProgress(req.userId, trackId);
      if (!progress) {
        progress = await storage.createUserTrackProgress({
          userId: req.userId,
          trackId,
          currentModule: 0,
          completedModules: 0,
        });
      }
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tracks/:trackId/progress", requireAuth, async (req: any, res) => {
    try {
      const progress = await storage.updateUserTrackProgress(req.userId, req.params.trackId, req.body);
      if (!progress) return res.status(404).json({ error: "Track progress not found" });
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= SESSION ROUTES =============

  app.post("/api/sessions", requireAuth, async (req: any, res) => {
    try {
      const sessionData = insertSessionSchema.parse({ ...req.body, userId: req.userId });
      const drillSession = await storage.createSession(sessionData);

      const currentProgress = await storage.getUserProgress(req.userId);
      if (currentProgress) {
        const now = new Date();
        const lastSession = currentProgress.lastSessionDate;
        let newStreak = currentProgress.currentStreak;

        if (lastSession) {
          const days = Math.floor((now.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24));
          if (days === 1) newStreak += 1;
          else if (days > 1) newStreak = 1;
        } else {
          newStreak = 1;
        }

        await storage.updateUserProgress(req.userId, {
          totalXp: currentProgress.totalXp + (sessionData.xpEarned ?? 10),
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, currentProgress.longestStreak),
          lastSessionDate: now,
          totalSessions: currentProgress.totalSessions + 1,
          totalTimeMinutes: currentProgress.totalTimeMinutes + Math.floor(sessionData.durationSeconds / 60),
        });
      }

      res.json(drillSession);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/sessions", requireAuth, async (req: any, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      res.json(await storage.getUserSessions(req.userId, limit));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/sessions/stats", requireAuth, async (req: any, res) => {
    try {
      res.json(await storage.getSessionStats(req.userId));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
