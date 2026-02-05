import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import session from "express-session";
import { insertUserSchema, insertSessionSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session middleware
  app.use(
    session({
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
      const { username, password } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({ username, password: hashedPassword });
      
      // Create initial user progress
      await storage.createUserProgress({ userId: user.id });
      
      // Set session
      req.session.userId = user.id;
      
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          activated: user.activated 
        } 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Log in
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
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
          username: user.username, 
          activated: user.activated 
        } 
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
          username: user.username, 
          activated: user.activated 
        } 
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
          username: user.username, 
          activated: user.activated 
        } 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= USER PROGRESS ROUTES =============
  
  // Get user progress
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
  
  // Get all tracks
  app.get("/api/tracks", async (req, res) => {
    try {
      const tracks = await storage.getAllTracks();
      res.json(tracks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user's track progress for all tracks
  app.get("/api/tracks/progress", requireAuth, async (req, res) => {
    try {
      const trackProgress = await storage.getAllUserTrackProgress(req.session.userId!);
      res.json(trackProgress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get or create user track progress for specific track
  app.get("/api/tracks/:trackId/progress", requireAuth, async (req, res) => {
    try {
      const { trackId } = req.params;
      let progress = await storage.getUserTrackProgress(req.session.userId!, trackId);
      
      // Create if doesn't exist
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

  // Update user track progress
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
  
  // Create session (record completed drill)
  app.post("/api/sessions", requireAuth, async (req, res) => {
    try {
      const sessionData = insertSessionSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const session = await storage.createSession(sessionData);
      
      // Update user progress
      const currentProgress = await storage.getUserProgress(req.session.userId!);
      if (currentProgress) {
        const now = new Date();
        const lastSession = currentProgress.lastSessionDate;
        
        // Calculate streak
        let newStreak = currentProgress.currentStreak;
        if (lastSession) {
          const daysSinceLastSession = Math.floor(
            (now.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysSinceLastSession === 1) {
            // Consecutive day
            newStreak += 1;
          } else if (daysSinceLastSession > 1) {
            // Streak broken
            newStreak = 1;
          }
          // Same day = no change to streak
        } else {
          // First session
          newStreak = 1;
        }
        
        await storage.updateUserProgress(req.session.userId!, {
          totalXp: currentProgress.totalXp + sessionData.xpEarned,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, currentProgress.longestStreak),
          lastSessionDate: now,
          totalSessions: currentProgress.totalSessions + 1,
          totalTimeMinutes: currentProgress.totalTimeMinutes + Math.floor(sessionData.durationSeconds / 60),
        });
      }
      
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get user sessions
  app.get("/api/sessions", requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const sessions = await storage.getUserSessions(req.session.userId!, limit);
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get session stats
  app.get("/api/sessions/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getSessionStats(req.session.userId!);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
