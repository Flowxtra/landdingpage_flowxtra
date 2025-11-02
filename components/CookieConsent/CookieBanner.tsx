'use client';

import { useState, useEffect } from 'react';
import { useConsent } from './hooks/useConsent';
import ConsentPreferencesPanel from '@/components/CookieConsent/ConsentPreferences';
import { useTranslations } from 'next-intl';
import { ConsentManager } from '@/lib/consentManager';

export default function CookieBanner() {
  const { hasConsent, acceptAll, rejectAll } = useConsent();
  const [consentState, setConsentState] = useState(hasConsent);
  const [showPreferences, setShowPreferences] = useState(false);
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const t = useTranslations('cookieConsent.banner');
  const tButtons = useTranslations('cookieConsent.buttons');

  // Check consent and delay banner to avoid affecting LCP
  useEffect(() => {
    const updateBanner = () => {
      const consent = ConsentManager.getConsent();
      setShouldShowBanner(!consent);
      setConsentState(!!consent);
    };

    // Initial check (synchronous for faster initial render)
    updateBanner();

    // Delay banner appearance to not affect LCP and initial render
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const showBanner = () => {
      setIsReady(true);
    };

    if (typeof window !== 'undefined') {
      // Wait for LCP and idle time before showing banner
      // This prevents layout shifts during critical rendering
      if ('requestIdleCallback' in window) {
        requestIdleCallback(showBanner, { timeout: 1000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(showBanner, 800);
      }
    }

    // Listen for consent changes
    window.addEventListener('consentUpdated', updateBanner);

    return () => {
      window.removeEventListener('consentUpdated', updateBanner);
    };
  }, []);

  // Sync with useConsent hook (only if already initialized)
  useEffect(() => {
    if (isReady) {
      setConsentState(hasConsent);
      setShouldShowBanner(!hasConsent);
    }
  }, [hasConsent, isReady]);

  // Don't show banner if consent already exists, not ready yet, or no consent needed
  if (consentState || !shouldShowBanner) {
    return null;
  }

  // If not ready yet, reserve space to prevent layout shift
  if (!isReady) {
    return (
      <div className="h-[120px] md:h-[100px] pointer-events-none" aria-hidden="true" />
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
                <a 
                  href="/cookie-policy" 
                  className="text-primary dark:text-secondary underline hover:no-underline"
                >
                  {t('cookiePolicy')}
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {/* Reject All - Always shown for all users */}
              <button
                onClick={rejectAll}
                className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium text-sm md:text-base"
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
