'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function AffiliateBanner() {
  const t = useTranslations('affiliateBanner');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed
    if (typeof window === 'undefined') return;
    
    const checkBannerVisibility = () => {
      const bannerDismissed = localStorage.getItem('affiliateBannerDismissed');
      const consentData = localStorage.getItem('flowxtra_consent');
      
      // If cookies are cleared (no consent data), show banner again
      if (!consentData) {
        localStorage.removeItem('affiliateBannerDismissed');
        setIsVisible(true);
      } else if (!bannerDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    checkBannerVisibility();

    // Listen for storage events (when cookies/localStorage are cleared in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'flowxtra_consent' && !e.newValue) {
        // Cookies were cleared
        localStorage.removeItem('affiliateBannerDismissed');
        setIsVisible(true);
      } else if (e.key === 'affiliateBannerDismissed') {
        checkBannerVisibility();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Periodic check for localStorage changes (handles same-tab clearing)
    const interval = setInterval(() => {
      const consentData = localStorage.getItem('flowxtra_consent');
      if (!consentData && localStorage.getItem('affiliateBannerDismissed')) {
        // Cookies were cleared, show banner again
        localStorage.removeItem('affiliateBannerDismissed');
        setIsVisible(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('affiliateBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-primary dark:bg-secondary text-white py-2.5 px-4 relative z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 relative">
          <p className="text-sm md:text-base text-center flex-1 md:flex-none">
            <span className="mr-2">🎁</span>
            {t('message').split('€594').map((part, index) => 
              index === 0 ? (
                <span key={index}>
                  {part}
                  <span className="text-lg md:text-xl font-bold text-yellow-400">€594</span>
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
            <span className="hidden md:inline">
              {' '}
              <Link
                href="/affiliate"
                className="underline hover:text-[#00A8CD] transition-colors font-semibold"
              >
                {t('linkText')}
              </Link>
            </span>
          </p>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors absolute right-0 md:relative md:right-auto"
            aria-label={t('closeLabel')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2 md:hidden">
          <Link
            href="/affiliate"
            className="underline hover:text-[#00A8CD] transition-colors font-semibold text-sm"
          >
            {t('linkText')}
          </Link>
        </div>
      </div>
    </div>
  );
}

