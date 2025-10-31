'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

// Feature data structure
interface Feature {
  id: string;
  icon: string;
  name: string;
  free: string | React.ReactNode;
  starter: string | React.ReactNode;
  basic: string | React.ReactNode;
  professional: string | React.ReactNode;
  advanced: string | React.ReactNode;
  premium: string | React.ReactNode;
  enterprise: string | React.ReactNode;
  description: string;
}

type PlanKey = 'free' | 'starter' | 'basic' | 'professional' | 'advanced' | 'premium' | 'enterprise';

interface Plan {
  key: PlanKey;
  name: string;
  color: string;
}

export default function CompareFeatures() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('professional'); // Default to Professional
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const plans: Plan[] = [
    { key: 'free', name: 'Free', color: '#6b7280' },
    { key: 'starter', name: 'Starter', color: '#3b82f6' },
    { key: 'basic', name: 'Basic', color: '#10b981' },
    { key: 'professional', name: 'Professional', color: '#006980' },
    { key: 'advanced', name: 'Advanced', color: '#8b5cf6' },
    { key: 'premium', name: 'Premium', color: '#f59e0b' },
    { key: 'enterprise', name: 'Enterprise', color: '#ef4444' },
  ];

  const toggleRow = (descId: string) => {
    setExpandedRow(expandedRow === descId ? null : descId);
  };

  // Get current plan details
  const currentPlanIndex = plans.findIndex(p => p.key === selectedPlan);
  const currentPlan = plans[currentPlanIndex];

  const handlePlanChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPlanIndex < plans.length - 1) {
      setSelectedPlan(plans[currentPlanIndex + 1].key);
    } else if (direction === 'prev' && currentPlanIndex > 0) {
      setSelectedPlan(plans[currentPlanIndex - 1].key);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next plan
        handlePlanChange('next');
      } else {
        // Swipe right - previous plan
        handlePlanChange('prev');
      }
    }
  };

  const Unlimited = () => <span className="oi">Unlimited</span>;

  // All features data
  const features: Feature[] = [
    // Available for All Plans
    {
      id: 'desc-jobs',
      icon: 'fas fa-briefcase',
      name: 'Job postings / month',
      free: '10',
      starter: '15',
      basic: '25',
      professional: '35',
      advanced: '45',
      premium: '65',
      enterprise: <Unlimited />,
      description: 'Number of active job slots you can publish simultaneously per month.',
    },
    {
      id: 'desc-seats',
      icon: 'fas fa-users',
      name: 'User seats',
      free: '1',
      starter: '5',
      basic: '10',
      professional: '15',
      advanced: '20',
      premium: <Unlimited />,
      enterprise: <Unlimited />,
      description: 'Total team members who can collaborate inside your account.',
    },
    {
      id: 'desc-support',
      icon: 'fas fa-headset',
      name: 'Support 24/7',
      free: 'Tickets',
      starter: 'Chat',
      basic: 'Chat',
      professional: 'Chat',
      advanced: 'Chat',
      premium: 'Chat, Online Meetings',
      enterprise: 'Chat, Online Meetings',
      description: 'Round-the-clock priority support through Chat and Online Meetings with our senior support engineers.',
    },
    {
      id: 'desc-gdpr-ccpa',
      icon: 'fas fa-shield-alt',
      name: 'GDPR & CCPA compliance',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Full compliance with GDPR (European Union) and CCPA (California) data protection regulations. Includes data subject rights management, consent tracking, data portability, right to erasure, privacy controls, and automated compliance reports. Protect candidate privacy and meet international legal requirements.',
    },
    {
      id: 'desc-google-jobs',
      icon: 'fab fa-google',
      name: 'Google job listing',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Automatically list your jobs on Google for Jobs for free. Increase visibility and reach more candidates through Google Search without additional costs.',
    },
    {
      id: 'desc-meet',
      icon: 'fas fa-video',
      name: 'Online meeting tool',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Schedule and host interviews with candidates directly from Flowxtra.',
    },
    {
      id: 'desc-cv-parsing',
      icon: 'fas fa-file-circle-check',
      name: 'CV parsing',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Automatically extract and structure candidate information from CVs and resumes. Supports multiple file formats including PDF, Word, and text files. Intelligently parses contact details, work experience, education, skills, and qualifications to populate candidate profiles instantly.',
    },
    {
      id: 'desc-kanban',
      icon: 'fas fa-columns',
      name: 'Kanban board',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Kanban-style board to visualize and move candidates through hiring stages. Simple column view for quick candidate management.',
    },
    {
      id: 'desc-diagram',
      icon: 'fas fa-diagram-project',
      name: 'Diagram board',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Advanced diagram board with drag-and-drop functionality, detailed activity history, and comprehensive candidate tracking. Enhanced visualization with filters and analytics.',
    },
    {
      id: 'desc-multipost',
      icon: 'fas fa-bullhorn',
      name: 'Multiposting',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Distribute job ads to multiple channels simultaneously for maximum exposure. Includes Google Jobs, LinkedIn, and other platforms.',
    },
    {
      id: 'desc-career',
      icon: 'fas fa-building',
      name: 'Career page',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Your branded public careers page listing all open roles.',
    },
    {
      id: 'desc-widget',
      icon: 'fas fa-code',
      name: 'Job widget',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Embed your job list on any website with a copy-paste snippet.',
    },
    {
      id: 'desc-api',
      icon: 'fas fa-plug',
      name: 'ATS integrations',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Connect Flowxtra with your HR stack, websites, and internal tools.',
    },
    {
      id: 'desc-2fa',
      icon: 'fas fa-shield-halved',
      name: 'Two-factor authentication',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Protect accounts with an extra verification step at login. Also known as 2FA.',
    },
    {
      id: 'desc-crm',
      icon: 'fas fa-diagram-project',
      name: 'Integration with CRM systems',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Sync candidate and client data with your CRM for seamless workflows.',
    },
    {
      id: 'desc-api-mcp',
      icon: 'fas fa-book-open',
      name: 'API/MCP',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Complete documentation for integrating Flowxtra with your custom systems and LLMs. Includes detailed API references, MCP protocol guides, code examples, and integration tutorials.',
    },
    {
      id: 'desc-subdomain',
      icon: 'fas fa-globe',
      name: 'Company page',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Get a branded subdomain with your company profile and jobs.',
    },
    {
      id: 'desc-custom-llms',
      icon: 'fas fa-brain',
      name: 'Custom LLMs Integration',
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Integrate your own LLMs that are hosted on your infrastructure. We provide the integration tools (API & MCP) so your AI models can work seamlessly within Flowxtra while staying in your environment.',
    },
    // Available from Starter and Above
    {
      id: 'desc-privacy-generator',
      icon: 'fas fa-file-contract',
      name: 'Privacy policy generator',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Create customized privacy policies tailored to your needs. Choose from pre-built templates for different privacy regulations (GDPR, CCPA, etc.) and customize the text to match your company requirements. Generate professional, legally-compliant privacy policies without legal expertise.',
    },
    {
      id: 'desc-filtering',
      icon: 'fas fa-filter',
      name: 'Smart candidate filtering',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Auto-prioritizes applicants based on role requirements and custom criteria.',
    },
    {
      id: 'desc-custom-fields',
      icon: 'fas fa-list-check',
      name: 'Custom fields on jobs',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Add any fields you need to structure job data and forms.',
    },
    {
      id: 'desc-roles',
      icon: 'fas fa-user-shield',
      name: 'Roles & permissions',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Granular access control for recruiters, hiring managers, and admins.',
    },
    {
      id: 'desc-hiring-stages',
      icon: 'fas fa-chart-line',
      name: 'Hiring stages',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Customizable hiring stages. Define and manage recruitment phases like application review, interviews, assessments, and final decisions. Fully customizable to match your unique hiring workflow.',
    },
    {
      id: 'desc-appstore',
      icon: 'fas fa-puzzle-piece',
      name: 'App store integrations',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Plug-and-play integrations with popular HR, comms, and analytics tools.',
    },
    {
      id: 'desc-ratings',
      icon: 'fas fa-star',
      name: 'Rating sheets',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Structured scorecards to evaluate candidates consistently.',
    },
    {
      id: 'desc-sharing',
      icon: 'fas fa-share-alt',
      name: 'Custom social sharing',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Customize OG tags, banners, and captions for job links.',
    },
    {
      id: 'desc-brandkit',
      icon: 'fas fa-palette',
      name: 'Brand Kit',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Customize your entire system with your brand colors, fonts, and logo. Your career pages, emails, and all candidate-facing content will reflect your brand identity consistently.',
    },
    {
      id: 'desc-email-templates',
      icon: 'fas fa-envelope',
      name: 'Email template builder',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Design and customize email templates for all candidate communications. Create branded, professional emails with your own design, layout, and messaging.',
    },
    {
      id: 'desc-auto-msg',
      icon: 'fas fa-envelope-open-text',
      name: 'Automated messages',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Send automatic confirmations, rejections, and reminders to candidates.',
    },
    {
      id: 'desc-custom-career',
      icon: 'fas fa-file-lines',
      name: 'Custom career page',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Build rich careers pages with sections for culture, benefits, and teams. Supports multi-section layouts.',
    },
    {
      id: 'desc-domain',
      icon: 'fas fa-link',
      name: 'Custom domain',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Use your own domain for careers pages and application forms.',
    },
    {
      id: 'desc-skills-reservoir',
      icon: 'fas fa-database',
      name: 'Skills reservoir',
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Store and organize top candidates who didn\'t get hired for future opportunities. Build a database of qualified talent ready for upcoming positions that match their skills.',
    },
    // Available from Basic and Above
    {
      id: 'desc-storage',
      icon: 'fas fa-cloud',
      name: 'Unlimited data storage',
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Store files, resumes, and activity logs without hard caps.',
    },
    {
      id: 'desc-journey-flow',
      icon: 'fas fa-route',
      name: 'Journey flow',
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Advanced workflow automation builder (like n8n). Create custom recruitment processes with conditional paths based on candidate responses. Auto-send welcome emails, request additional info, send contracts, training courses, and create dynamic workflows with triggers, wait times, conditions, and multiple branches. Build personalized candidate journeys for each job with smart segmentation based on location, answers, or any custom criteria.',
    },
    {
      id: 'desc-ai-ad',
      icon: 'fas fa-wand-magic-sparkles',
      name: 'AI job ad builder',
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Generate optimized job descriptions aligned to role requirements.',
    },
    {
      id: 'desc-clients',
      icon: 'fas fa-handshake',
      name: 'Client profiles',
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Manage multiple client companies with separate jobs and teams. Perfect for agencies.',
    },
    {
      id: 'desc-offices',
      icon: 'fas fa-location-dot',
      name: 'Multi office location',
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Organize jobs, users, and reports by location. Support for multi-location companies.',
    },
    // Available from Professional and Above
    {
      id: 'desc-newsletter',
      icon: 'fas fa-newspaper',
      name: 'Newsletter',
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Send automated job alerts to candidates who opted-in during application. Notify them about new opportunities via email, SMS, WhatsApp, or Telegram. Includes Mailchimp integration for advanced campaigns and automatic job vacancy notifications.',
    },
    {
      id: 'desc-talent',
      icon: 'fas fa-user-group',
      name: 'Talent pool',
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Maintain a database of silver-medalist and future-fit candidates.',
    },
    {
      id: 'desc-reports',
      icon: 'fas fa-chart-bar',
      name: 'Reports & analytics',
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Insights on sources, pipeline speed, drop-off, and team productivity. Includes detailed applicant reports.',
    },
    {
      id: 'desc-migration',
      icon: 'fas fa-arrow-right-arrow-left',
      name: 'Database migration',
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'We help import candidates, jobs, and notes from other systems.',
    },
    {
      id: 'desc-export',
      icon: 'fas fa-file-export',
      name: 'Candidate export',
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: 'Export lists and reports for external analysis and backups. Supports CSV and Excel formats.',
    },
  ];

  // Coming Soon Features
  const comingSoonFeatures: Feature[] = [
    {
      id: 'desc-esign',
      icon: 'fas fa-file-signature',
      name: 'eSignature',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Send, sign, and track legally binding digital contracts with audit trails and timestamps.',
    },
    {
      id: 'desc-elearn',
      icon: 'fas fa-graduation-cap',
      name: 'E-learning',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Train hiring teams with built-in courses and certifications. Includes company-specific course creation.',
    },
    {
      id: 'desc-assess',
      icon: 'fas fa-clipboard-check',
      name: 'Assessments',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Skills and personality tests with structured, comparable results.',
    },
    {
      id: 'desc-social-ads',
      icon: 'fas fa-rectangle-ad',
      name: 'Social Ads Manager',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Create and manage job advertisements across major platforms including Facebook, Instagram, SnapChat, Google, YouTube, TikTok, and LinkedIn. Save on additional fees by managing all your social media advertising directly within Flowxtra.',
    },
    {
      id: 'desc-id-verification',
      icon: 'fas fa-id-card',
      name: 'ID Verification',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Verify candidate identity documents including passports, national IDs, and other official identification documents for enhanced security and compliance.',
    },
    {
      id: 'desc-apply-chatbot',
      icon: 'fas fa-comment-dots',
      name: 'Apply via social Chatbot',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Connect your company\'s own WhatsApp Business, Telegram, Facebook Messenger, Discord, or WeChat accounts. Candidates apply directly through your business chat, reducing costs while maintaining direct communication with applicants.',
    },
    {
      id: 'desc-candidate-presentation',
      icon: 'fas fa-share-from-square',
      name: 'Candidate presentation',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Generate secure shareable links to present candidate profiles with your notes and comments to clients, managers, or external partners. Share specific candidate information without granting full system access. Candidates consent to information sharing in advance. Perfect for recruitment agencies presenting profiles to clients or internal stakeholders reviewing candidates.',
    },
    {
      id: 'desc-social',
      icon: 'fas fa-share-nodes',
      name: 'Social media posts',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Schedule and publish unlimited posts, stories, videos, and any content across all social media platforms. Full content scheduling and management system.',
    },
    {
      id: 'desc-chatbot',
      icon: 'fas fa-robot',
      name: 'AI Chatbot',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Answer candidate FAQs and pre-screen directly on your careers pages.',
    },
    {
      id: 'desc-one-way-video',
      icon: 'fas fa-video-camera',
      name: 'One-way video interviews',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Candidates can record and upload video responses during the application process. Screen candidates asynchronously by reviewing pre-recorded video answers to your custom questions. Save time by watching responses on your schedule without coordinating live interview times.',
    },
    {
      id: 'desc-onboarding',
      icon: 'fas fa-user-plus',
      name: 'Employee onboarding',
      free: 'soon',
      starter: 'soon',
      basic: 'soon',
      professional: 'soon',
      advanced: 'soon',
      premium: 'soon',
      enterprise: 'soon',
      description: 'Streamline new hire integration with automated onboarding workflows. Send employment documents, contracts, and training materials. Create customizable checklists for new employees, schedule their first days, introduce them to the team, and track their progress. Complete onboarding journey from offer acceptance to full productivity.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 mb-16">
      {/* Accordion Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-button-hover text-white py-4 px-6 rounded-lg transition-colors font-semibold text-lg shadow-md"
      >
        <span>Compare features</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="w-full mt-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-900">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

          {/* Mobile/Tablet Tabs Navigation - Hidden on Desktop */}
          <div className="lg:hidden sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            {/* Horizontal Scrollable Tabs */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 p-4 min-w-max">
                {plans.map((plan) => (
                  <button
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                      selectedPlan === plan.key
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    style={{
                      backgroundColor: selectedPlan === plan.key ? plan.color : undefined,
                    }}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Swipe Navigation with Arrows */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => handlePlanChange('prev')}
                disabled={currentPlanIndex === 0}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  currentPlanIndex === 0
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentPlan.color }}
                />
                <span className="font-bold text-gray-900 dark:text-white">
                  {currentPlan.name}
                </span>
              </div>

              <button
                onClick={() => handlePlanChange('next')}
                disabled={currentPlanIndex === plans.length - 1}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  currentPlanIndex === plans.length - 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Table View - Hidden on Mobile/Tablet */}
          <div className="hidden lg:block overflow-x-auto">
          <style dangerouslySetInnerHTML={{ __html: `
            .fx-wrap {
              width: 100% !important;
              margin: 0 !important;
              padding: 32px 16px !important;
              font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
            }

            .fx-table {
              width: 100% !important;
              border-collapse: collapse !important;
              border: 1px solid #c6cdd3 !important;
              border-left: none !important;
              border-right: none !important;
              background: #ffffff !important;
            }

            :global(.dark) .fx-table {
              background: #111827 !important;
              border-color: #374151 !important;
            }

            .fx-table th,
            .fx-table td {
              padding: 14px !important;
              border-bottom: 1px solid #c6cdd3 !important;
              border-left: none !important;
              border-right: none !important;
              text-align: center !important;
              background: transparent !important;
              color: #111827 !important;
              font-size: 14px !important;
              line-height: 1.5 !important;
              vertical-align: middle !important;
            }

            :global(.dark) .fx-table th,
            :global(.dark) .fx-table td {
              color: #f3f4f6 !important;
              border-bottom-color: #374151 !important;
            }

            .fx-table th.fx-feature,
            .fx-table td.fx-feature {
              text-align: left !important;
              padding-left: 16px !important;
              width: 30% !important;
              font-weight: 600 !important;
            }

            .fx-table thead th {
              background: #f8fafc !important;
              font-weight: 800 !important;
              color: #212b36 !important;
            }

            :global(.dark) .fx-table thead th {
              background: #1f2937 !important;
              color: #f3f4f6 !important;
            }

            .fx-table th:nth-child(5),
            .fx-table td:nth-child(5) {
              background-color: #f3f4f6 !important;
            }

            :global(.dark) .fx-table th:nth-child(5),
            :global(.dark) .fx-table td:nth-child(5) {
              background-color: #1f2937 !important;
            }

            .oi {
              color: #006980;
              font-size: 15px;
              vertical-align: middle;
            }

            .fx-hoverable {
              cursor: help;
            }

            .fx-hoverable:hover td {
              background: rgba(0, 105, 128, 0.07) !important;
              color: #00a8cd !important;
              transition: all 0.2s ease !important;
            }

            .fx-hoverable:hover td.fx-feature {
              color: #111827 !important;
            }

            :global(.dark) .fx-hoverable:hover td.fx-feature {
              color: #f3f4f6 !important;
            }

            .fx-hoverable:hover .oi {
              transform: scale(1.1) !important;
              transition: transform 0.2s ease !important;
            }

            .fx-explain {
              background: #f9fafb !important;
            }

            :global(.dark) .fx-explain {
              background: #1f2937 !important;
            }

            .fx-explain td {
              padding: 12px 16px !important;
              text-align: left !important;
              color: #374151 !important;
            }

            :global(.dark) .fx-explain td {
              color: #d1d5db !important;
            }

            .fx-explain-inner {
              border-left: 3px solid #006980;
              padding-left: 12px;
            }

            .fx-table th[colspan='8'] {
              text-align: left !important;
              padding-left: 16px !important;
            }
          ` }} />

          <div className="fx-wrap">
            <table className="fx-table">
              <thead>
                <tr>
                  <th className="fx-feature">Feature / Usage</th>
                  <th>Free</th>
                  <th>Starter</th>
                  <th>Basic</th>
                  <th>Professional</th>
                  <th>Advanced</th>
                  <th>Premium</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {/* Main Features */}
                {features.map((feature) => (
                  <React.Fragment key={feature.id}>
                    <tr
                      className="fx-hoverable"
                      onClick={() => toggleRow(feature.id)}
                    >
                      <td className="fx-feature">
                        <i
                          className={feature.icon}
                          style={{ color: '#006980', marginRight: '8px' }}
                        ></i>
                        {feature.name}
                      </td>
                      <td data-plan="Free">{feature.free}</td>
                      <td data-plan="Starter">{feature.starter}</td>
                      <td data-plan="Basic">{feature.basic}</td>
                      <td data-plan="Professional">{feature.professional}</td>
                      <td data-plan="Advanced">{feature.advanced}</td>
                      <td data-plan="Premium">{feature.premium}</td>
                      <td data-plan="Enterprise">{feature.enterprise}</td>
                    </tr>
                    {expandedRow === feature.id && (
                      <tr className="fx-explain">
                        <td colSpan={8}>
                          <div className="fx-explain-inner">
                            {feature.description}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {/* Coming Soon Header */}
                <tr>
                  <th colSpan={8} style={{ textAlign: 'left', paddingLeft: '16px', background: '#f8fafc', fontWeight: 800 }}>
                    Coming Soon
                  </th>
                </tr>

                {/* Coming Soon Features */}
                {comingSoonFeatures.map((feature) => (
                  <React.Fragment key={feature.id}>
                    <tr
                      className="fx-hoverable"
                      onClick={() => toggleRow(feature.id)}
                    >
                      <td className="fx-feature">
                        <i
                          className={feature.icon}
                          style={{ color: '#006980', marginRight: '8px' }}
                        ></i>
                        {feature.name}
                      </td>
                      <td data-plan="Free">{feature.free}</td>
                      <td data-plan="Starter">{feature.starter}</td>
                      <td data-plan="Basic">{feature.basic}</td>
                      <td data-plan="Professional">{feature.professional}</td>
                      <td data-plan="Advanced">{feature.advanced}</td>
                      <td data-plan="Premium">{feature.premium}</td>
                      <td data-plan="Enterprise">{feature.enterprise}</td>
                    </tr>
                    {expandedRow === feature.id && (
                      <tr className="fx-explain">
                        <td colSpan={8}>
                          <div className="fx-explain-inner">
                            {feature.description}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          </div>

          {/* Mobile/Tablet List View - Hidden on Desktop */}
          <div
            className="lg:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="p-4 space-y-3">
              {/* Main Features */}
              {features.map((feature) => {
                const value = feature[selectedPlan];
                const isAvailable = value !== '—';
                
                return (
                  <React.Fragment key={feature.id}>
                    <div
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => toggleRow(feature.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <i
                            className={feature.icon}
                            style={{ color: currentPlan.color, fontSize: '20px' }}
                          ></i>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {feature.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isAvailable ? (
                            <div className="flex items-center gap-2">
                              {typeof value === 'string' ? (
                                <span
                                  className="font-bold text-sm"
                                  style={{ color: currentPlan.color }}
                                >
                                  {value}
                                </span>
                              ) : (
                                <span
                                  className="font-bold text-sm"
                                  style={{ color: currentPlan.color }}
                                >
                                  {value}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600 font-medium text-sm">
                              Not available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {expandedRow === feature.id && (
                      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 -mt-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Coming Soon Header */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mt-6">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Coming Soon
                </h3>
              </div>

              {/* Coming Soon Features */}
              {comingSoonFeatures.map((feature) => {
                const value = feature[selectedPlan];
                
                return (
                  <React.Fragment key={feature.id}>
                    <div
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => toggleRow(feature.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <i
                            className={feature.icon}
                            style={{ color: currentPlan.color, fontSize: '20px' }}
                          ></i>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {feature.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className="text-xs font-medium px-2 py-1 rounded"
                            style={{
                              backgroundColor: `${currentPlan.color}20`,
                              color: currentPlan.color,
                            }}
                          >
                            Soon
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedRow === feature.id && (
                      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 -mt-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* CSS for hiding scrollbar */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `
          }} />
        </div>
      )}
    </div>
  );
}