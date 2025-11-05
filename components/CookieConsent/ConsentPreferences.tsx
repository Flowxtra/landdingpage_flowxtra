'use client';

import { useState, useEffect } from 'react';
import { useConsent } from './hooks/useConsent';
import { ConsentPreferences as ConsentPrefsType } from '@/types/consent';
import { ConsentManager } from '@/lib/consentManager';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

interface ConsentPreferencesProps {
  onClose: () => void;
}

interface CookieService {
  name: string;
  provider: string;
  storage: string;
  retention: string;
  privacyPolicy: string;
}

// Strictly Necessary Cookies (Essential)
const essentialServices: CookieService[] = [
  {
    name: 'auth (Authentication Token)',
    provider: 'Flowxtra',
    storage: 'Europe',
    retention: 'Session (until logout)',
    privacyPolicy: '/privacy-policy',
  },
  {
    name: '__stripe_mid (Stripe)',
    provider: 'Stripe Inc.',
    storage: 'United States / Europe',
    retention: '1 year',
    privacyPolicy: 'https://stripe.com/privacy',
  },
  {
    name: '__stripe_sid (Stripe)',
    provider: 'Stripe Inc.',
    storage: 'United States / Europe',
    retention: '1 day',
    privacyPolicy: 'https://stripe.com/privacy',
  },
  {
    name: 'locale (Language)',
    provider: 'Flowxtra',
    storage: 'Europe',
    retention: '1 year',
    privacyPolicy: '/privacy-policy',
  },
  {
    name: '_icl_visitor_lang_js',
    provider: 'Flowxtra',
    storage: 'Europe',
    retention: '1 day',
    privacyPolicy: '/privacy-policy',
  },
  {
    name: '_GRECAPTCHA (Google)',
    provider: 'Google LLC',
    storage: 'United States',
    retention: '5 months 4 weeks',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'cf_use_ob (Cloudflare)',
    provider: 'Cloudflare Inc.',
    storage: 'Global',
    retention: '1 minute',
    privacyPolicy: 'https://www.cloudflare.com/privacypolicy/',
  },
  {
    name: 'flowxtra_consent (Cookie Banner)',
    provider: 'Flowxtra',
    storage: 'Europe',
    retention: '1 year',
    privacyPolicy: '/privacy-policy',
  },
  {
    name: 'Security (CSRF)',
    provider: 'Flowxtra',
    storage: 'Europe',
    retention: 'Session',
    privacyPolicy: '/privacy-policy',
  },
  {
    name: 'LiteSpeed Cache',
    provider: 'LiteSpeed Technologies',
    storage: 'Server',
    retention: 'Session',
    privacyPolicy: 'https://www.litespeedtech.com/privacy-policy',
  },
];

// Functionality Cookies
const functionalityServices: CookieService[] = [
  {
    name: 'theme (Dark Mode)',
    provider: 'Flowxtra',
    storage: 'Europe',
    retention: '1 year',
    privacyPolicy: '/privacy-policy',
  },
  {
    name: 'Google Sign-In (OAuth)',
    provider: 'Google LLC',
    storage: 'United States',
    retention: 'Until logout or 6 months',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'LinkedIn Sign-In (OAuth)',
    provider: 'LinkedIn Ireland Unlimited Company',
    storage: 'United States / Europe',
    retention: 'Until logout or 1 year',
    privacyPolicy: 'https://www.linkedin.com/legal/privacy-policy',
  },
  {
    name: 'Chatwoot Live Chat',
    provider: 'Chatwoot',
    storage: 'United States',
    retention: '1 year',
    privacyPolicy: 'https://www.chatwoot.com/privacy',
  },
  {
    name: 'YouTube Video Player',
    provider: 'Google LLC',
    storage: 'United States',
    retention: 'Session to 6 months',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Vimeo Video Player',
    provider: 'Vimeo Inc.',
    storage: 'United States',
    retention: '1 year',
    privacyPolicy: 'https://vimeo.com/privacy',
  },
  {
    name: 'Cloudflare CDN',
    provider: 'Cloudflare Inc.',
    storage: 'Global',
    retention: '30 days',
    privacyPolicy: 'https://www.cloudflare.com/privacypolicy/',
  },
  {
    name: 'Font Awesome Icons (via Cloudflare CDN)',
    provider: 'Fonticons Inc. / Cloudflare',
    storage: 'Global',
    retention: '30 days (CDN cache)',
    privacyPolicy: 'https://fontawesome.com/privacy',
  },
];

