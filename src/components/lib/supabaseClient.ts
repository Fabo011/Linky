import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL as string || "https://ycsymeeovppvwzcfdddr.supabase.co";
const supabaseKey = process.env.VUE_APP_API_KEY as string || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3ltZWVvdnBwdnd6Y2ZkZGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3MTI1MDMsImV4cCI6MjAwMTI4ODUwM30.K6ZiBcOY797nPVtb12kbl6E9TwnsEdyVzqNv6BPqeso"; // This is not a secret, its a public api key

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

