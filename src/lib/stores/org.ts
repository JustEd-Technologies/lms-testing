import { writable, derived } from 'svelte/store';
import { dev, browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import type { CurrentOrg, OrgAudience, OrgTeamMember } from '$lib/types/org';
import { ROLE } from '$lib/utils/constants/roles';
import { PLAN } from '$lib/utils/constants/plans';

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

export const orgs = writable<CurrentOrg[]>([]);

export const currentOrg: Writable<CurrentOrg> = writable(
  defaultCurrentOrgState
);

export const orgAudience = writable<OrgAudience[]>([]);
export const orgTeam = writable<OrgTeamMember[]>([]);
export const isOrgAdmin = derived(
  currentOrg,
  ($currentOrg) => $currentOrg.role_id === ROLE.ADMIN
);

export const currentOrgPlan = derived(currentOrg, ($currentOrg) =>
  $currentOrg.organization_plan.find((p) => p.is_active)
);

export const currentOrgPath = derived(currentOrg, ($currentOrg) =>
  $currentOrg.siteName ? `/org/${$currentOrg.siteName}` : ''
);

export const currentOrgDomain = derived(currentOrg, ($currentOrg) => {
  const browserOrigin = dev && browser && window.location.origin;
  return browserOrigin
    ? browserOrigin
    : $currentOrg.siteName
    ? `https://${$currentOrg.siteName}.classroomio.com`
    : '';
});

// Utility org store
export const isFreePlan = derived(
  currentOrgPlan,
  ($plan) => !$plan || $plan.plan_name === PLAN.BASIC
);

export const currentOrgMaxAudience = derived(currentOrgPlan, ($plan) =>
  !$plan
    ? 50
    : $plan.plan_name === PLAN.EARLY_ADOPTER
    ? 10000
    : $plan.plan_name === PLAN.ENTERPRISE
    ? Number.MAX_SAFE_INTEGER
    : 50
);
