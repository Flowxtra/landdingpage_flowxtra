'use client';

/**
 * FontAwesomeLoader - No longer needed
 * Font Awesome is now loaded from local custom file (/fonts/fontawesome-custom.min.css) in layout.tsx
 * This component is kept for backward compatibility but does nothing
 * 
 * Note: We use self-hosted custom Font Awesome build to:
 * - Avoid CDN requests (better performance)
 * - Avoid GDPR consent requirements (self-hosted = no third-party cookies)
 * - Reduce unused CSS (custom build contains only 50 used icons - 84.5% size reduction: 96.98 KiB → 15.03 KiB)
 */
export default function FontAwesomeLoader() {
  // Font Awesome is loaded from /fonts/fontawesome-custom.min.css in layout.tsx (custom build)
  // No need to load from CDN anymore
  return null;
}

