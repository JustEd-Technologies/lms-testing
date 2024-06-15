/**
 * Type representing the configuration settings for the application.
 */
export type ConfigType = {
  supabaseConfig: {
    url: string; // The URL of the Supabase instance
    anonKey: string; // The anonymous key for accessing the Supabase instance
  };
};
