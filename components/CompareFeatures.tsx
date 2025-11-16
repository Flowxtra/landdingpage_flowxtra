'use client';

import React, { useState, useRef, useEffect } from 'react';
// Import individual icons to avoid loading entire lucide-react bundle
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

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

interface CompareFeaturesProps {
  defaultOpen?: boolean;
}

export default function CompareFeatures({ defaultOpen = true }: CompareFeaturesProps) {
  const t = useTranslations("pricing");
  const tCompare = useTranslations("compareFeatures");
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('free'); // Default to Free
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const plans: Plan[] = [
    { key: 'free', name: t("plans.free"), color: '#006980' },
    { key: 'starter', name: t("plans.starter"), color: '#006980' },
    { key: 'basic', name: t("plans.basic"), color: '#006980' },
    { key: 'professional', name: t("plans.professional"), color: '#006980' },
    { key: 'advanced', name: t("plans.advanced"), color: '#006980' },
    // { key: 'premium', name: t("plans.premium"), color: '#006980' }, // COMMENTED OUT
    { key: 'enterprise', name: t("plans.enterprise"), color: '#006980' },
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

  // Scroll to Free plan tab on mobile when component becomes visible
  // Use horizontal scroll only (scrollLeft) to prevent vertical page scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (!isMobile) return; // Only on mobile
    
    // Check if component is visible before scrolling
    const checkAndScroll = () => {
      const tabsContainer = document.querySelector('.overflow-x-auto.scrollbar-hide') as HTMLElement;
      if (!tabsContainer) return;
      
      const freeTab = tabsContainer.querySelector('[data-plan-key="free"]') as HTMLElement;
      if (!freeTab) return;
      
      // Only scroll horizontally within the container, not the page
      // Calculate position relative to container
      const containerRect = tabsContainer.getBoundingClientRect();
      const tabRect = freeTab.getBoundingClientRect();
      const scrollLeft = freeTab.offsetLeft - tabsContainer.offsetLeft;
      
      // Scroll only the container horizontally, not the page
      tabsContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    };
    
    // Wait for component to be visible before scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Small delay to ensure DOM is ready
          setTimeout(checkAndScroll, 200);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    const component = document.querySelector('[data-compare-features]');
    if (component) {
      observer.observe(component);
    } else {
      // Fallback: try after a delay if component not found
      setTimeout(() => {
        const component = document.querySelector('[data-compare-features]');
        if (component) {
          observer.observe(component);
        }
      }, 500);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const Unlimited = () => <span className="oi">{tCompare("unlimited")}</span>;

  // All features data
  const features: Feature[] = [
    // Available for All Plans
    {
      id: 'desc-jobs',
      icon: 'fas fa-briefcase',
      name: tCompare('features.jobPostings.name'),
      free: tCompare("unlimited"),
      starter: tCompare("unlimited"),
      basic: tCompare("unlimited"),
      professional: tCompare("unlimited"),
      advanced: tCompare("unlimited"),
      premium: tCompare("unlimited"),
      enterprise: tCompare("unlimited"),
      description: tCompare('features.jobPostings.description'),
    },
    {
      id: 'desc-social-media-posting',
      icon: 'fas fa-paper-plane',
      name: tCompare('features.socialMediaPosting.name'),
      free: tCompare("unlimited"),
      starter: tCompare("unlimited"),
      basic: tCompare("unlimited"),
      professional: tCompare("unlimited"),
      advanced: tCompare("unlimited"),
      premium: tCompare("unlimited"),
      enterprise: tCompare("unlimited"),
      description: tCompare('features.socialMediaPosting.description'),
    },
  
    {
      id: 'desc-social-media-accounts',
      icon: 'fas fa-share-alt',
      name: tCompare('features.socialMediaAccounts.name'),
      free: '3',
      starter: '5',
      basic: '6',
      professional: '10',
      advanced: tCompare("unlimited"),
      premium: tCompare("unlimited"),
      enterprise: tCompare("unlimited"),
      description: tCompare('features.socialMediaAccounts.description'),
    },
    {
      id: 'desc-social-media-scheduling',
      icon: 'fas fa-calendar-alt',
      name: tCompare('features.socialMediaScheduling.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.socialMediaScheduling.description'),
    },
    {
      id: 'desc-seats',
      icon: 'fas fa-users',
      name: tCompare('features.userSeats.name'),
      free: '1',
      starter: '2',
      basic: '5',
      professional: '10',
      advanced: '15',
      premium: tCompare("unlimited"),
      enterprise: tCompare("unlimited"),
      description: tCompare('features.userSeats.description'),
    },
    {
      id: 'desc-support',
      icon: 'fas fa-headset',
      name: tCompare('features.support247.name'),
      free: tCompare('values.tickets'),
      starter: tCompare('values.chat'),
      basic: tCompare('values.chat'),
      professional: tCompare('values.chat'),
      advanced: tCompare('values.chatOnlineMeetings'),
      premium: tCompare('values.chatOnlineMeetings'),
      enterprise: tCompare('values.chatOnlineMeetings'),
      description: tCompare('features.support247.description'),
    },
    {
      id: 'desc-gdpr-ccpa',
      icon: 'fas fa-shield-alt',
      name: tCompare('features.gdprCcpa.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.gdprCcpa.description'),
    },
    {
      id: 'desc-google-jobs',
      icon: 'fab fa-google',
      name: tCompare('features.googleJobs.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.googleJobs.description'),
    },
    {
      id: 'desc-meet',
      icon: 'fas fa-video',
      name: tCompare('features.onlineMeeting.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.onlineMeeting.description'),
    },
    {
      id: 'desc-cv-parsing',
      icon: 'fas fa-file-circle-check',
      name: tCompare('features.cvParsing.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.cvParsing.description'),
    },
    {
      id: 'desc-kanban',
      icon: 'fas fa-columns',
      name: tCompare('features.kanbanBoard.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.kanbanBoard.description'),
    },
    {
      id: 'desc-diagram',
      icon: 'fas fa-diagram-project',
      name: tCompare('features.diagramBoard.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.diagramBoard.description'),
    },
    {
      id: 'desc-multipost',
      icon: 'fas fa-bullhorn',
      name: tCompare('features.multiposting.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.multiposting.description'),
    },
    {
      id: 'desc-career',
      icon: 'fas fa-building',
      name: tCompare('features.careerPage.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.careerPage.description'),
    },
   
  
    {
      id: 'desc-widget',
      icon: 'fas fa-code',
      name: tCompare('features.jobWidget.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.jobWidget.description'),
    },
    {
      id: 'desc-api',
      icon: 'fas fa-plug',
      name: tCompare('features.atsIntegrations.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.atsIntegrations.description'),
    },
    {
      id: 'desc-2fa',
      icon: 'fas fa-shield-halved',
      name: tCompare('features.twoFactorAuth.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.twoFactorAuth.description'),
    },
    {
      id: 'desc-crm',
      icon: 'fas fa-diagram-project',
      name: tCompare('features.crmIntegration.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.crmIntegration.description'),
    },
    {
      id: 'desc-api-mcp',
      icon: 'fas fa-book-open',
      name: tCompare('features.apiMcp.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.apiMcp.description'),
    },
    {
      id: 'desc-subdomain',
      icon: 'fas fa-globe',
      name: tCompare('features.companyPage.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.companyPage.description'),
    },
    {
      id: 'desc-custom-llms',
      icon: 'fas fa-brain',
      name: tCompare('features.customLlms.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.customLlms.description'),
    },
    {
      id: 'desc-ssl-certificate',
      icon: 'fas fa-lock',
      name: tCompare('features.sslCertificate.name'),
      free: '✓',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.sslCertificate.description'),
    },
    // Available from Starter and Above
    {
      id: 'desc-privacy-generator',
      icon: 'fas fa-file-contract',
      name: tCompare('features.privacyGenerator.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.privacyGenerator.description'),
    },
    {
      id: 'desc-smtp',
      icon: 'fas fa-envelope',
      name: tCompare('features.smtp.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.smtp.description'),
    },
  
    {
      id: 'desc-filtering',
      icon: 'fas fa-filter',
      name: tCompare('features.smartFiltering.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.smartFiltering.description'),
    },
    {
      id: 'desc-custom-fields',
      icon: 'fas fa-list-check',
      name: tCompare('features.customFields.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.customFields.description'),
    },
    {
      id: 'desc-roles',
      icon: 'fas fa-user-shield',
      name: tCompare('features.rolesPermissions.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.rolesPermissions.description'),
    },
    {
      id: 'desc-hiring-stages',
      icon: 'fas fa-chart-line',
      name: tCompare('features.hiringStages.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.hiringStages.description'),
    },
    {
      id: 'desc-appstore',
      icon: 'fas fa-puzzle-piece',
      name: tCompare('features.appStoreIntegrations.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.appStoreIntegrations.description'),
    },
    {
      id: 'desc-accessibility',
      icon: 'fas fa-universal-access',
      name: tCompare('features.accessibilityWcag.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.accessibilityWcag.description'),
    },
    {
      id: 'desc-ratings',
      icon: 'fas fa-star',
      name: tCompare('features.ratingSheets.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.ratingSheets.description'),
    },
    {
      id: 'desc-sharing',
      icon: 'fas fa-share-alt',
      name: tCompare('features.customSocialSharing.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.customSocialSharing.description'),
    },
    {
      id: 'desc-brandkit',
      icon: 'fas fa-palette',
      name: tCompare('features.brandKit.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.brandKit.description'),
    },
    {
      id: 'desc-email-templates',
      icon: 'fas fa-envelope',
      name: tCompare('features.emailTemplates.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.emailTemplates.description'),
    },
    {
      id: 'desc-auto-msg',
      icon: 'fas fa-envelope-open-text',
      name: tCompare('features.automatedMessages.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.automatedMessages.description'),
    },
    {
      id: 'desc-custom-career',
      icon: 'fas fa-file-lines',
      name: tCompare('features.customCareerPage.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.customCareerPage.description'),
    },
    {
      id: 'desc-domain',
      icon: 'fas fa-link',
      name: tCompare('features.customDomain.name'),
      free: '—',
      starter: '✓',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.customDomain.description'),
    },
    {
      id: 'desc-skills-reservoir',
      icon: 'fas fa-database',
      name: tCompare('features.skillsReservoir.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.skillsReservoir.description'),
    },
    // Available from Basic and Above
    {
      id: 'desc-storage',
      icon: 'fas fa-cloud',
      name: tCompare('features.unlimitedStorage.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.unlimitedStorage.description'),
    },
    {
      id: 'desc-remove-branding',
      icon: 'fas fa-tag',
      name: tCompare('features.removeBranding.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.removeBranding.description'),
    },
    {
      id: 'desc-journey-flow',
      icon: 'fas fa-route',
      name: tCompare('features.journeyFlow.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.journeyFlow.description'),
    },
    {
      id: 'desc-ai-ad',
      icon: 'fas fa-wand-magic-sparkles',
      name: tCompare('features.aiJobAdBuilder.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.aiJobAdBuilder.description'),
    },
    {
      id: 'desc-clients',
      icon: 'fas fa-handshake',
      name: tCompare('features.clientProfiles.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.clientProfiles.description'),
    },
    {
      id: 'desc-offices',
      icon: 'fas fa-location-dot',
      name: tCompare('features.multiOfficeLocation.name'),
      free: '—',
      starter: '—',
      basic: '✓',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.multiOfficeLocation.description'),
    },
    // Available from Professional and Above
    {
      id: 'desc-newsletter',
      icon: 'fas fa-newspaper',
      name: tCompare('features.newsletter.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.newsletter.description'),
    },
    {
      id: 'desc-candidate-presentation',
      icon: 'fas fa-share-from-square',
      name: tCompare('features.candidatePresentation.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.candidatePresentation.description'),
    },
    {
      id: 'desc-onboarding',
      icon: 'fas fa-user-plus',
      name: tCompare('features.employeeOnboarding.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.employeeOnboarding.description'),
    },
    {
      id: 'desc-social-media-pipeline',
      icon: 'fas fa-share-nodes',
      name: tCompare('features.socialMediaPipeline.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '✓',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.socialMediaPipeline.description'),
    },
    {
      id: 'desc-reports',
      icon: 'fas fa-chart-bar',
      name: tCompare('features.reportsAnalytics.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '—',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.reportsAnalytics.description'),
    },
    {
      id: 'desc-migration',
      icon: 'fas fa-arrow-right-arrow-left',
      name: tCompare('features.databaseMigration.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '—',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.databaseMigration.description'),
    },
    // Available from Advanced and Above
    {
      id: 'desc-export',
      icon: 'fas fa-file-export',
      name: tCompare('features.candidateExport.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '—',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.candidateExport.description'),
    },
    {
      id: 'desc-import',
      icon: 'fas fa-file-import',
      name: tCompare('features.candidateImport.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '—',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.candidateImport.description'),
    },


    {
      id: 'desc-talent',
      icon: 'fas fa-user-group',
      name: tCompare('features.talentPool.name'),
      free: '—',
      starter: '—',
      basic: '—',
      professional: '—',
      advanced: '✓',
      premium: '✓',
      enterprise: '✓',
      description: tCompare('features.talentPool.description'),
    },


  ];

  /*
   * Coming Soon features are temporarily hidden.
   * Uncomment the block below (and related render sections) when ready to display them again.
   *
   * const comingSoonFeatures: Feature[] = [ ... ];
   */

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 mb-16" data-compare-features>
      {/* Accordion Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? `${t("compareFeatures")} - Click to collapse` : `${t("compareFeatures")} - Click to expand`}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-button-hover text-white py-4 px-6 rounded-lg transition-colors font-semibold text-lg shadow-md"
      >
        <span>{t("compareFeatures")}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="w-full mt-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-900">
          {/* Mobile/Tablet Tabs Navigation - Hidden on Desktop */}
          <div className="lg:hidden sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            {/* Horizontal Scrollable Tabs */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 p-4 min-w-max" role="tablist" aria-label="Select pricing plan">
                {plans.map((plan) => (
                  <button
                    key={plan.key}
                    data-plan-key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    role="tab"
                    aria-selected={selectedPlan === plan.key}
                    aria-label={`${plan.name} pricing plan${selectedPlan === plan.key ? ' - Currently selected' : ''}`}
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
                aria-label={currentPlanIndex === 0 ? `${tCompare("previous")} plan - Disabled` : `${tCompare("previous")} plan - Go to previous pricing plan`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  currentPlanIndex === 0
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{tCompare("previous")}</span>
              </button>

              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentPlan.color }}
                  aria-hidden="true"
                />
                <span className="font-bold text-gray-900 dark:text-white">
                  {currentPlan.name}
                </span>
              </div>

              <button
                onClick={() => handlePlanChange('next')}
                disabled={currentPlanIndex === plans.length - 1}
                aria-label={currentPlanIndex === plans.length - 1 ? `${tCompare("next")} plan - Disabled` : `${tCompare("next")} plan - Go to next pricing plan`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                  currentPlanIndex === plans.length - 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="hidden sm:inline">{tCompare("next")}</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop Table View - Hidden on Mobile/Tablet */}
          <div className={cn("hidden lg:block overflow-x-auto", isRTL && "direction-rtl")}>
          <style dangerouslySetInnerHTML={{ __html: `
            .fx-wrap {
              width: 100% !important;
              margin: 0 !important;
              padding: 32px ${isRTL ? '16px 16px 16px' : '16px'} !important;
              font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
              direction: ${isRTL ? 'rtl' : 'ltr'} !important;
            }

            .fx-table {
              width: 100% !important;
              border-collapse: collapse !important;
              border: none !important;
              border-left: none !important;
              border-right: none !important;
              background: #ffffff !important;
            }

            .dark .fx-table {
              background: #111827 !important;
              border: none !important;
            }

            .fx-table th,
            .fx-table td {
              padding: 14px !important;
              border-bottom: none !important;
              border-left: none !important;
              border-right: none !important;
              text-align: center !important;
              background: transparent !important;
              color: #111827 !important;
              font-size: 14px !important;
              line-height: 1.5 !important;
              vertical-align: middle !important;
            }

            .dark .fx-table th,
            .dark .fx-table td {
              color: #f3f4f6 !important;
              border-bottom: none !important;
            }

            .fx-table th.fx-feature,
            .fx-table td.fx-feature {
              text-align: ${isRTL ? 'right' : 'left'} !important;
              padding-left: ${isRTL ? '0' : '16px'} !important;
              padding-right: ${isRTL ? '16px' : '0'} !important;
              width: 30% !important;
              font-weight: 600 !important;
            }

            .fx-table thead th {
              background: #f8fafc !important;
              font-weight: 800 !important;
              color: #212b36 !important;
            }

            .dark .fx-table thead th {
              background: #1f2937 !important;
              color: #f3f4f6 !important;
            }

            .fx-table th:nth-child(5),
            .fx-table td:nth-child(5) {
              background-color: #f3f4f6 !important;
            }

            .dark .fx-table th:nth-child(5),
            .dark .fx-table td:nth-child(5) {
              background-color: #1f2937 !important;
            }

            /* Premium column hidden - nth-child styles remain for Professional (5th column) */

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

            .dark .fx-hoverable:hover td.fx-feature {
              color: #f3f4f6 !important;
            }

            .fx-hoverable:hover .oi {
              transform: scale(1.1) !important;
              transition: transform 0.2s ease !important;
            }

            .fx-explain {
              background: #f9fafb !important;
            }

            .dark .fx-explain {
              background: #1f2937 !important;
            }

            .fx-explain td {
              padding: 12px 16px !important;
              text-align: ${isRTL ? 'right' : 'left'} !important;
              color: #374151 !important;
            }

            .dark .fx-explain td {
              color: #d1d5db !important;
            }

            .fx-explain-inner {
              border-left: ${isRTL ? 'none' : '3px solid #006980'};
              border-right: ${isRTL ? '3px solid #006980' : 'none'};
              padding-left: ${isRTL ? '0' : '12px'};
              padding-right: ${isRTL ? '12px' : '0'};
            }

            .fx-table th[colspan='7'] {
              text-align: ${isRTL ? 'right' : 'left'} !important;
              padding-left: ${isRTL ? '0' : '16px'} !important;
              padding-right: ${isRTL ? '16px' : '0'} !important;
            }
          ` }} />

          <div className="fx-wrap">
            <table className="fx-table">
              <thead>
                <tr>
                  <th className="fx-feature">{tCompare("featureUsage")}</th>
                  <th>{t("plans.free")}</th>
                  <th>{t("plans.starter")}</th>
                  <th>{t("plans.basic")}</th>
                  <th>{t("plans.professional")}</th>
                  <th>{t("plans.advanced")}</th>
                  {/* <th>{t("plans.premium")}</th> COMMENTED OUT */}
                  <th>{t("plans.enterprise")}</th>
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
                        {feature.name}
                      </td>
                      <td data-plan="Free">{feature.free}</td>
                      <td data-plan="Starter">{feature.starter}</td>
                      <td data-plan="Basic">{feature.basic}</td>
                      <td data-plan="Professional">{feature.professional}</td>
                      <td data-plan="Advanced">{feature.advanced}</td>
                      {/* <td data-plan="Premium">{feature.premium}</td> COMMENTED OUT */}
                      <td data-plan="Enterprise">{feature.enterprise}</td>
                    </tr>
                    {expandedRow === feature.id && (
                      <tr className="fx-explain">
                        <td colSpan={7}>
                          <div className="fx-explain-inner">
                            {feature.description}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {/* Coming soon section temporarily hidden */}
                {/*
                <tr>
                  <th colSpan={8} style={{ textAlign: isRTL ? 'right' : 'left', paddingLeft: isRTL ? '0' : '16px', paddingRight: isRTL ? '16px' : '0', background: '#f8fafc', fontWeight: 800 }}>
                    {tCompare("comingSoon")}
                  </th>
                </tr>
                {comingSoonFeatures.map((feature) => (
                  <React.Fragment key={feature.id}>
                    <tr
                      className="fx-hoverable"
                      onClick={() => toggleRow(feature.id)}
                    >
                      <td className="fx-feature">
                        <i
                          className={feature.icon}
                          style={{
                            color: '#006980',
                            marginRight: isRTL ? '0' : '8px',
                            marginLeft: isRTL ? '8px' : '0'
                          }}
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
                */}
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
                      role="button"
                      tabIndex={0}
                      aria-label={expandedRow === feature.id ? `${feature.name} - Click to collapse description` : `${feature.name} - Click to expand description`}
                      aria-expanded={expandedRow === feature.id}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleRow(feature.id);
                        }
                      }}
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
                                  className="font-bold text-sm text-primary dark:text-[#00A8CD]"
                                >
                                  {value}
                                </span>
                              ) : (
                                <span
                                  className="font-bold text-sm text-primary dark:text-[#00A8CD]"
                                >
                                  {value}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                              {tCompare("notAvailable")}
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

              {/* Coming soon section temporarily hidden */}
              {/*
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mt-6">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {tCompare("comingSoon")}
                </h3>
              </div>
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
                            {tCompare("soon")}
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
              */}
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