import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, progressApi, tracksApi, sessionsApi } from './api';
import type { User, UserProgress, Track, Session } from '@shared/schema';
import { logEvent } from "@/lib/analytics";

// Extend User type with frontend-specific fields
export type AppUser = Omit<User, 'password'> & {
  goal?: string | null;
  daily_time?: string | null;
  isGuest?: boolean;
};

interface AppState {
  user: AppUser | null;
  userProgress: UserProgress | null;
  sessions: Session[];
  tracks: Track[];
  isAuthenticated: boolean;
  isLoading: boolean;
  testerBypassEnabled: boolean;

  // Actions
  setTesterBypassEnabled: (enabled: boolean) => void;
  signup: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setOnboarding: (values: { goal: string | null; daily_time: string | null }) => Promise<void>;
  completeSession: (
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    duration: number,
    trackId?: string,
    promptsCompleted?: number
  ) => Promise<void>;
  loadUserData: () => Promise<void>;
}

const GUEST_USER: AppUser = {
  id: 'guest',
  email: 'guest@quickwit.app',
  username: 'Guest',
  activated: true,
  goal: 'Build speaking confidence',
  daily_time: '10',
  isGuest: true,
};

const GUEST_PROGRESS: UserProgress = {
  id: 'guest-progress',
  userId: 'guest',
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: null,
  totalSessions: 0,
  totalTimeMinutes: 0,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      userProgress: null,
      isAuthenticated: false,
      isLoading: false,
      testerBypassEnabled: true,
      sessions: [],
      tracks: [],

      setTesterBypassEnabled: (enabled) => set({ testerBypassEnabled: enabled }),

      loginAsGuest: () => {
        set({
          user: GUEST_USER,
          userProgress: GUEST_PROGRESS,
          isAuthenticated: true,
          sessions: [],
          tracks: [],
        });
        // Load tracks in background (public endpoint, no auth needed)
        tracksApi.getAll().then((tracks) => set({ tracks })).catch(() => {});
      },

      signup: async (email, username, password) => {
        try {
          set({ isLoading: true });
          const { user } = await authApi.signup(email, username, password);
          set({ 
            user: { ...user, goal: null, daily_time: null }, 
            isAuthenticated: true,
            isLoading: false
          });
          logEvent({ name: "user_signed_up", userId: user.id, properties: { email } });
          await get().loadUserData();
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },

      login: async (email, password) => {
        try {
          set({ isLoading: true });
          const { user } = await authApi.login(email, password);
          set({ 
            user: { ...user, goal: null, daily_time: null }, 
            isAuthenticated: true,
            isLoading: false
          });
          logEvent({ name: "user_signed_up", userId: user.id, properties: { email } });
          await get().loadUserData();
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          if (!get().user?.isGuest) {
            await authApi.logout();
          }
          set({ 
            user: null, 
            userProgress: null,
            sessions: [],
            isAuthenticated: false 
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      checkAuth: async () => {
        // Don't check auth for guest users — they're already set
        if (get().user?.isGuest) return;
        try {
          const { user } = await authApi.me();
          set({ 
            user: { ...user, goal: null, daily_time: null }, 
            isAuthenticated: true 
          });
          await get().loadUserData();
        } catch (error) {
          set({ 
            user: null, 
            userProgress: null,
            isAuthenticated: false 
          });
        }
      },

      setOnboarding: async ({ goal, daily_time }) => {
        try {
          const { user } = await authApi.activate();
          set((state) => ({
            user: state.user ? {
              ...state.user,
              ...user,
              goal,
              daily_time,
            } : null,
          }));
        } catch (error: any) {
          console.error('Onboarding error:', error);
          throw error;
        }
      },

      completeSession: async (difficulty, duration, trackId, promptsCompleted = 5) => {
        const xpMap = { beginner: 10, intermediate: 25, advanced: 50 };
        const earnedXp = xpMap[difficulty];

        // Guest mode: update progress locally without API calls
        if (get().user?.isGuest) {
          const current = get().userProgress ?? GUEST_PROGRESS;
          set({
            userProgress: {
              ...current,
              totalXp: current.totalXp + earnedXp,
              currentStreak: current.currentStreak + 1,
              longestStreak: Math.max(current.longestStreak, current.currentStreak + 1),
              totalSessions: current.totalSessions + 1,
              totalTimeMinutes: current.totalTimeMinutes + Math.floor(duration / 60),
              lastSessionDate: new Date(),
            },
          });
          return;
        }

        try {
          logEvent({ 
            name: "session_completed", 
            userId: get().user?.id ?? null, 
            properties: { difficulty, duration_seconds: duration, xp_earned: earnedXp } 
          });

          await sessionsApi.create({
            trackId,
            difficulty,
            durationSeconds: duration,
            xpEarned: earnedXp,
            promptsCompleted,
          });

          await get().loadUserData();

          logEvent({ 
            name: "streak_incremented", 
            userId: get().user?.id ?? null, 
            properties: { difficulty } 
          });
        } catch (error: any) {
          console.error('Complete session error:', error);
          throw error;
        }
      },

      loadUserData: async () => {
        if (get().user?.isGuest) return;
        try {
          const [progress, sessions, tracks] = await Promise.all([
            progressApi.get(),
            sessionsApi.getAll(10),
            tracksApi.getAll(),
          ]);

          set({
            userProgress: progress,
            sessions,
            tracks,
          });
        } catch (error) {
          console.error('Load user data error:', error);
        }
      },
    }),
    {
      name: 'quick-wit-storage-v4',
      partialize: (state) => ({
        testerBypassEnabled: state.testerBypassEnabled,
        user: state.user,
      }),
    }
  )
);
