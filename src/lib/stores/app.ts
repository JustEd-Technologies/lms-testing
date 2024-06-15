import { writable } from 'svelte/store';

export const isMobile = writable<boolean>(false);
export const selectedLocale = writable<string>('en');
export const globalStore = writable<{
  isDark: boolean;
  isOrgSite: boolean;
  orgSiteName: string;
  isStudent?: boolean;
}>({
  isDark: false,
  isOrgSite: false,
  orgSiteName: '',
  isStudent: undefined,
});
