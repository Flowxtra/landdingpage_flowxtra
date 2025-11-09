import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// This root not-found.tsx handles unmatched URLs at the root level
// It displays a 404 page with Header and Footer
export default async function RootNotFound() {
  // Get English messages as default
  const messages = await getMessages({ locale: 'en' });

  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | Flowxtra</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale="en" messages={messages}>
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
                Oops! Page Not Found
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>

              {/* Action Button */}
              <div className="flex justify-center">
                <Link
                  href="/en"
                  className="bg-button-primary border-2 border-button-primary text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-center"
                >
                  Back to Homepage
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  You might be looking for:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    AI ATS Software
                  </Link>
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    Candidate Filtering
                  </Link>
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    Multiposting Jobs
                  </Link>
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    Job Widget
                  </Link>
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    Free Job Posting
                  </Link>
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    Applicant Tracking System Software
                  </Link>
                  <Link
                    href="https://flowxtra.com"
                    className="text-sm text-primary dark:text-secondary hover:underline"
                  >
                    Social Media Management
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
