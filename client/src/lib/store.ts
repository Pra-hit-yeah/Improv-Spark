import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- MOCK DATA TYPES ---

export type User = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  streak: number;
  total_xp: number;
  level: number;
  last_session_date: string | null;
  last_session_difficulty?: 'beginner' | 'intermediate' | 'advanced' | null;
  last_session_completed?: boolean;
  goal?: string | null;
  daily_time?: string | null;
  activated?: boolean;
};

export type Session = {
  id: string;
  user_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed_at: string;
  duration_seconds: number;
  xp_earned: number;
  flow_state?: boolean;
  reflection_answer?: 'yes' | 'somewhat' | 'no';
};

export type Track = {
  id: string;
  title: string;
  description: string;
  payoff: string; // Real-world benefit
  skills: string[]; // Specific skills trained
  unlockCriteria: string; // Friendly unlock text
  level_req: number;
  locked: boolean;
  total_modules: number;
  completed_modules: number;
};

// --- STORE ---

interface AppState {
  user: User | null;
  sessions: Session[];
  tracks: Track[];
  isAuthenticated: boolean;
  testerBypassEnabled: boolean;

  // Actions
  setTesterBypassEnabled: (enabled: boolean) => void;
  login: (email: string) => Promise<void>;
  logout: () => void;
  setOnboarding: (values: { goal: string | null; daily_time: string | null }) => void;
  completeSession: (difficulty: 'beginner' | 'intermediate' | 'advanced', duration: number, flowState?: boolean, reflectionAnswer?: 'yes' | 'somewhat' | 'no') => void;
}

const MOCK_USER: User = {
  id: 'u1',
  email: 'tester@quickwit.app',
  name: 'Improv Star',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  streak: 3,
  total_xp: 1250,
  level: 5,
  last_session_date: new Date().toISOString(),
};

const INITIAL_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Verbal Reflexes',
    description: 'Master the art of instant association and eliminate hesitation.',
    payoff: 'Never get stuck searching for a word in casual conversation or meetings.',
    skills: ['Speed of Association', 'Staying Out of Your Head', 'Vocabulary Access'],
    unlockCriteria: 'Available immediately',
    level_req: 1,
    locked: false,
    total_modules: 10,
    completed_modules: 3,
  },
  {
    id: 't2',
    title: 'Persuasive Pitching',
    description: 'Learn to structure compelling arguments on the fly.',
    payoff: 'Deliver clear, convincing updates in stand-ups and stakeholder reviews.',
    skills: ['Structure Under Pressure', 'Audience Awareness', 'Clear Articulation'],
    unlockCriteria: 'Recommended after 5 Verbal Reflex sessions',
    level_req: 5,
    locked: false,
    total_modules: 8,
    completed_modules: 0,
  },
  {
    id: 't3',
    title: 'Narrative Weaving',
    description: 'Connect disparate concepts into cohesive stories.',
    payoff: 'Turn dry data points into engaging stories during presentations.',
    skills: ['Narrative Flexibility', 'Contextual Weaving', 'Metaphor Usage'],
    unlockCriteria: 'Unlocks after 3 Pitching sessions to build foundational flow',
    level_req: 10,
    locked: true,
    total_modules: 12,
    completed_modules: 0,
  },
];

import { logEvent } from "@/lib/analytics";

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      testerBypassEnabled: true,
      sessions: [],
      tracks: INITIAL_TRACKS,

      setTesterBypassEnabled: (enabled) => set({ testerBypassEnabled: enabled }),

      login: async (email) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        set({ 
          user: { ...MOCK_USER, email, activated: false }, 
          isAuthenticated: true 
        });
        logEvent({ name: "user_signed_up", userId: MOCK_USER.id, properties: { email } });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setOnboarding: ({ goal, daily_time }) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              goal,
              daily_time,
              activated: true,
            },
          };
        });
      },

      completeSession: (difficulty, duration, flowState = true, reflectionAnswer) => {
        const xpMap = { beginner: 10, intermediate: 25, advanced: 50 };
        const earnedXp = xpMap[difficulty];

        logEvent({ name: "session_completed", userId: get().user?.id ?? null, properties: { difficulty, duration_seconds: duration, xp_earned: earnedXp, flow_state: flowState } });
        logEvent({ name: "streak_incremented", userId: get().user?.id ?? null, properties: { difficulty } });

        set((state) => {
          if (!state.user) return state;

          const newSession: Session = {
            id: Math.random().toString(36).substr(2, 9),
            user_id: state.user.id,
            difficulty,
            completed_at: new Date().toISOString(),
            duration_seconds: duration,
            xp_earned: earnedXp,
            flow_state: flowState,
            reflection_answer: reflectionAnswer,
          };

          return {
            sessions: [newSession, ...state.sessions],
            user: {
              ...state.user,
              total_xp: state.user.total_xp + earnedXp,
              streak: state.user.streak + 1, // Simplified streak logic
              last_session_difficulty: difficulty,
              last_session_completed: true,
            }
          };
        });
      },
    }),
    {
      name: 'quick-wit-storage',
    }
  )
);
