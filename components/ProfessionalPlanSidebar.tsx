'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBlogPosts, formatDate, type BlogPost } from '@/lib/blogApi';

export default function ProfessionalPlanSidebar() {
  const t = useTranslations('pricing');
  const tCommon = useTranslations('common');
  const tBlog = useTranslations('blog');
  const pathname = usePathname();
  
  // Get current locale from pathname
  const currentLocale = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/en') ? 'en' : 'en';
  
  // State for latest posts
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);

  // Fetch latest posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await getBlogPosts({
          limit: 6,
          locale: currentLocale,
          minimal: true,
        });
        
        if (response.success && response.data?.posts) {
          setLatestPosts(response.data.posts);
        }
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchLatestPosts();
  }, [currentLocale]);

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div 
        className="px-6 py-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden shadow-2xl"
        style={{
          backgroundImage: 'url(/img/1bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className="text-lg font-semibold text-white mb-4 relative z-10">
          {t('plans.free') || 'Free Plan'}
        </h2>
        
        <div className="space-y-4 relative z-10">
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">€0</span>
              <span className="text-sm text-white/80">{t('plans.monthly')}</span>
            </div>
            <p className="text-sm text-white/90 mt-1">
              {t('plans.forGrowingBusinesses')}
            </p>
          </div>

          {/* Features List */}
          <nav className="space-y-2">
            <div className="text-sm">
              <div className="font-medium mb-2 text-white">{t('features.keyFeatures') || 'Key Features:'}</div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/90">{t('features.jobPostings.unlimited') || 'Unlimited Job postings'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-white/90">{t('features.socialMediaPosts') || 'Social Media Posts'}</span>
                </li>
              </ul>
            </div>
          </nav>

          {/* CTA Button */}
          <Link
            href="https://my.flowxtra.com/registration"
            className="block w-full text-center bg-white border-2 border-white text-primary px-4 py-2 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-colors font-medium text-sm mt-4"
          >
            {tCommon('getStarted') || 'Get Started'}
          </Link>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {tBlog('latestPosts') || 'Latest Posts'}
        </h3>
        
        {loadingPosts ? (
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
        ) : latestPosts.length > 0 ? (
          <ul className="space-y-4">
            {latestPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/${currentLocale}/blog/${post.slug}`}
                  className="block group"
                >
                  <h4 className="text-sm font-medium text-primary dark:text-white group-hover:text-button-hover transition-colors mb-1 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.date)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">No posts available</div>
        )}
      </div>
    </aside>
  );
}

