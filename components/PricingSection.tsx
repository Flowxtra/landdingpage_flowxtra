"use client";

import CompareFeatures from "@/components/CompareFeatures";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/lib/currency";

interface PricingSectionProps {
  defaultCompareOpen?: boolean;
}

export default function PricingSection({ defaultCompareOpen = false }: PricingSectionProps) {
  const t = useTranslations("pricing");
  const { formatFromEur } = useCurrency();
  
  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("section.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mx-auto mb-6 max-w-4xl px-4">
            {t("section.subtitle")}
          </p>
          
          {/* Features */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {t("section.noCreditCard")}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-primary dark:text-secondary" viewBox="0 -960 960 960" fill="currentColor">
                <path d="m376-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
              </svg>
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {t("section.cancelAnytime")}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("plans.free")}</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatFromEur(0)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t("plans.monthly")}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-white mb-4">{t("plans.forGrowingBusinesses")}</p>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.jobPostings.5")}</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
              </li>
            </ul>

            <a
              href="https://my.flowxtra.com/registration"
              className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
            >
              {t("plans.getStarted")}
            </a>
          </div>

          {/* Starter Plan */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("plans.starter")}</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatFromEur(30)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t("plans.monthly")}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-white mb-4">{t("plans.forGrowingBusinesses")}</p>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.jobPostings.10")}</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
              </li>
            </ul>

            <a
              href="https://my.flowxtra.com/registration"
              className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
            >
              {t("plans.getStarted")}
            </a>
          </div>

          {/* Basic Plan */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("plans.basic")}</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatFromEur(99)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t("plans.monthly")}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-white mb-4">{t("plans.forGrowingBusinesses")}</p>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.jobPostings.25")}</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
              </li>
            </ul>

            <a
              href="https://my.flowxtra.com/registration"
              className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
            >
              {t("plans.getStarted")}
            </a>
          </div>

          {/* Professional Plan */}
          <div 
            className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-2xl"
            style={{
              backgroundImage: 'url(/img/1bg.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            
            <h3 className="text-xl font-bold text-white mb-6 relative z-10">{t("plans.professional")}</h3>
            
            <div className="mb-6 relative z-10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{formatFromEur(249)}</span>
                <span className="text-sm text-white/80 font-medium">{t("plans.monthly")}</span>
              </div>
            </div>

            <p className="text-sm text-white/90 mb-4 relative z-10">{t("plans.forCustomNeeds")}</p>
            
            <ul className="space-y-3 mb-8 flex-grow relative z-10">
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-white/90 group-hover:text-button-hover transition-colors">{t("features.jobPostings.35")}</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                </svg>
                <span className="text-sm text-white/90 group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
              </li>
            </ul>

            <a
              href="https://my.flowxtra.com/registration"
              className="block text-center bg-white text-primary border-2 border-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium relative z-10"
            >
              {t("plans.getStarted")}
            </a>
          </div>

          {/* Advanced Plan */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("plans.advanced")}</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatFromEur(399)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t("plans.monthly")}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-white mb-4">{t("plans.forGrowingBusinesses")}</p>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.jobPostings.unlimited")}</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer">
                <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
              </li>
            </ul>

            <a
              href="https://my.flowxtra.com/registration"
              className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
            >
              {t("plans.getStarted")}
            </a>
          </div>
        </div>

        {/* Enterprise Plans */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center">
            {t("enterprise.title")}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Premium Plan */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("plans.premium")}</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">{formatFromEur(799)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t("plans.monthly")}</span>
                </div>
              </div>

              <p className="text-base text-gray-600 dark:text-white mb-6">{t("plans.forGrowingBusinesses")}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-base text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.jobPostings.unlimited")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-base text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
                </li>
              </ul>

              <a
                href="https://my.flowxtra.com/registration"
                className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium text-lg"
              >
                {t("plans.getStarted")}
              </a>
            </div>

            {/* Enterprise Plan */}
            <div 
              className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl flex flex-col"
              style={{
                backgroundImage: 'url(/img/2bg.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              
              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">{t("plans.enterprise")}</h3>
              
              <div className="mb-6 relative z-10">
                <div className="text-5xl font-bold text-white">{t("plans.contactUs")}</div>
              </div>

              <p className="text-base text-white/90 mb-6 relative z-10">{t("plans.forCustomNeeds")}</p>
              
              <ul className="space-y-4 mb-8 flex-grow relative z-10">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">{t("features.jobPostings.unlimited")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">{t("features.socialMediaPosts")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">{t("features.databaseMigration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">{t("features.customerSupport")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">{t("features.crmIntegration")}</span>
                </li>
              </ul>

              <a
                href="/contact-us"
                className="block text-center bg-white text-primary border-2 border-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium text-lg relative z-10"
              >
                {t("plans.contactUs")}
              </a>
            </div>
          </div>
        </div>

        {/* Compare Features Accordion */}
        <CompareFeatures defaultOpen={defaultCompareOpen} />
      </div>
    </section>
  );
}