// Performance Cookies (Analytics)
const performanceServices: CookieService[] = [
  {
    name: 'Google Tag Manager',
    provider: 'Google LLC',
    storage: 'United States',
    retention: 'Session',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Google Analytics (_ga, _gid, _gat)',
    provider: 'Google LLC',
    storage: 'United States / Europe',
    retention: '14 months to 2 years',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Google Analytics Campaign (_gac)',
    provider: 'Google LLC',
    storage: 'United States / Europe',
    retention: '2 months 4 weeks',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Google Analytics Experiments (_gaexp)',
    provider: 'Google LLC',
    storage: 'United States',
    retention: '2 months 2 weeks',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Microsoft Clarity',
    provider: 'Microsoft Corporation',
    storage: 'United States / Europe',
    retention: '12 months',
    privacyPolicy: 'https://privacy.microsoft.com/privacystatement',
  },
];

// Targeting Cookies (Marketing)
const targetingServices: CookieService[] = [
  {
    name: 'Meta Pixel (Facebook) - _fbp, fr, _fbc',
    provider: 'Meta Platforms Ireland Limited',
    storage: 'United States',
    retention: 'Up to 2 years',
    privacyPolicy: 'https://www.facebook.com/privacy/policy/',
  },
  {
    name: 'Google Ads - gclid, _gcl_aw, _gcl_au, NID',
    provider: 'Google LLC',
    storage: 'United States / Europe',
    retention: '14-26 months',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Google DoubleClick - IDE, RUL, test_cookie',
    provider: 'Google LLC',
    storage: 'United States',
    retention: '1 year 3 weeks',
    privacyPolicy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Microsoft Bing Ads - _uetsid, _uetvid, MUID',
    provider: 'Microsoft Corporation',
    storage: 'United States',
    retention: '1 year',
    privacyPolicy: 'https://privacy.microsoft.com/privacystatement',
  },
  {
    name: 'LinkedIn Insight Tag - li_fat_id',
    provider: 'LinkedIn Ireland Unlimited Company',
    storage: 'United States / Europe',
    retention: 'Up to 1 year',
    privacyPolicy: 'https://www.linkedin.com/legal/privacy-policy',
  },
  {
    name: 'TikTok Pixel',
    provider: 'TikTok Technology Limited',
    storage: 'Singapore / United States',
    retention: 'Up to 3 years',
    privacyPolicy: 'https://www.tiktok.com/legal/privacy-policy',
  },
];

