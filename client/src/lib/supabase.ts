// This is a minimal wrapper to simulate Supabase client structure
// In a real app, this would import createClient from @supabase/supabase-js

export const supabase = {
  auth: {
    signInWithOtp: async ({ email }: { email: string }) => {
      console.log('Mock Supabase: Sending magic link to', email);
      return { data: {}, error: null };
    },
    signInWithOAuth: async ({ provider }: { provider: string }) => {
      console.log('Mock Supabase: Redirecting to', provider);
      return { data: {}, error: null };
    },
    signOut: async () => {
      console.log('Mock Supabase: Signing out');
      return { error: null };
    }
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        data: [],
      }),
    }),
  }),
};
