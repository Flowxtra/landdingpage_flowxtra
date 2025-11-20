'use client';

import { useEffect } from 'react';

interface BlogPostJsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Blog Post JSON-LD Component
 * Adds JSON-LD structured data to the page head
 */
export default function BlogPostJsonLd({ data }: BlogPostJsonLdProps) {
  useEffect(() => {
    // Remove existing script if present
    const existingScript = document.getElementById('blog-post-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = 'blog-post-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    
    // Add to head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('blog-post-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null; // This component doesn't render anything
}

