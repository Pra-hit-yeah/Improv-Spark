import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qveybdeyprsvobwfsnmz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZXliZGV5cHJzdm9id2Zzbm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTAyNzcsImV4cCI6MjA4NDY2NjI3N30.B9Cooms7lt7i-VToJvxve8LMJaOs8U6wDUKTFWIpNfA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
