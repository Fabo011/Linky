import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL as string;
const supabaseKey = process.env.VUE_APP_API_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

