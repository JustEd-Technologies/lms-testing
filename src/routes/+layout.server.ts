/**
 * This code runs automatically when the user hits '/' url i.e. the root.
 *
 * The purpose of this file is to handle the loading process for our application,
 * specifically dealing with the organization-specific subdomains and their
 * associated data and settings.
 *
 * Key responsibilities of the code:
 *  1. Ensure that supabase (backend-as-a-service) tool is initialized if not already set up.
 *  2. Prepare the loading data based on the incoming request URL and cookies (by referring subdomain).
 *  3. Retrieves and processes cookies related to the organization site name.
 *  4. Determines the initial locale to be used for translations, default being 'en'.
 */

/************************** IMPORTS *******************************/

import { redirect } from '@sveltejs/kit'; // Utility for redirection in SvelteKit
import { dev, browser } from '$app/environment'; // Environment variables
import { PRIVATE_APP_SUBDOMAINS } from '$env/static/private'; // Private app subdomains

import { getSupabase, supabase } from '$lib/supabase/supabase'; // Supabase client
import { getCurrentOrg } from '$lib/supabase/org.js'; // Function to retrieve current organization

import { loadTranslations } from '$lib/translations/translations.js'; // Function to load translations
import type { CurrentOrg } from '$lib/types/org'; // Type definition for CurrentOrg

import { blockedSubdomain } from '$lib/utils/constants/blockedSubdomains.js'; // Blocked subdomains list

/******************* DECLARATIONS & DEFINITIONS *******************/
interface LoadOutput {
  orgSiteName: string;
  isOrgSite: boolean;
  shouldSkipAuth: boolean;
  org: CurrentOrg | null;
}

/**
 * Load function triggered when navigating to the root URL.
 * Handles organization-specific subdomain routing and data retrieval.
 */
export const load = async ({ url, cookies }): Promise<LoadOutput> => {
  const response: LoadOutput = {
    orgSiteName: '',
    isOrgSite: false,
    shouldSkipAuth: false,
    org: null,
  };

  // Check if the host is localhost
  const isLocalHost = url.host.includes('localhost');

  // Get the temporary site name from the URL parameters
  const tempSiteName = url.searchParams.get('org');

  // If running on localhost and a temporary site name is provided, set it in cookies
  if (isLocalHost && tempSiteName) {
    console.log('setting sitename temp');
    cookies.set('_orgSiteName', tempSiteName, { path: '/' });
  }

  // Retrieve values from cookies
  const _orgSiteName = cookies.get('_orgSiteName');
  const debugPlay = cookies.get('debugPlay');

  // Determine if debug mode is active
  const debugMode = _orgSiteName && _orgSiteName !== 'false';

  // Extract the subdomain from the URL
  const matches = url.host.match(/([a-z0-9-]+).*justed[.]in/);
  const subdomain = matches?.[1] ?? '';

  // Check if in development mode
  const isDev = dev || isLocalHost;

  // If not on a justed.in subdomain and not localhost, exit early
  if (!url.host.includes('.justed.in') && !isLocalHost) {
    return response;
  }

  // ------------------- Handle subdomains ----------------------------

  // If subdomain is not blocked
  if (!blockedSubdomain.includes(subdomain)) {
    // then check if the subdomain is valid
    const isValidSubdomain = !!subdomain && subdomain !== 'www';

    // and set isOrgSite and orgSiteName
    response.isOrgSite = debugMode || isValidSubdomain;
    response.orgSiteName = debugMode ? _orgSiteName : subdomain;

    // Attempts to retrieve the current organization based on the site name.
    response.org = (await getCurrentOrg(response.orgSiteName, true)) || null;

    // Redirects to a 404 page if the organization is not found and not in development mode.
    if (!response.org && !isDev) {
      throw redirect(307, 'https://app.justed.in/404?type=org');
    }
    // Deletes the _orgSiteName cookie if the organization is not found but the cookie is set.
    else if (!response.org && _orgSiteName) {
      cookies.delete('_orgSiteName', { path: '/' });
    }
  }
  // If the subdomain is 'play' or debugPlay is 'true', sets shouldSkipAuth to true.
  else if (subdomain === 'play' || debugPlay === 'true') {
    response.shouldSkipAuth = true;
  }
  // If the subdomain is not private and not in development mode, redirects to the main app page.
  else if (!PRIVATE_APP_SUBDOMAINS.split(',').includes(subdomain) && !isDev) {
    throw redirect(307, 'https://app.justed.in');
  }

  // Load Translations
  const { pathname } = url;
  const initLocale = getInitialLocale();
  await loadTranslations(initLocale, pathname);

  return response;
};

// Gets the locale based on the browser's language
function getInitialLocale(): string {
  if (browser) {
    try {
      return window.navigator.language.split('-')[0];
    } catch (e) {
      return 'en';
    }
  }
  return 'en';
}

/************************* MAIN FLOW ******************************/

// Get the supabase client if we don't have it.
if (!supabase) getSupabase();

/*****************************************************************/
