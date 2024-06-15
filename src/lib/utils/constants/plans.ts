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
