'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useConsent } from './hooks/useConsent';
import ConsentPreferencesPanel from '@/components/CookieConsent/ConsentPreferences';
import { useTranslations } from 'next-intl';
import { ConsentManager } from '@/lib/consentManager';

export default function CookieBanner() {
  const { hasConsent, acceptAll, rejectAll } = useConsent();
  // Initialize with false to prevent hydration mismatch (same on server and client)
  const [consentState, setConsentState] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('cookieConsent.banner');
  const tButtons = useTranslations('cookieConsent.buttons');

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check consent and delay banner to avoid affecting LCP (only on client)
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const updateBanner = () => {
      const consent = ConsentManager.getConsent();
      setShouldShowBanner(!consent);
      setConsentState(!!consent);
    };

    // Initial check (after mount to prevent hydration mismatch)
    updateBanner();

    // Delay banner appearance to not affect LCP and initial render
    // Use requestIdleCallback for better performance, fallback to setTimeout
    // Reduced timeout for faster interaction
    const showBanner = () => {
      setIsReady(true);
    };

    // Wait for LCP and idle time before showing banner
    // This prevents layout shifts during critical rendering
    // Reduced delay: 300ms instead of 800-1000ms for faster user interaction
    if ('requestIdleCallback' in window) {
      requestIdleCallback(showBanner, { timeout: 300 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(showBanner, 300);
    }

    // Listen for consent changes
    window.addEventListener('consentUpdated', updateBanner);

    return () => {
      window.removeEventListener('consentUpdated', updateBanner);
    };
  }, [isMounted]);

  // Sync with useConsent hook (only if already initialized)
  useEffect(() => {
    if (isReady && isMounted) {
      setConsentState(hasConsent);
      setShouldShowBanner(!hasConsent);
    }
  }, [hasConsent, isReady, isMounted]);

  // Don't show banner if consent already exists or no consent needed
  if (consentState || !shouldShowBanner) {
    return null;
  }

  // If not ready yet, show banner but with reduced opacity (buttons still clickable)
  // This allows immediate interaction while preventing layout shift
  if (!isReady) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl opacity-95">
        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Message */}
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t('titleEU')}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                {t('descriptionEU')}
                {' '}
                <Link
                  href="/cookie-policy"
                  className="text-primary dark:text-white underline hover:text-button-hover dark:hover:text-[#00A8CD] transition-colors font-medium"
                >
                  {t('cookiePolicy')}
                </Link>
              </p>
            </div>

            {/* Buttons - Clickable immediately */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {/* Reject All - Always shown for all users */}
              <button
                onClick={rejectAll}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-500 hover:border-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:border-red-500 dark:hover:text-white transition-colors font-medium text-sm md:text-base"
              >
                {tButtons('rejectAll')}
              </button>

              {/* Preferences Button - Opens panel where user can manage Do Not Sell toggle */}
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm md:text-base"
              >
                {tButtons('preferences')}
              </button>

              {/* Accept All */}
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-button-primary border-2 border-button-primary text-white rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-sm md:text-base"
              >
                {tButtons('acceptAll')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl animate-slideUp">
        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Message */}
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t('titleEU')}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                {t('descriptionEU')}
                {' '}
                <Link
                  href="/cookie-policy"
                  className="text-primary dark:text-white underline hover:text-button-hover dark:hover:text-[#00A8CD] transition-colors font-medium"
                >
                  {t('cookiePolicy')}
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {/* Reject All - Always shown for all users */}
              <button
                onClick={rejectAll}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-500 hover:border-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:border-red-500 dark:hover:text-white transition-colors font-medium text-sm md:text-base"
              >
                {tButtons('rejectAll')}
              </button>

              {/* Preferences Button - Opens panel where user can manage Do Not Sell toggle */}
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm md:text-base"
              >
                {tButtons('preferences')}
              </button>

              {/* Accept All */}
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-button-primary border-2 border-button-primary text-white rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-sm md:text-base"
              >
                {tButtons('acceptAll')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Panel */}
      {showPreferences && (
        <ConsentPreferencesPanel
          onClose={() => setShowPreferences(false)}
        />
      )}
    </>
  );
}
