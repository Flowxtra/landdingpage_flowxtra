'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getApp, getApps, getImageUrl, type App } from '@/lib/appStoreApi';

function AppDetailContent() {
  const t = useTranslations('appStore');
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.slug as string;
  
  // Get current locale from pathname
  const currentLocale = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/en') ? 'en' : 'en';

  // API State
  const [app, setApp] = useState<App | null>(null);
  const [relatedApps, setRelatedApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch app from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchApp = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await getApp(slug, currentLocale);
        
        if (!isMounted) return;
        
        if (response.success && response.data) {
          setApp(response.data.app);
          setRelatedApps(response.data.relatedApps || []);
        } else {
          setError('App not found');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching app:', err);
        setError(err instanceof Error ? err.message : 'Failed to load app');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchApp();

    // Cleanup
    return () => {
      isMounted = false;
    };
  }, [slug, currentLocale, pathname]);

  // Fetch related apps if not provided
  useEffect(() => {
    if (!app || relatedApps.length > 0) return;
    
    let isMounted = true;
    
    const fetchRelated = async () => {
      try {
        const response = await getApps({
          category: app.categorySlug,
          locale: currentLocale,
          limit: 4,
        });
        
        if (!isMounted) return;
        
        if (response.success && response.data.apps) {
          // Filter out current app
          const filtered = response.data.apps.filter(a => a.id !== app.id).slice(0, 3);
          setRelatedApps(filtered);
        }
      } catch (err) {
        console.error('Error fetching related apps:', err);
      }
    };

    fetchRelated();

    return () => {
      isMounted = false;
    };
  }, [app, currentLocale, relatedApps.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">{error || 'App not found'}</p>
          <Link
            href={`/${currentLocale}/app-store`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary dark:bg-secondary text-white hover:bg-button-hover transition-colors"
          >
            {t('backToAppStore')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-[#f4f6f8] dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Link href="/" className="hover:text-primary dark:hover:text-secondary transition-colors">
                Home
              </Link>
              {' / '}
              <Link href={`/${currentLocale}/app-store`} className="hover:text-primary dark:hover:text-secondary transition-colors">
                App Store
              </Link>
              {' / '}
              <span className="text-gray-700 dark:text-gray-300">{app.name}</span>
            </nav>

            {/* App Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              {/* App Icon */}
              <div className="flex-shrink-0">
                {app.icon ? (
                  <img
                    src={getImageUrl(app.icon)}
                    alt={app.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg bg-white dark:bg-gray-900 p-2 shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23e5e7eb" width="128" height="128"/%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* App Name and Category */}
              <div className="flex-1">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary">
                    {app.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {app.name}
                </h1>
                {app.shortDescription && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                    {app.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://my.flowxtra.com/registration"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-button-primary border-2 border-button-primary text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-center"
              >
                {t('install')}
              </a>
              {app.websiteUrl && (
                <a
                  href={app.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium text-center"
                >
                  {t('visitWebsite')}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-12 md:py-16 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about')}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Features Section */}
            {app.features && app.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('features')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots Section */}
            {app.screenshots && app.screenshots.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('screenshots')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {app.screenshots.map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src={getImageUrl(screenshot)}
                        alt={`${app.name} screenshot ${index + 1}`}
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Apps */}
      {relatedApps.length > 0 && (
        <section className="w-full py-16 md:py-24 px-[10px] bg-[#f4f6f8] dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {t('relatedApps')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedApps.map((relatedApp) => (
                <Link
                  key={relatedApp.id}
                  href={`/${currentLocale}/app-store/${relatedApp.slug}`}
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {relatedApp.icon ? (
                        <img
                          src={getImageUrl(relatedApp.icon)}
                          alt={relatedApp.name}
                          className="w-16 h-16 object-contain rounded-lg bg-gray-50 dark:bg-gray-800 p-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23e5e7eb" width="64" height="64"/%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors mb-1">
                          {relatedApp.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {relatedApp.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {relatedApp.shortDescription || relatedApp.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function AppDetailPage() {
  return <AppDetailContent />;
}
