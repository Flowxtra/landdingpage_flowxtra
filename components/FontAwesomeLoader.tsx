'use client';

/**
 * FontAwesomeLoader - No longer needed
 * Font Awesome is now loaded from local files (/fonts/fontawesome.min.css) in layout.tsx
 * This component is kept for backward compatibility but does nothing
 * 
 * Note: We use self-hosted Font Awesome to:
 * - Avoid CDN requests (better performance)
 * - Avoid GDPR consent requirements (self-hosted = no third-party cookies)
 * - Reduce unused CSS warnings (we only include what we need)
 */
export default function FontAwesomeLoader() {
  // Font Awesome is loaded from /fonts/fontawesome.min.css in layout.tsx
  // No need to load from CDN anymore
  return null;
}

