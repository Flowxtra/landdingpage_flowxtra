'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const t = useTranslations('blog');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract H1 headings from HTML content and add IDs
  useEffect(() => {
    if (!content) return;

    // Parse HTML content directly to extract H1 headings
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const h1Elements = tempDiv.querySelectorAll('h1');
    const extractedHeadings: Heading[] = [];

    h1Elements.forEach((h1, index) => {
      const text = h1.textContent || '';
      if (text.trim()) {
        // Generate a unique ID based on text
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
        
        extractedHeadings.push({
          id,
          text: text.trim(),
          level: 1,
        });
      }
    });

    setHeadings(extractedHeadings);

    // Wait for DOM to be ready, then add IDs to actual rendered headings
    const timer = setTimeout(() => {
      const contentElement = document.querySelector('.blog-content');
      if (!contentElement) return;

      const renderedH1Elements = contentElement.querySelectorAll('h1');
      renderedH1Elements.forEach((h1, index) => {
        if (index < extractedHeadings.length && !h1.id) {
          h1.id = extractedHeadings[index].id;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Find the current active heading
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveId(headings[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  // Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="px-6 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('tableOfContents') || 'Table of Contents'}
        </h2>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm transition-colors py-1 ${
                activeId === heading.id
                  ? 'text-primary dark:text-secondary font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
