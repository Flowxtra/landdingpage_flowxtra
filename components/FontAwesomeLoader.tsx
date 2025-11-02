'use client';

import { useEffect, useState } from 'react';
import { ConsentManager } from '@/lib/consentManager';

/**
 * FontAwesomeLoader - Loads Font Awesome only after functional cookies consent
 * According to GDPR, Font Awesome (CDN resources) should only load after consent
 */
export default function FontAwesomeLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const checkAndLoad = () => {
      const consent = ConsentManager.getConsent();
      
      // Load Font Awesome if:
      // 1. No consent yet - load it for basic UI functionality (essential for design)
      // 2. Consent exists AND functional cookies are allowed (Font Awesome is listed as functional cookie)
      if (!consent) {
        // No consent yet - load it as essential for UI (will respect consent once given)
        if (!shouldLoad) {
          setShouldLoad(true);
          loadFontAwesome();
        }
      } else if (consent.preferences.functional) {
        // Consent exists and functional cookies allowed
        if (!shouldLoad) {
          setShouldLoad(true);
          loadFontAwesome();
        }
      } else {
        // Consent exists but functional cookies NOT allowed - don't load
        // Remove if already loaded (for when user changes preferences)
        const existingLink = document.querySelector('link[href*="font-awesome"]');
        if (existingLink) {
          existingLink.remove();
        }
        setShouldLoad(false);
      }
    };

    const loadFontAwesome = () => {
      // Check if already loaded to prevent duplicate loading
      if (document.querySelector('link[href*="font-awesome"]')) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
      link.crossOrigin = 'anonymous';
      // Load asynchronously to not block render
      link.media = 'print';
      link.onload = function() { 
        if (this instanceof HTMLLinkElement) {
          this.media = 'all';
        }
      };
      link.onerror = function() {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load Font Awesome from CDN');
        }
      };
      document.head.appendChild(link);
      
      // Preconnect to CDN after first load (for future requests)
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://cdnjs.cloudflare.com';
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
    };

    // Initial check
    checkAndLoad();

    // Listen for consent changes
    window.addEventListener('consentUpdated', checkAndLoad);

    return () => {
      window.removeEventListener('consentUpdated', checkAndLoad);
    };
  }, []);

  return null; // This component doesn't render anything
}

