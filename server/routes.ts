import type { Express } from "express";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool } from "pg";
import { insertUserSchema, insertSessionSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export function registerRoutes(app: Express): void {
  // Session store — use PostgreSQL in production so sessions survive across serverless invocations
  const PgSession = connectPgSimple(session);
  const sessionStore = process.env.DATABASE_URL
    ? new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
        tableName: "user_sessions",
      })
    : undefined;

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "quickwit-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    })
  );

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // ============= AUTH ROUTES =============

  // Sign up
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, username, password } = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ email, username, password: hashedPassword });
      await storage.createUserProgress({ userId: user.id });

      req.session.userId = user.id;

      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          activated: user.activated,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Log in
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;

      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          activated: user.activated,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Log out
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user
  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          activated: user.activated,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update user activation
  app.patch("/api/users/activate", requireAuth, async (req, res) => {
    try {
      const user = await storage.updateUserActivation(req.session.userId!, true);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          activated: user.activated,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= USER PROGRESS ROUTES =============

  app.get("/api/progress", requireAuth, async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.session.userId!);
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= TRACK ROUTES =============

  app.get("/api/tracks", async (req, res) => {
    try {
      const tracks = await storage.getAllTracks();
      res.json(tracks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tracks/progress", requireAuth, async (req, res) => {
    try {
      const trackProgress = await storage.getAllUserTrackProgress(req.session.userId!);
      res.json(trackProgress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tracks/:trackId/progress", requireAuth, async (req, res) => {
    try {
      const { trackId } = req.params;
      let progress = await storage.getUserTrackProgress(req.session.userId!, trackId);

      if (!progress) {
        progress = await storage.createUserTrackProgress({
          userId: req.session.userId!,
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

  app.patch("/api/tracks/:trackId/progress", requireAuth, async (req, res) => {
    try {
      const { trackId } = req.params;
      const updates = req.body;

      const progress = await storage.updateUserTrackProgress(
        req.session.userId!,
        trackId,
        updates
      );

      if (!progress) {
        return res.status(404).json({ error: "Track progress not found" });
      }

      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= SESSION ROUTES =============

  app.post("/api/sessions", requireAuth, async (req, res) => {
    try {
      const sessionData = insertSessionSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });

      const drillSession = await storage.createSession(sessionData);

      const currentProgress = await storage.getUserProgress(req.session.userId!);
      if (currentProgress) {
        const now = new Date();
        const lastSession = currentProgress.lastSessionDate;

        let newStreak = currentProgress.currentStreak;
        if (lastSession) {
          const daysSinceLastSession = Math.floor(
            (now.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysSinceLastSession === 1) {
            newStreak += 1;
          } else if (daysSinceLastSession > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        await storage.updateUserProgress(req.session.userId!, {
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

  app.get("/api/sessions", requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const sessions = await storage.getUserSessions(req.session.userId!, limit);
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/sessions/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getSessionStats(req.session.userId!);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
