/**
 * Interface representing the customization options for an organization.
 */
export interface OrgCustomization {
  dashboard: {
    community: boolean; // Indicates if the community feature is enabled on the dashboard
    exercise: boolean; // Indicates if the exercise feature is enabled on the dashboard
    bannerImage: string; // URL of the banner image displayed on the dashboard
    bannerText: string; // Text displayed on the dashboard banner
  };
  course: {
    newsfeed: boolean; // Indicates if the newsfeed feature is enabled in courses
    grading: boolean; // Indicates if the grading feature is enabled in courses
  };
  apps: {
    poll: boolean; // Indicates if the poll app is enabled
    comments: boolean; // Indicates if the comments app is enabled
  };
}

/**
 * Interface representing the current organization details.
 */
export interface CurrentOrg {
  id: string; // Unique identifier for the organization
  name: string; // Full name of the organization
  shortName: string; // Short name or abbreviation of the organization
  siteName: string; // The site name associated with the organization
  avatar_url: string; // URL of the organization's avatar image
  memberId: string; // Unique identifier for the member
  role_id: number; // Role identifier of the member within the organization
  landingpage: {
    [key: string]: unknown; // Configuration settings for the landing page
  };
  customization: OrgCustomization; // Customization settings for the organization
  theme: string; // The theme applied to the organization's site
  organization_plan: {
    subscriptionId: string; // Identifier for the subscription plan
    plan_name: string; // Name of the subscription plan
    is_active: boolean; // Indicates if the subscription plan is currently active
  }[];
}


export interface OrgTeamMember {
  id: number;
  email: string;
  verified: boolean;
  profileId?: string;
  fullname: string;
  role: string;
  isAdmin: boolean;
}

export interface OrgAudience {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  date_joined: string;
}
