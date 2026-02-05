import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  activated: boolean("activated").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  totalXp: integer("total_xp").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastSessionDate: timestamp("last_session_date"),
  totalSessions: integer("total_sessions").notNull().default(0),
  totalTimeMinutes: integer("total_time_minutes").notNull().default(0),
});

export const tracks = pgTable("tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  difficulty: text("difficulty").notNull(),
  color: text("color").notNull(),
  moduleCount: integer("module_count").notNull().default(10),
});

export const userTrackProgress = pgTable("user_track_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  trackId: varchar("track_id").notNull().references(() => tracks.id, { onDelete: "cascade" }),
  currentModule: integer("current_module").notNull().default(0),
  completedModules: integer("completed_modules").notNull().default(0),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  trackId: varchar("track_id").references(() => tracks.id),
  difficulty: text("difficulty").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
  durationSeconds: integer("duration_seconds").notNull(),
  xpEarned: integer("xp_earned").notNull().default(10),
  promptsCompleted: integer("prompts_completed").notNull().default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export const insertTrackSchema = createInsertSchema(tracks).omit({
  id: true,
});

export const insertUserTrackProgressSchema = createInsertSchema(userTrackProgress).omit({
  id: true,
  lastAccessedAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  completedAt: true,
});

// Select types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Track = typeof tracks.$inferSelect;
export type InsertTrack = z.infer<typeof insertTrackSchema>;

export type UserTrackProgress = typeof userTrackProgress.$inferSelect;
export type InsertUserTrackProgress = z.infer<typeof insertUserTrackProgressSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
