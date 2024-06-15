import { goto } from '$app/navigation'; // Importing navigation utility from SvelteKit
import { supabase } from './supabase'; // Importing supabase client instance
import type { CurrentOrg } from '$lib/types/org'; // Importing type definition for CurrentOrg
import { currentOrg } from '$lib/stores/org'; // Importing store for current organization

/**
 * Function to fetch the current organization details from Supabase.
 * @param siteName - The site name of the organization to fetch.
 * @param justGet - If true, only fetches the organization data without setting it in the store.
 * @returns The fetched CurrentOrg object if justGet is true and organization is found, else redirects to 404.
 */
export async function getCurrentOrg(siteName: string, justGet = false) {
  // Fetch organization data from Supabase
  const { data, error } = await supabase
    .from('organization')
    .select(
      `
        id,
        name,
        siteName,
        avatar_url,
        landingpage,
        customization,
        theme,
        organization_plan(
          plan_name,
          is_active
        )
      `
    )
    .eq('siteName', siteName)
    .returns<CurrentOrg[]>();

  // Check if data is empty
  const isDataEmpty = !data?.[0];

  // If not just fetching and there's an error or data is empty, redirect to 404
  if (!justGet && (error || isDataEmpty)) {
    return goto('/404');
  }

  // If not just fetching and data is not empty, set currentOrg store
  if (!justGet) {
    if (isDataEmpty) return; // Return if data is empty

    currentOrg.set(data[0]); // Set currentOrg store with fetched data
  }
  // If just fetching and data is not empty, return the fetched data
  else if (!isDataEmpty) {
    return data[0];
  }
}
