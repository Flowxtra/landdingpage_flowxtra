import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Force dynamic rendering for not-found page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Lazy load Header and Footer
const Header = dynamic(() => import('@/components/Header'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

export default async function NotFound() {
  // Get locale from request
  const locale = await getLocale();
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-primary dark:text-secondary leading-none">
              404
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('heading')}
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('description')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-button-primary border-2 border-button-primary text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-center"
            >
              {t('backHome')}
            </Link>
            
            <Link
              href="/contact-us"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium text-center"
            >
              {t('contactSupport')}
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t('helpfulLinks')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="text-sm text-primary dark:text-secondary hover:underline"
              >
                Homepage
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-primary dark:text-secondary hover:underline"
              >
                Pricing
              </Link>
              <Link
                href="/app-store"
                className="text-sm text-primary dark:text-secondary hover:underline"
              >
                App Store
              </Link>
              <Link
                href="/blog"
                className="text-sm text-primary dark:text-secondary hover:underline"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

