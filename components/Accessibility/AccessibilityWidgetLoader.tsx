'use client';

import dynamic from 'next/dynamic';

const AccessibilityWidget = dynamic(() => import('./AccessibilityWidget'), {
  ssr: false, // Client-side only widget
});

export default function AccessibilityWidgetLoader() {
  return <AccessibilityWidget />;
}