export default function ConsentPreferencesPanel({ onClose }: ConsentPreferencesProps) {
  const { preferences: initialPrefs, savePreferences } = useConsent();
  const [preferences, setPreferences] = useState<ConsentPrefsType>(initialPrefs);
  const [openSection, setOpenSection] = useState<string | null>(null); // Track which section is open - closed by default
  const [activeTab, setActiveTab] = useState<'declaration' | 'about'>('declaration'); // Track active tab
  const t = useTranslations('cookieConsent');
  const tAbout = useTranslations('cookieConsent.aboutCookies');
  const tBanner = useTranslations('cookieConsent.banner');
  const locale = useLocale();

  // Get consent ID from localStorage
  const consentData = ConsentManager.getConsent();
  const consentId = consentData?.consentId || 'Not yet generated';

  // Always show all options for all users (better compliance)

  // Load saved preferences from localStorage when modal opens
  useEffect(() => {
    const savedConsent = ConsentManager.getConsent();
    if (savedConsent) {
      setPreferences(savedConsent.preferences);
    } else {
      setPreferences(initialPrefs);
    }
  }, []); // Empty dependency - runs only when component mounts (modal opens)

  const handleToggle = (category: keyof ConsentPrefsType) => {
    if (category === 'essential') return; // Essential is always true
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: ConsentPrefsType = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
    onClose();
  };

  const handleSave = () => {
    savePreferences(preferences);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Intro Text */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
            {tAbout('intro')}{' '}
            {tAbout('seeCookiePolicy')}{' '}
            <Link href={`/${locale}/cookie-policy`} className="text-primary dark:text-white dark:underline">
              {tAbout('cookiePolicy')}
            </Link>
          </p>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('declaration')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'declaration'
                    ? 'text-primary dark:text-white border-b-2 border-primary dark:border-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {t('tabs.cookieDeclaration')}
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'about'
                    ? 'text-primary dark:text-white border-b-2 border-primary dark:border-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {t('tabs.aboutCookies')}
              </button>
            </div>
          </div>

          {/* Tab Content: Cookie Declaration */}
          {activeTab === 'declaration' && (
            <div>
              {/* Strictly Necessary Cookies (Essential) */}
          <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleSection('essential')}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('strictlyNecessary.title')}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${openSection === 'essential' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('strictlyNecessary.description')}
                  </p>
                  
                  {/* Show table when section is open */}
                  {openSection === 'essential' && (
                    <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.name')}</th>
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.provider')}</th>
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.storage')}</th>
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.retention')}</th>
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.privacyPolicy')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {essentialServices.map((service, index) => (
                          <tr 
                            key={index} 
                            className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <td className="p-3 text-gray-900 dark:text-white font-medium">{service.name}</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{service.provider}</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{service.storage}</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{service.retention}</td>
                            <td className="p-3">
                              <a 
                                href={service.privacyPolicy} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary dark:text-white dark:underline inline-flex items-center gap-1"
                              >
                                {t('table.view')}
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 text-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Functionality Cookies */}
          <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleSection('functionality')}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('functionality.title')}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${openSection === 'functionality' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('functionality.description')}
                  </p>
                  
                  {/* Show table when section is open */}
                  {openSection === 'functionality' && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.name')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.provider')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.storage')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.retention')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.privacyPolicy')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {functionalityServices.map((service, index) => (
                            <tr 
                              key={index} 
                              className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="p-3 text-gray-900 dark:text-white font-medium">{service.name}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.provider}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.storage}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.retention}</td>
                              <td className="p-3">
                                <a 
                                  href={service.privacyPolicy} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary dark:text-white dark:underline inline-flex items-center gap-1"
                                >
                                  {t('table.view')}
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handleToggle('functional')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Cookies (Analytics) */}
          <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleSection('performance')}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('performance.title')}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${openSection === 'performance' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('performance.description')}
                  </p>
                  
                  {/* Show table when section is open */}
                  {openSection === 'performance' && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.name')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.provider')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.storage')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.retention')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.privacyPolicy')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {performanceServices.map((service, index) => (
                            <tr 
                              key={index} 
                              className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="p-3 text-gray-900 dark:text-white font-medium">{service.name}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.provider}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.storage}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.retention}</td>
                              <td className="p-3">
                                <a 
                                  href={service.privacyPolicy} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary dark:text-white dark:underline inline-flex items-center gap-1"
                                >
                                  {t('table.view')}
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handleToggle('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Targeting Cookies (Marketing) */}
          <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleSection('targeting')}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('targeting.title')}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${openSection === 'targeting' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {t('targeting.description')}
                  </p>
                  
                  {/* Show table when section is open */}
                  {openSection === 'targeting' && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.name')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.provider')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.storage')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.retention')}</th>
                            <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">{t('table.privacyPolicy')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {targetingServices.map((service, index) => (
                            <tr 
                              key={index} 
                              className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="p-3 text-gray-900 dark:text-white font-medium">{service.name}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.provider}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.storage}</td>
                              <td className="p-3 text-gray-600 dark:text-gray-400">{service.retention}</td>
                              <td className="p-3">
                                <a 
                                  href={service.privacyPolicy} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary dark:text-white dark:underline inline-flex items-center gap-1"
                                >
                                  {t('table.view')}
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handleToggle('marketing')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
            </div>
          )}

          {/* Tab Content: About Cookies */}
          {activeTab === 'about' && (
            <div>
              {/* Description */}
              <div className="mb-6">
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                  {tAbout('description')}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                  {tAbout('changeConsent')}{' '}
                  <Link href={`/${locale}/privacy-policy`} className="text-primary dark:text-white dark:underline">
                    {tAbout('privacyPolicy')}
                  </Link>
                  {' '}{tAbout('page')}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  {tAbout('advertising')}{' '}
                  <a 
                    href="https://business.safety.google/privacy/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary dark:text-white dark:underline"
                  >
                    {tAbout('googlePrivacyPolicy')}
                  </a>
                  .
                </p>
              </div>

              {/* Consent ID Display */}
              {consentId !== 'Not yet generated' && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {tAbout('consentIdLabel')}
                      </p>
                      <code className="block text-xs bg-white dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-mono break-all">
                        {consentId}
                      </code>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(consentId);
                      }}
                      className="flex-shrink-0 p-2 text-primary hover:text-secondary transition-colors"
                      title={t('consentId.copy')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              {t('buttons.cancel')}
            </button>
            <button
              onClick={handleAcceptNecessary}
              className="px-6 py-3 border-2 border-primary dark:border-white text-primary dark:text-white rounded-lg hover:bg-primary hover:text-white transition-all font-medium"
            >
              {t('buttons.acceptNecessary')}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-button-primary border-2 border-button-primary text-white rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium"
            >
              {t('buttons.save')}
            </button>
          </div>

          {/* Developer Credit */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tBanner('developedBy')}{' '}
              <a 
                href="https://dpro.at" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary dark:text-white dark:underline"
              >
                {tBanner('dproLink')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
