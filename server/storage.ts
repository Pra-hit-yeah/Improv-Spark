import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, and, desc } from "drizzle-orm";
import {
  users,
  userProgress,
  tracks,
  userTrackProgress,
  sessions,
  type User,
  type InsertUser,
  type UserProgress,
  type InsertUserProgress,
  type Track,
  type InsertTrack,
  type UserTrackProgress,
  type InsertUserTrackProgress,
  type Session,
  type InsertSession,
} from "@shared/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserActivation(id: string, activated: boolean): Promise<User | undefined>;

  // User Progress operations
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;

  // Track operations
  getAllTracks(): Promise<Track[]>;
  getTrack(id: string): Promise<Track | undefined>;
  createTrack(track: InsertTrack): Promise<Track>;

  // User Track Progress operations
  getUserTrackProgress(userId: string, trackId: string): Promise<UserTrackProgress | undefined>;
  getAllUserTrackProgress(userId: string): Promise<UserTrackProgress[]>;
  createUserTrackProgress(progress: InsertUserTrackProgress): Promise<UserTrackProgress>;
  updateUserTrackProgress(userId: string, trackId: string, updates: Partial<UserTrackProgress>): Promise<UserTrackProgress | undefined>;

  // Session operations
  createSession(session: InsertSession): Promise<Session>;
  getUserSessions(userId: string, limit?: number): Promise<Session[]>;
  getSessionStats(userId: string): Promise<{
    totalSessions: number;
    totalTimeMinutes: number;
    totalXp: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserActivation(id: string, activated: boolean): Promise<User | undefined> {
    const [user] = await db.update(users).set({ activated }).where(eq(users.id, id)).returning();
    return user;
  }

  // User Progress operations
  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    const [progress] = await db.select().from(userProgress).where(eq(userProgress.userId, userId)).limit(1);
    return progress;
  }

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [created] = await db.insert(userProgress).values(progress).returning();
    return created;
  }

  async updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const [updated] = await db
      .update(userProgress)
      .set(updates)
      .where(eq(userProgress.userId, userId))
      .returning();
    return updated;
  }

  // Track operations
  async getAllTracks(): Promise<Track[]> {
    return await db.select().from(tracks);
  }

  async getTrack(id: string): Promise<Track | undefined> {
    const [track] = await db.select().from(tracks).where(eq(tracks.id, id)).limit(1);
    return track;
  }

  async createTrack(track: InsertTrack): Promise<Track> {
    const [created] = await db.insert(tracks).values(track).returning();
    return created;
  }

  // User Track Progress operations
  async getUserTrackProgress(userId: string, trackId: string): Promise<UserTrackProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userTrackProgress)
      .where(and(eq(userTrackProgress.userId, userId), eq(userTrackProgress.trackId, trackId)))
      .limit(1);
    return progress;
  }

  async getAllUserTrackProgress(userId: string): Promise<UserTrackProgress[]> {
    return await db.select().from(userTrackProgress).where(eq(userTrackProgress.userId, userId));
  }

  async createUserTrackProgress(progress: InsertUserTrackProgress): Promise<UserTrackProgress> {
    const [created] = await db.insert(userTrackProgress).values(progress).returning();
    return created;
  }

  async updateUserTrackProgress(
    userId: string,
    trackId: string,
    updates: Partial<UserTrackProgress>
  ): Promise<UserTrackProgress | undefined> {
    const [updated] = await db
      .update(userTrackProgress)
      .set(updates)
      .where(and(eq(userTrackProgress.userId, userId), eq(userTrackProgress.trackId, trackId)))
      .returning();
    return updated;
  }

  // Session operations
  async createSession(session: InsertSession): Promise<Session> {
    const [created] = await db.insert(sessions).values(session).returning();
    return created;
  }

  async getUserSessions(userId: string, limit: number = 50): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(desc(sessions.completedAt))
      .limit(limit);
  }

  async getSessionStats(userId: string): Promise<{
    totalSessions: number;
    totalTimeMinutes: number;
    totalXp: number;
  }> {
    const userSessions = await db.select().from(sessions).where(eq(sessions.userId, userId));
    
    return {
      totalSessions: userSessions.length,
      totalTimeMinutes: userSessions.reduce((sum, s) => sum + Math.floor(s.durationSeconds / 60), 0),
      totalXp: userSessions.reduce((sum, s) => sum + s.xpEarned, 0),
    };
  }
}

export const storage = new DatabaseStorage();
