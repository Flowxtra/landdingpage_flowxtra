// Mock Data for App Store
// This file contains sample app data for testing before backend API is ready

import { App, AppCategory } from "./appStoreApi";

export const mockCategories: AppCategory[] = [
  {
    id: 1,
    name: "Communication",
    slug: "communication",
    translations: {
      en: "Communication",
      de: "Kommunikation",
    },
  },
  {
    id: 2,
    name: "Project Management",
    slug: "project-management",
    translations: {
      en: "Project Management",
      de: "Projektmanagement",
    },
  },
  {
    id: 3,
    name: "Job Boards",
    slug: "job-boards",
    translations: {
      en: "Job Boards",
      de: "Stellenbörsen",
    },
  },
  {
    id: 4,
    name: "Analytics",
    slug: "analytics",
    translations: {
      en: "Analytics",
      de: "Analytik",
    },
  },
  {
    id: 5,
    name: "HR Tools",
    slug: "hr-tools",
    translations: {
      en: "HR Tools",
      de: "HR-Tools",
    },
  },
];

export const mockApps: App[] = [
  {
    id: 1,
    name: "Slack",
    slug: "slack",
    description:
      "Integrate Slack with Flowxtra to receive real-time notifications about new candidates, interview schedules, and hiring updates. Keep your team synchronized and never miss important recruitment activities.",
    shortDescription:
      "Real-time team communication and notifications for your recruitment workflow.",
    category: "Communication",
    categoryId: 1,
    categorySlug: "communication",
    icon: "/img/apps/slack-icon.png",
    screenshots: [
      "/img/apps/slack-screenshot-1.png",
      "/img/apps/slack-screenshot-2.png",
    ],
    features: [
      "Real-time candidate notifications",
      "Interview scheduling alerts",
      "Team collaboration channels",
      "Custom notification rules",
      "Integration with hiring pipeline",
    ],
    installUrl: "/get-started?app=slack",
    websiteUrl: "https://slack.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 2,
    name: "Trello",
    slug: "trello",
    description:
      "Sync your recruitment pipeline with Trello boards. Automatically create cards for new candidates, track interview stages, and manage your hiring process visually. Perfect for teams that love visual project management.",
    shortDescription:
      "Visual project management for your recruitment pipeline.",
    category: "Project Management",
    categoryId: 2,
    categorySlug: "project-management",
    icon: "/img/apps/trello-icon.png",
    screenshots: [
      "/img/apps/trello-screenshot-1.png",
      "/img/apps/trello-screenshot-2.png",
    ],
    features: [
      "Automatic card creation for candidates",
      "Pipeline stage tracking",
      "Custom board templates",
      "Team collaboration",
      "Visual hiring workflow",
    ],
    installUrl: "/get-started?app=trello",
    websiteUrl: "https://trello.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 3,
    name: "LinkedIn",
    slug: "linkedin",
    description:
      "Connect Flowxtra with LinkedIn to automatically post job openings, sync candidate profiles, and leverage LinkedIn's professional network for your recruitment needs. Access LinkedIn Recruiter features directly from Flowxtra.",
    shortDescription: "Professional networking and job posting integration.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/linkedin-icon.png",
    screenshots: [
      "/img/apps/linkedin-screenshot-1.png",
      "/img/apps/linkedin-screenshot-2.png",
    ],
    features: [
      "Automatic job posting",
      "Candidate profile sync",
      "LinkedIn Recruiter integration",
      "Network insights",
      "Professional recommendations",
    ],
    installUrl: "/get-started?app=linkedin",
    websiteUrl: "https://linkedin.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 4,
    name: "Google Jobs",
    slug: "google-jobs",
    description:
      "Post your job openings directly to Google Jobs and reach millions of job seekers. Automatic job posting, enhanced visibility, and seamless integration with Google's job search ecosystem.",
    shortDescription: "Reach millions of job seekers through Google Jobs.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/google-jobs-icon.png",
    screenshots: [
      "/img/apps/google-jobs-screenshot-1.png",
      "/img/apps/google-jobs-screenshot-2.png",
    ],
    features: [
      "Automatic job posting to Google",
      "Enhanced search visibility",
      "Rich job listings",
      "Mobile-optimized applications",
      "Analytics and insights",
    ],
    installUrl: "/get-started?app=google-jobs",
    websiteUrl: "https://www.google.com/search?q=google+jobs",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 5,
    name: "Zoom",
    slug: "zoom",
    description:
      "Schedule and conduct video interviews directly from Flowxtra using Zoom integration. One-click interview links, automatic calendar invites, and seamless video conferencing for your recruitment process.",
    shortDescription: "Video interviews and meetings for recruitment.",
    category: "Communication",
    categoryId: 1,
    categorySlug: "communication",
    icon: "/img/apps/zoom-icon.png",
    screenshots: ["/img/apps/zoom-screenshot-1.png"],
    features: [
      "One-click interview scheduling",
      "Automatic calendar integration",
      "HD video quality",
      "Recording capabilities",
      "Screen sharing for technical interviews",
    ],
    installUrl: "/get-started?app=zoom",
    websiteUrl: "https://zoom.us",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 6,
    name: "Google Analytics",
    slug: "google-analytics",
    description:
      "Track your recruitment marketing performance with Google Analytics integration. Monitor job posting views, application sources, candidate behavior, and optimize your hiring strategy with data-driven insights.",
    shortDescription: "Data-driven insights for your recruitment marketing.",
    category: "Analytics",
    categoryId: 4,
    categorySlug: "analytics",
    icon: "/img/apps/google-analytics-icon.png",
    screenshots: ["/img/apps/google-analytics-screenshot-1.png"],
    features: [
      "Job posting performance tracking",
      "Application source analysis",
      "Candidate journey mapping",
      "Conversion rate optimization",
      "Custom recruitment dashboards",
    ],
    installUrl: "/get-started?app=google-analytics",
    websiteUrl: "https://analytics.google.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 7,
    name: "Calendly",
    slug: "calendly",
    description:
      "Simplify interview scheduling with Calendly integration. Let candidates choose their preferred interview time slots, automatically sync with your calendar, and reduce back-and-forth emails.",
    shortDescription: "Automated interview scheduling made easy.",
    category: "HR Tools",
    categoryId: 5,
    categorySlug: "hr-tools",
    icon: "/img/apps/calendly-icon.png",
    screenshots: ["/img/apps/calendly-screenshot-1.png"],
    features: [
      "Candidate self-scheduling",
      "Calendar synchronization",
      "Time zone handling",
      "Automated reminders",
      "Custom interview types",
    ],
    installUrl: "/get-started?app=calendly",
    websiteUrl: "https://calendly.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 8,
    name: "Mailchimp",
    slug: "mailchimp",
    description:
      "Send automated email campaigns to candidates, nurture your talent pool, and keep candidates engaged throughout the hiring process. Integrate Mailchimp for professional email marketing.",
    shortDescription: "Email marketing and candidate engagement.",
    category: "Communication",
    categoryId: 1,
    categorySlug: "communication",
    icon: "/img/apps/mailchimp-icon.png",
    screenshots: ["/img/apps/mailchimp-screenshot-1.png"],
    features: [
      "Automated candidate emails",
      "Talent pool nurturing",
      "Email templates",
      "Campaign analytics",
      "A/B testing",
    ],
    installUrl: "/get-started?app=mailchimp",
    websiteUrl: "https://mailchimp.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 9,
    name: "Microsoft Teams",
    slug: "microsoft-teams",
    description:
      "Integrate Microsoft Teams with Flowxtra for seamless team collaboration during the hiring process. Share candidate profiles, conduct team discussions, and keep everyone in the loop.",
    shortDescription: "Team collaboration and communication platform.",
    category: "Communication",
    categoryId: 1,
    categorySlug: "communication",
    icon: "/img/apps/teams-icon.png",
    screenshots: ["/img/apps/teams-screenshot-1.png"],
    features: [
      "Team channels for hiring",
      "Candidate profile sharing",
      "Video interviews",
      "File sharing and collaboration",
      "Integration with Office 365",
    ],
    installUrl: "/get-started?app=microsoft-teams",
    websiteUrl: "https://teams.microsoft.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 10,
    name: "Asana",
    slug: "asana",
    description:
      "Manage your recruitment projects with Asana. Create tasks for each hiring stage, assign team members, set deadlines, and track progress all in one place.",
    shortDescription: "Project management for recruitment workflows.",
    category: "Project Management",
    categoryId: 2,
    categorySlug: "project-management",
    icon: "/img/apps/asana-icon.png",
    screenshots: ["/img/apps/asana-screenshot-1.png"],
    features: [
      "Recruitment project templates",
      "Task assignment and tracking",
      "Timeline visualization",
      "Team collaboration",
      "Progress reporting",
    ],
    installUrl: "/get-started?app=asana",
    websiteUrl: "https://asana.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 11,
    name: "Jira",
    slug: "jira",
    description:
      "Use Jira to track your technical recruitment process. Create tickets for candidate assessments, code reviews, and technical interviews with full traceability.",
    shortDescription: "Issue tracking for technical recruitment.",
    category: "Project Management",
    categoryId: 2,
    categorySlug: "project-management",
    icon: "/img/apps/jira-icon.png",
    screenshots: ["/img/apps/jira-screenshot-1.png"],
    features: [
      "Candidate assessment tracking",
      "Technical interview workflows",
      "Code review integration",
      "Custom recruitment boards",
      "Reporting and analytics",
    ],
    installUrl: "/get-started?app=jira",
    websiteUrl: "https://www.atlassian.com/software/jira",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 12,
    name: "Indeed",
    slug: "indeed",
    description:
      "Post your job openings to Indeed and reach millions of active job seekers. Automatic job posting, candidate matching, and application management.",
    shortDescription: "World's largest job site integration.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/indeed-icon.png",
    screenshots: ["/img/apps/indeed-screenshot-1.png"],
    features: [
      "Automatic job posting",
      "Candidate matching",
      "Application tracking",
      "Sponsored job listings",
      "Performance analytics",
    ],
    installUrl: "/get-started?app=indeed",
    websiteUrl: "https://indeed.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 13,
    name: "Glassdoor",
    slug: "glassdoor",
    description:
      "Post jobs on Glassdoor and leverage employer branding. Showcase your company culture, receive candidate reviews, and attract top talent.",
    shortDescription: "Employer branding and job posting platform.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/glassdoor-icon.png",
    screenshots: ["/img/apps/glassdoor-screenshot-1.png"],
    features: [
      "Job posting to Glassdoor",
      "Employer profile management",
      "Company reviews integration",
      "Salary insights",
      "Candidate attraction tools",
    ],
    installUrl: "/get-started?app=glassdoor",
    websiteUrl: "https://glassdoor.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 14,
    name: "Monster",
    slug: "monster",
    description:
      "Reach qualified candidates through Monster's extensive job board network. Post jobs, search resumes, and find the perfect match for your open positions.",
    shortDescription: "Global job board and resume database.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/monster-icon.png",
    screenshots: ["/img/apps/monster-screenshot-1.png"],
    features: [
      "Job posting automation",
      "Resume database access",
      "Candidate search tools",
      "Application management",
      "Market insights",
    ],
    installUrl: "/get-started?app=monster",
    websiteUrl: "https://monster.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 15,
    name: "Tableau",
    slug: "tableau",
    description:
      "Visualize your recruitment data with Tableau. Create interactive dashboards, analyze hiring trends, and make data-driven decisions for your talent acquisition strategy.",
    shortDescription: "Advanced analytics and data visualization.",
    category: "Analytics",
    categoryId: 4,
    categorySlug: "analytics",
    icon: "/img/apps/tableau-icon.png",
    screenshots: ["/img/apps/tableau-screenshot-1.png"],
    features: [
      "Recruitment dashboards",
      "Hiring trend analysis",
      "Time-to-fill metrics",
      "Source effectiveness tracking",
      "Custom visualizations",
    ],
    installUrl: "/get-started?app=tableau",
    websiteUrl: "https://tableau.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 16,
    name: "Power BI",
    slug: "power-bi",
    description:
      "Transform your recruitment data into actionable insights with Power BI. Build comprehensive reports, track KPIs, and share insights with your team.",
    shortDescription: "Business intelligence for recruitment analytics.",
    category: "Analytics",
    categoryId: 4,
    categorySlug: "analytics",
    icon: "/img/apps/powerbi-icon.png",
    screenshots: ["/img/apps/powerbi-screenshot-1.png"],
    features: [
      "Recruitment KPI dashboards",
      "Real-time data updates",
      "Interactive reports",
      "Team collaboration",
      "Mobile access",
    ],
    installUrl: "/get-started?app=power-bi",
    websiteUrl: "https://powerbi.microsoft.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 17,
    name: "BambooHR",
    slug: "bamboohr",
    description:
      "Integrate BambooHR with Flowxtra for seamless HR management. Sync employee data, manage onboarding, and maintain a complete employee lifecycle record.",
    shortDescription: "Complete HR management system integration.",
    category: "HR Tools",
    categoryId: 5,
    categorySlug: "hr-tools",
    icon: "/img/apps/bamboohr-icon.png",
    screenshots: ["/img/apps/bamboohr-screenshot-1.png"],
    features: [
      "Employee data synchronization",
      "Onboarding automation",
      "Time-off management",
      "Performance tracking",
      "HR reporting",
    ],
    installUrl: "/get-started?app=bamboohr",
    websiteUrl: "https://bamboohr.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 18,
    name: "Workday",
    slug: "workday",
    description:
      "Connect Flowxtra with Workday for enterprise-level HR and talent management. Streamline hiring, onboarding, and employee data management.",
    shortDescription: "Enterprise HR and talent management platform.",
    category: "HR Tools",
    categoryId: 5,
    categorySlug: "hr-tools",
    icon: "/img/apps/workday-icon.png",
    screenshots: ["/img/apps/workday-screenshot-1.png"],
    features: [
      "Enterprise integration",
      "Talent management",
      "Payroll integration",
      "Compliance tracking",
      "Advanced reporting",
    ],
    installUrl: "/get-started?app=workday",
    websiteUrl: "https://workday.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 19,
    name: "Discord",
    slug: "discord",
    description:
      "Create dedicated Discord channels for your recruitment team. Share candidate updates, discuss interviews, and collaborate in real-time with your hiring team.",
    shortDescription: "Team communication and collaboration.",
    category: "Communication",
    categoryId: 1,
    categorySlug: "communication",
    icon: "/img/apps/discord-icon.png",
    screenshots: ["/img/apps/discord-screenshot-1.png"],
    features: [
      "Team channels",
      "Voice and video calls",
      "File sharing",
      "Bot integrations",
      "Screen sharing",
    ],
    installUrl: "/get-started?app=discord",
    websiteUrl: "https://discord.com",
    isVerified: true,
    isPopular: false,
    isNew: true,
  },
  {
    id: 20,
    name: "Monday.com",
    slug: "monday",
    description:
      "Manage your recruitment projects with Monday.com's visual boards. Track candidates through each stage, automate workflows, and collaborate with your team.",
    shortDescription: "Visual project management for recruitment.",
    category: "Project Management",
    categoryId: 2,
    categorySlug: "project-management",
    icon: "/img/apps/monday-icon.png",
    screenshots: ["/img/apps/monday-screenshot-1.png"],
    features: [
      "Visual recruitment boards",
      "Workflow automation",
      "Team collaboration",
      "Custom templates",
      "Time tracking",
    ],
    installUrl: "/get-started?app=monday",
    websiteUrl: "https://monday.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 21,
    name: "Xing",
    slug: "xing",
    description:
      "Post jobs on Xing, Europe's leading professional network. Reach German-speaking professionals and expand your talent pool across Europe.",
    shortDescription: "European professional network for job posting.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/xing-icon.png",
    screenshots: ["/img/apps/xing-screenshot-1.png"],
    features: [
      "European job posting",
      "Professional network access",
      "Candidate search",
      "Company page integration",
      "Targeted advertising",
    ],
    installUrl: "/get-started?app=xing",
    websiteUrl: "https://xing.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 22,
    name: "Mixpanel",
    slug: "mixpanel",
    description:
      "Track candidate behavior and engagement with Mixpanel. Understand how candidates interact with your job postings and optimize your recruitment funnel.",
    shortDescription: "Product analytics for recruitment marketing.",
    category: "Analytics",
    categoryId: 4,
    categorySlug: "analytics",
    icon: "/img/apps/mixpanel-icon.png",
    screenshots: ["/img/apps/mixpanel-screenshot-1.png"],
    features: [
      "Candidate behavior tracking",
      "Funnel analysis",
      "Cohort analysis",
      "Event tracking",
      "Custom dashboards",
    ],
    installUrl: "/get-started?app=mixpanel",
    websiteUrl: "https://mixpanel.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 23,
    name: "Greenhouse",
    slug: "greenhouse",
    description:
      "Integrate with Greenhouse ATS for enhanced candidate management. Sync data, streamline workflows, and leverage Greenhouse's powerful recruiting tools.",
    shortDescription: "Advanced ATS integration and candidate management.",
    category: "HR Tools",
    categoryId: 5,
    categorySlug: "hr-tools",
    icon: "/img/apps/greenhouse-icon.png",
    screenshots: ["/img/apps/greenhouse-screenshot-1.png"],
    features: [
      "ATS data synchronization",
      "Interview scheduling",
      "Candidate scoring",
      "Team collaboration",
      "Advanced reporting",
    ],
    installUrl: "/get-started?app=greenhouse",
    websiteUrl: "https://greenhouse.io",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 24,
    name: "WhatsApp Business",
    slug: "whatsapp-business",
    description:
      "Communicate with candidates via WhatsApp Business. Send interview reminders, answer questions, and provide quick updates to candidates directly through WhatsApp.",
    shortDescription: "Candidate communication via WhatsApp.",
    category: "Communication",
    categoryId: 1,
    categorySlug: "communication",
    icon: "/img/apps/whatsapp-icon.png",
    screenshots: ["/img/apps/whatsapp-screenshot-1.png"],
    features: [
      "Direct candidate messaging",
      "Automated notifications",
      "Interview reminders",
      "Quick responses",
      "Global reach",
    ],
    installUrl: "/get-started?app=whatsapp-business",
    websiteUrl: "https://www.whatsapp.com/business",
    isVerified: true,
    isPopular: true,
    isNew: true,
  },
  {
    id: 25,
    name: "Basecamp",
    slug: "basecamp",
    description:
      "Organize your recruitment projects with Basecamp. Create projects for each open position, track progress, and keep your team aligned throughout the hiring process.",
    shortDescription: "Simple project management for recruitment teams.",
    category: "Project Management",
    categoryId: 2,
    categorySlug: "project-management",
    icon: "/img/apps/basecamp-icon.png",
    screenshots: ["/img/apps/basecamp-screenshot-1.png"],
    features: [
      "Project organization",
      "Team collaboration",
      "File sharing",
      "Message boards",
      "Schedule management",
    ],
    installUrl: "/get-started?app=basecamp",
    websiteUrl: "https://basecamp.com",
    isVerified: true,
    isPopular: false,
    isNew: false,
  },
  {
    id: 26,
    name: "Stack Overflow Jobs",
    slug: "stack-overflow-jobs",
    description:
      "Post technical job openings on Stack Overflow Jobs. Reach developers, engineers, and technical professionals who are actively looking for new opportunities.",
    shortDescription: "Job board for technical professionals.",
    category: "Job Boards",
    categoryId: 3,
    categorySlug: "job-boards",
    icon: "/img/apps/stackoverflow-icon.png",
    screenshots: ["/img/apps/stackoverflow-screenshot-1.png"],
    features: [
      "Technical job posting",
      "Developer-focused audience",
      "Candidate matching",
      "Company branding",
      "Performance metrics",
    ],
    installUrl: "/get-started?app=stack-overflow-jobs",
    websiteUrl: "https://stackoverflow.com/jobs",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
  {
    id: 27,
    name: "HubSpot",
    slug: "hubspot",
    description:
      "Integrate HubSpot CRM with Flowxtra to manage candidate relationships. Track interactions, nurture leads, and convert candidates into hires with powerful CRM tools.",
    shortDescription: "CRM integration for candidate relationship management.",
    category: "HR Tools",
    categoryId: 5,
    categorySlug: "hr-tools",
    icon: "/img/apps/hubspot-icon.png",
    screenshots: ["/img/apps/hubspot-screenshot-1.png"],
    features: [
      "Candidate CRM",
      "Email tracking",
      "Pipeline management",
      "Automation workflows",
      "Analytics and reporting",
    ],
    installUrl: "/get-started?app=hubspot",
    websiteUrl: "https://hubspot.com",
    isVerified: true,
    isPopular: true,
    isNew: false,
  },
];

// Helper function to get mock apps with filtering
export function getMockApps(params: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): {
  apps: App[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalApps: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
} {
  let filteredApps = [...mockApps];

  // Filter by category
  if (params.category && params.category !== "all") {
    filteredApps = filteredApps.filter(
      (app) => app.categorySlug === params.category
    );
  }

  // Filter by search query
  if (params.search) {
    const query = params.search.toLowerCase();
    filteredApps = filteredApps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query)
    );
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 12;
  const totalApps = filteredApps.length;
  const totalPages = Math.ceil(totalApps / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedApps = filteredApps.slice(startIndex, endIndex);

  return {
    apps: paginatedApps,
    pagination: {
      currentPage: page,
      totalPages,
      totalApps,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

// Helper function to get mock app by slug
export function getMockApp(slug: string): App | null {
  const app = mockApps.find((a) => a.slug === slug);
  return app || null;
}

// Helper function to get related apps
export function getMockRelatedApps(
  currentAppId: number,
  categorySlug: string,
  limit: number = 3
): App[] {
  return mockApps
    .filter(
      (app) => app.id !== currentAppId && app.categorySlug === categorySlug
    )
    .slice(0, limit);
}
