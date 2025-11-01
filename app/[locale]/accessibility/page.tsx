"use client";

import { useTranslations } from "next-intl";

export default function AccessibilityPage() {
  const t = useTranslations("accessibility");
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
              <svg 
                className="w-8 h-8 text-primary dark:text-secondary" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="currentColor"/>
                <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("introduction.title")}
              </h2>
              <p className="leading-relaxed">
                {t("introduction.paragraph1")}
              </p>
            </section>

            {/* WCAG Standards */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("wcagStandards.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("wcagStandards.paragraph1")}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t("wcagStandards.principles.title")}
                </h3>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <strong>{t("wcagStandards.principles.perceivable.title")}:</strong> {t("wcagStandards.principles.perceivable.description")}
                  </li>
                  <li>
                    <strong>{t("wcagStandards.principles.operable.title")}:</strong> {t("wcagStandards.principles.operable.description")}
                  </li>
                  <li>
                    <strong>{t("wcagStandards.principles.understandable.title")}:</strong> {t("wcagStandards.principles.understandable.description")}
                  </li>
                  <li>
                    <strong>{t("wcagStandards.principles.robust.title")}:</strong> {t("wcagStandards.principles.robust.description")}
                  </li>
                </ul>
              </div>
            </section>

            {/* Accessibility Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("accessibilityFeatures.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t("accessibilityFeatures.keyboardNavigation.title")}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {t("accessibilityFeatures.keyboardNavigation.description")}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t("accessibilityFeatures.screenReaderSupport.title")}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {t("accessibilityFeatures.screenReaderSupport.description")}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t("accessibilityFeatures.colorContrast.title")}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {t("accessibilityFeatures.colorContrast.description")}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t("accessibilityFeatures.responsiveDesign.title")}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {t("accessibilityFeatures.responsiveDesign.description")}
                  </p>
                </div>
              </div>
            </section>

            {/* Known Issues */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("knownIssues.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("knownIssues.paragraph1")}
              </p>
              <p className="leading-relaxed">
                {t("knownIssues.paragraph2")}
              </p>
            </section>

            {/* Feedback */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("feedback.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                {t("feedback.paragraph1")}
              </p>
              <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6 border border-primary/20 dark:border-primary/30">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary dark:text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900 dark:text-white">{t("feedback.emailLabel")}:</strong>
                      <a href="mailto:Office@flowxtra.com" className="text-primary dark:text-secondary hover:underline ml-2">
                        Office@flowxtra.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary dark:text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900 dark:text-white">{t("feedback.addressLabel")}:</strong>
                      <span className="ml-2">{t("feedback.addressValue")}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("updates.title")}
              </h2>
              <p className="leading-relaxed">
                {t("updates.paragraph1", { date: "January 2025" })}
              </p>
            </section>

            {/* Conformance */}
            <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("conformance.title")}
              </h2>
              <p className="leading-relaxed mb-4">
                The{' '}
                <a 
                  href="https://www.w3.org/WAI/WCAG21/quickref/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary dark:text-secondary hover:underline"
                >
                  Web Content Accessibility Guidelines (WCAG)
                </a>
                {' '}defines requirements for designers and developers to improve accessibility for people with disabilities.
              </p>
              <p className="leading-relaxed">
                Flowxtra website aims to conform to <strong>WCAG 2.1 Level AA</strong> standards. We are continuously working to improve our website&apos;s accessibility and welcome feedback from users.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

