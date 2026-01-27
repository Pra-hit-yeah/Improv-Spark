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
};

export type Session = {
  id: string;
  user_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed_at: string;
  duration_seconds: number;
  xp_earned: number;
};

export type Track = {
  id: string;
  title: string;
  description: string;
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
  
  // Actions
  login: (email: string) => Promise<void>;
  logout: () => void;
  completeSession: (difficulty: 'beginner' | 'intermediate' | 'advanced', duration: number) => void;
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
    level_req: 1,
    locked: false,
    total_modules: 10,
    completed_modules: 3,
  },
  {
    id: 't2',
    title: 'Persuasive Pitching',
    description: 'Learn to structure compelling arguments on the fly.',
    level_req: 5,
    locked: false,
    total_modules: 8,
    completed_modules: 0,
  },
  {
    id: 't3',
    title: 'Narrative Weaving',
    description: 'Connect disparate concepts into cohesive stories.',
    level_req: 10,
    locked: true,
    total_modules: 12,
    completed_modules: 0,
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      sessions: [],
      tracks: INITIAL_TRACKS,

      login: async (email) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        set({ 
          user: { ...MOCK_USER, email }, 
          isAuthenticated: true 
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      completeSession: (difficulty, duration) => {
        const xpMap = { beginner: 10, intermediate: 25, advanced: 50 };
        const earnedXp = xpMap[difficulty];
        
        set((state) => {
          if (!state.user) return state;

          const newSession: Session = {
            id: Math.random().toString(36).substr(2, 9),
            user_id: state.user.id,
            difficulty,
            completed_at: new Date().toISOString(),
            duration_seconds: duration,
            xp_earned: earnedXp,
          };

          return {
            sessions: [newSession, ...state.sessions],
            user: {
              ...state.user,
              total_xp: state.user.total_xp + earnedXp,
              streak: state.user.streak + 1, // Simplified streak logic
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
