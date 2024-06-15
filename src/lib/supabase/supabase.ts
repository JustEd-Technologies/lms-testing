// Import the createClient function from the Supabase library
import { createClient } from '@supabase/supabase-js';

// Import the configuration settings from the application's config module
import { config } from '$lib/config';

// Declare a variable to hold the Supabase client instance
export let supabase: ReturnType<typeof createClient>;

// Function to initialize and return the Supabase client
export const getSupabase = () => {
  // If the Supabase client is already initialized, return it
  if (supabase) return supabase;

  // Create a new Supabase client using the URL and anonymous key from the config
  supabase = createClient(
    config.supabaseConfig.url,
    config.supabaseConfig.anonKey
  );

  // Return the newly created Supabase client
  return supabase;
};
