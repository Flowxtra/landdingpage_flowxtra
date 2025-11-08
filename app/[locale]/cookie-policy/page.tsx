'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPolicyByRoute, type Policy } from '@/lib/policiesApi';

export default function CookiePolicyPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith('/de') ? 'de' : 'en';
  
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getPolicyByRoute('cookie-policy', currentLocale);
        
        if (response && response.success) {
          setPolicy(response.data);
        } else {
          setError('Policy not found');
        }
      } catch (err) {
        console.error('Error fetching Cookie Policy:', err);
        setError(err instanceof Error ? err.message : 'Failed to load policy');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [currentLocale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Policy not found'}
          </h1>
          <Link href={`/${currentLocale}`} className="text-primary dark:text-secondary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <section className="w-full pt-2.5 pb-8 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link href={`/${currentLocale}`} className="hover:text-primary dark:hover:text-secondary transition-colors">
              Home
            </Link>
            {' / '}
            <span className="text-gray-700 dark:text-gray-300">{policy.title}</span>
          </nav>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {policy.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Effective: {new Date(policy.effective_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Version: {policy.version}</span>
              </div>
            </div>

            <article 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary dark:prose-a:text-secondary"
              dangerouslySetInnerHTML={{ __html: policy.content || '' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

