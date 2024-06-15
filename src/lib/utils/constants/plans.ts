interface PlanPrice {
  CURRENCY: string;
  MONTHLY: string;
  YEARLY: string;
  IS_PREMIUM: boolean;
}

interface PlanCTA {
  LABEL: string;
  LINK: string;
  DASHBOARD_LABEL: string;
  DASHBOARD_LINK: string;
  IS_DISABLED: boolean;
  PRODUCT_ID?: string; // Optional, as it's not present in all plans
}

interface Plan {
  NAME: string;
  DESCRIPTION: string;
  PRICE: PlanPrice;
  FEATURES: string[];
  CTA: PlanCTA;
}

interface Plans {
  BASIC: Plan;
  EARLY_ADOPTER: Plan;
  ENTERPRISE: Plan;
}

export const PLANS: Plans = {
  "BASIC": {
    "NAME": "Basic",
    "DESCRIPTION": "Free tier plan for personal use, no credit card required.",
    "PRICE": {
      "CURRENCY": "₹",
      "MONTHLY": "0",
      "YEARLY": "0",
      "IS_PREMIUM": false
    },
    "FEATURES": [
      "Unlimited Activity Courses",
      "Unlimited Quizzes",
      "5 Students",
      "No certificate",
      "No video lessons",
    ],
    "CTA": {
      "LABEL": "Signup Now",
      "LINK": "/signup?plan=free",
      "DASHBOARD_LABEL": "Default Plan",
      "DASHBOARD_LINK": "#disabled",
      "IS_DISABLED": false
    }
  },
  "EARLY_ADOPTER": {
    "NAME": "For Educators",
    "DESCRIPTION": "For fast growing teaching businesses that aim to scale by creating digital presence.",
    "PRICE": {
      "CURRENCY": "₹",
      "MONTHLY": "30,000",
      "YEARLY": "3,00,000",
      "IS_PREMIUM": false
    },
    "FEATURES": [
      "Everything in Basic",
      "50 students",
      "All Video Courses",
      "Add Your Own Courses",
      "Certificate on successful completion",
      "Advanced AI Course Builder",
      "Analytical Insight Reports on Student's Performance",
      "Slack Community",
      "Includes all Upcoming Features"
    ],
    "CTA": {
      "LABEL": "I want in! 😍",
      "LINK": "/signup?plan=early-adopter",
      "DASHBOARD_LABEL": "Start Your Academy Now! 😍",
      "DASHBOARD_LINK": "",
      "IS_DISABLED": false,
      "PRODUCT_ID": "331121"
    }
  },
  "ENTERPRISE": {
    "NAME": "For Edtech Enterprises and Universities",
    "DESCRIPTION": "Best suited for larger businesses that need more control.",
    "PRICE": {
      "CURRENCY": "",
      "MONTHLY": "Request Pricing",
      "YEARLY": "Request Pricing",
      "IS_PREMIUM": true
    },
    "FEATURES": [
      "Everything in Early Adopters plus:",
      "Custom Domain",
      "Industry Expert Sessions",
      "Job Assitance & Interview Preparation",
      "Corporate Visits and Networking with Top Startup Founders",
      "24/7 Support"
    ],
    "CTA": {
      "LABEL": "Contact Us",
      "LINK": "",
      "DASHBOARD_LABEL": "Contact Us",
      "DASHBOARD_LINK": "",
      "IS_DISABLED": false
    }
  }
};

export const PLAN = {
  BASIC: 'BASIC',
  EARLY_ADOPTER: 'EARLY_ADOPTER',
  ENTERPRISE: 'ENTERPRISE'
};

export const PLAN_NAMES = {
  [PLAN.BASIC]: 'Free',
  [PLAN.EARLY_ADOPTER]: 'Early Adopter',
  [PLAN.ENTERPRISE]: 'Enterprise',
}

export const FEATURES = {
  BASIC_STUDENTS_50: 'BASIC_STUDENTS_50',
  EA_STUDENTS_10000: 'EA_STUDENTS_10000',
  EA_VIDEO_UPLOAD: 'EA_VIDEO_UPLOAD',
  EA_CERTIFICATE: 'EA_CERTIFICATE',
  EA_UPCOMING_FEATURES: 'EA_UPCOMING_FEATURES',
  ENTERPRISE_STUDENTS_UNLIMITED: 'ENTERPRISE_STUDENTS_UNLIMITED',
  ENTERPRISE_CUSTOM_DOMAIN: 'ENTERPRISE_CUSTOM_DOMAIN'
};

export const BASIC_FEATURES = [FEATURES.BASIC_STUDENTS_50];

export const EARYL_ADOPTER_FEATURES = [
  ...BASIC_FEATURES,
  FEATURES.EA_STUDENTS_10000,
  FEATURES.EA_VIDEO_UPLOAD,
  FEATURES.EA_CERTIFICATE,
  FEATURES.EA_UPCOMING_FEATURES
];

export const ENTERPRISE_FEATURES = [
  ...EARYL_ADOPTER_FEATURES,
  FEATURES.ENTERPRISE_STUDENTS_UNLIMITED,
  FEATURES.ENTERPRISE_CUSTOM_DOMAIN
];

export const PLANS_BY_FEATURE = {
  [PLAN.BASIC]: BASIC_FEATURES,
  [PLAN.EARLY_ADOPTER]: EARYL_ADOPTER_FEATURES,
  [PLAN.ENTERPRISE]: ENTERPRISE_FEATURES
};
