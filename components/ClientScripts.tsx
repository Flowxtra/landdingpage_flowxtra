"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

// Client-side only components - must be in a Client Component
const CookieScriptLoader = dynamic(() => import("@/components/CookieConsent/CookieScriptLoader"), {
  ssr: false,
});

const CookieBanner = dynamic(() => import("@/components/CookieConsent/CookieBanner"), {
  ssr: false,
});

// Load Font Awesome for icons (used in CompareFeatures, etc.)
const FontAwesomeLoader = dynamic(() => import("@/components/FontAwesomeLoader"), {
  ssr: false,
});

export default function ClientScripts() {
  // Clean up browser extension injected attributes that cause hydration mismatches
  useEffect(() => {
    const cleanupBrowserExtensions = () => {
      // Remove attributes injected by browser extensions (Chrome, Firefox, etc.)
      // These attributes cause hydration mismatches because they're added after React hydration
      const extensionAttributes = [
        '_gchrome_uniqueid',
        'data-lastpass-icon-root',
        'data-1password-root',
        'data-bitwarden-watching',
        'data-dashlane-rid',
        'data-dashlane-rid-input',
        '_gid',
        '__ngDebug',
        '__reactInternalInstance',
        '__reactFiber',
      ];

      // Remove attributes from all elements
      const removeAttributes = () => {
        try {
          const allElements = document.querySelectorAll('*');
          allElements.forEach((el) => {
            extensionAttributes.forEach((attr) => {
              if (el.hasAttribute(attr)) {
                el.removeAttribute(attr);
              }
            });
          });
        } catch (error) {
          // Silently fail - extensions might inject after our cleanup
          if (process.env.NODE_ENV === 'development') {
            console.warn('Extension cleanup warning:', error);
          }
        }
      };

      // Clean up immediately
      removeAttributes();

      // Clean up after React hydration (extensions inject at different times)
      const timers = [
        setTimeout(removeAttributes, 0),
        setTimeout(removeAttributes, 100),
        setTimeout(removeAttributes, 500),
        setTimeout(removeAttributes, 1000),
      ];

      // Use MutationObserver to catch new injections
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const target = mutation.target as Element;
            extensionAttributes.forEach((attr) => {
              if (target.hasAttribute(attr)) {
                target.removeAttribute(attr);
              }
            });
          } else if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                extensionAttributes.forEach((attr) => {
                  if (element.hasAttribute(attr)) {
                    element.removeAttribute(attr);
                  }
                });
                // Also check children
                const children = element.querySelectorAll('*');
                children.forEach((child) => {
                  extensionAttributes.forEach((attr) => {
                    if (child.hasAttribute(attr)) {
                      child.removeAttribute(attr);
                    }
                  });
                });
              }
            });
          }
        });
      });

      // Observe document for attribute and node changes
      observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: extensionAttributes,
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
        observer.disconnect();
      };
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      const cleanup = cleanupBrowserExtensions();
      return cleanup;
    }
  }, []);

  return (
    <>
      {/* Load Font Awesome for icons (used in CompareFeatures, etc.) */}
      <FontAwesomeLoader />
      {/* Load tracking scripts only if consent is given */}
      <CookieScriptLoader />
      {/* Cookie Consent Banner - Shows only if no consent exists */}
      <CookieBanner />
    </>
  );
}

