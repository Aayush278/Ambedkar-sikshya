/* ============================================================
   AMBEDKAR SIKHYA — Supabase Client Configuration
   Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project values:
   Find them in Supabase Dashboard -> Project Settings -> API
   ============================================================ */

const SUPABASE_URL = 'https://ecslrucetbqvjqxggwxf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjc2xydWNldGJxdmpxeGdnd3hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MTY1NjksImV4cCI6MjEwOTM5MjU2OX0.ztx5jxwsBQsHE0oLXoVfhKEwkmILFc31UCqa607M9QM';

// Initialize Supabase Client
let db = null;
try {
  if (typeof supabase !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes('YOUR_PROJECT_REF')) {
    db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[Ambedkar Sikhya] Supabase initialized successfully.');
  } else {
    console.warn('[Ambedkar Sikhya] Supabase credentials not set yet. Please update js/supabase-config.js.');
  }
} catch (err) {
  console.error('[Ambedkar Sikhya] Error initializing Supabase:', err);
}

