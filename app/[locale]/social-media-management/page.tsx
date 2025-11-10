"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SocialMediaManagement() {
  const t = useTranslations("socialMediaManagement");
  const faqT = useTranslations("socialMediaManagement.sections.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Same background as homepage first section */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div 
          className="w-full rounded-[10px] px-[10px] py-12 md:py-16 relative min-h-[500px] md:min-h-[600px]"
          style={{
            backgroundImage: 'url(/img/SocialMediaManagement_backrouand.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {t("title")}
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed">
                  {t("description")}
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <a
                    href="https://my.flowxtra.com/registration"
                    className="inline-block bg-white border-2 border-white text-gray-900 px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-colors font-medium text-base shadow-lg"
                  >
                    {t("cta")}
                  </a>
                </div>

                {/* Features List - Responsive Layout */}
                {/* Grid on small/medium screens (mobile, tablet, small laptop), flex row on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-row items-start lg:items-center gap-4 md:gap-6 pt-4">
                  {/* Free - Gift Icon */}
                  <div className="flex items-start lg:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5 lg:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <span className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                      {t("features.freeForever")}
                    </span>
                  </div>

                  {/* No credit card required - Credit Card Icon */}
                  <div className="flex items-start lg:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5 lg:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                      {t("features.noCreditCard")}
                    </span>
                  </div>

                  {/* Cancel anytime */}
                  <div className="flex items-start lg:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5 lg:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                      {t("features.cancelAnytime")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="order-first lg:order-last">
                <figure className="rounded-2xl overflow-hidden">
                  <Image
                    src="/img/social_media__management.webp"
                    alt={t("imageAlt")}
                    title={t("imageTitle")}
                    width={800}
                    height={600}
                    quality={100}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                    priority
                  />
                  <figcaption className="sr-only">
                    {t("figcaption")}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Run your social media like a business */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("sections.section1.title")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("sections.section1.description")}
              </p>
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  {t("sections.section1.cta")}
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/img/social_media_business.svg"
                alt="Run your social media like a business, not a burden"
                width={800}
                height={600}
                quality={100}
                className="w-full h-auto rounded-lg"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Visual Calendar */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("sections.section3.title")}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("sections.section3.paragraph1")}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section3.features.feature1")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section3.features.feature2")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section3.features.feature3")}</span>
                </li>
              </ul>
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  {t("sections.section3.cta")}
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/img/social_media_calendar.svg"
                alt="Plan and Control Every Post from One Visual Calendar"
                width={800}
                height={600}
                quality={100}
                className="w-full h-auto rounded-lg"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - AI Assistant */}
      <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden">
              <Image
                src="/img/ai_assistant_social_media.svg"
                alt="Your AI Assistant for Effortless Content Creation"
                width={800}
                height={600}
                quality={100}
                className="w-full h-auto rounded-lg"
                unoptimized
                priority
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("sections.section4.title")}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("sections.section4.paragraph1")}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section4.features.feature1")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section4.features.feature2")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section4.features.feature3")}</span>
                </li>
              </ul>
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  {t("sections.section4.cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Pipelines */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("sections.section5.title")}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("sections.section5.paragraph1")}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section5.features.feature1")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section5.features.feature2")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section5.features.feature3")}</span>
                </li>
              </ul>
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  {t("sections.section5.cta")}
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/img/social_media_pipelines.svg"
                alt="Create and Share Pipelines — Without Giving Full Access"
                width={800}
                height={600}
                quality={100}
                className="w-full h-auto rounded-lg"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ready to Hire */}
      <section 
        className="w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/img/social_media_bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-900 leading-tight">
              {t("sections.ctaSection.title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t("sections.ctaSection.description")}
            </p>
            <div className="pt-4">
              <a
                href="https://my.flowxtra.com/registration"
                className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
              >
                {t("sections.ctaSection.cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {faqT("title")}
            </h2>
            <div className="flex items-center gap-2 text-base md:text-lg text-gray-600 dark:text-white">
              <svg className="w-5 h-5 text-primary dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{faqT("helpText")} <a href="/contact-us" className="text-primary dark:text-white dark:underline hover:underline font-semibold">{faqT("chatLink")}</a></span>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-0">
            {[1, 2, 3, 4].map((qNum) => {
              const question = faqT(`questions.q${qNum}.question`);
              const answer = faqT(`questions.q${qNum}.answer`);
              const index = qNum - 1;
              
              return (
                <div key={qNum}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center gap-4 py-6 text-left transition-colors hover:text-primary dark:hover:text-[#00A8CD] group"
                  >
                    <svg
                      className={`w-5 h-5 text-primary dark:text-secondary flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#00A8CD] transition-colors">
                      {question}
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-[2000px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="pl-9">
                      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

