import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { CurrentOrg } from '$lib/types/org';

export const defaultCurrentOrgState: CurrentOrg = {
  id: '',
  name: '',
  shortName: '',
  siteName: '',
  avatar_url: '',
  memberId: '',
  role_id: 0,
  landingpage: {},
  customization: {
    apps: { poll: true, comments: true },
    course: { grading: true, newsfeed: true },
    dashboard: {
      exercise: true,
      community: true,
      bannerText: '',
      bannerImage: '',
    },
  },
  theme: '',
  organization_plan: [],
};

export const currentOrg: Writable<CurrentOrg> = writable(
  defaultCurrentOrgState
);
