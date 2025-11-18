"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ContactUsSection from "@/components/ContactUsSection";

export default function FreeJobPosting() {
  const t = useTranslations("freeJobPosting");
  const tHomepage = useTranslations("homepage");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Same background as Social Media Management first section */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div 
          className="w-full rounded-[10px] px-[10px] py-12 md:py-16 relative min-h-[500px] md:min-h-[600px]"
          style={{
            backgroundImage: 'url(/img/SocialMediaManagement_backrouand.svg)',
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
                  {t("hero.title")}
                </h1>

                {/* Subtitle */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {t("hero.subtitle")}
                </h2>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed">
                  {t("hero.description")}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-start lg:items-center gap-4 md:gap-6 pt-4">
                  {/* No credit card required - Credit Card Icon */}
                  <div className="flex items-start lg:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5 lg:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed">
                      {t("features.noCreditCard")}
                    </span>
                  </div>

                  {/* Cancel anytime - Clock/Time Icon */}
                  <div className="flex items-start lg:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5 lg:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    src="/img/candidate-fiter.png"
                    alt={t("imageAlt")}
                    title={t("imageTitle")}
                    width={834}
                    height={489}
                    quality={100}
                    className="w-full h-auto rounded-lg"
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

      <div className="container mx-auto px-4 md:px-8 lg:px-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                num: 1
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                ),
                num: 2
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                num: 3
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v9a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM3 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM15 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                ),
                num: 4
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                num: 5
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                num: 6
              }
            ].map(({ icon, num }) => (
              <div
                key={num}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secondary transition-colors"
              >
                <div className="w-12 h-12 bg-primary dark:bg-secondary rounded-lg flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t(`features.feature${num}.title`)}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {t(`features.feature${num}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div className="mb-16 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              {t("howItWorks.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="text-center">
                  <div className="w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {num}
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
                    {t(`howItWorks.step${num}.title`)}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-300">
                    {t(`howItWorks.step${num}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Smarter Candidate Filtering Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/Smarter-Candidate-Filtering.png"
                      alt={t("candidateFiltering.imageAlt")}
                      title={t("candidateFiltering.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                    <figcaption className="sr-only">
                      {t("candidateFiltering.figcaption")}
                    </figcaption>
                  </figure>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("candidateFiltering.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("candidateFiltering.description")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("candidateFiltering.description2")}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        <strong>{t("candidateFiltering.features.listView.title")}:</strong> {t("candidateFiltering.features.listView.description")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        <strong>{t("candidateFiltering.features.cardView.title")}:</strong> {t("candidateFiltering.features.cardView.description")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        <strong>{t("candidateFiltering.features.boardView.title")}:</strong> {t("candidateFiltering.features.boardView.description")}
                      </span>
                    </li>
                  </ul>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {t("candidateFiltering.description3")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("candidateFiltering.description4")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Applicant Overview Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Content */}
                <div className="order-1 lg:order-1 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("applicantOverview.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("applicantOverview.description")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("applicantOverview.description2")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("applicantOverview.description3")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("applicantOverview.description4")}
                  </p>
                </div>

                {/* Right Side - Image */}
                <div className="order-2 lg:order-2">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/Candidate-Profile.webp"
                      alt={t("applicantOverview.imageAlt")}
                      title={t("applicantOverview.imageTitle")}
                      width={800}
                      height={600}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      suppressHydrationWarning
                    />
                    <figcaption className="sr-only">
                      {t("applicantOverview.figcaption")}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* Rating Sheets Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/rating_sheets.webp"
                      alt={t("ratingSheets.imageAlt")}
                      title={t("ratingSheets.imageTitle")}
                      width={800}
                      height={600}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      suppressHydrationWarning
                    />
                    <figcaption className="sr-only">
                      {t("ratingSheets.figcaption")}
                    </figcaption>
                  </figure>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("ratingSheets.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("ratingSheets.description")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("ratingSheets.description2")}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("ratingSheets.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("ratingSheets.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("ratingSheets.features.feature3")}
                      </span>
                    </li>
                  </ul>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {t("ratingSheets.description3")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("ratingSheets.description4")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Email Templates Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Content */}
                <div className="order-1 lg:order-1 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("emailTemplates.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("emailTemplates.description")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("emailTemplates.description2")}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("emailTemplates.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("emailTemplates.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("emailTemplates.features.feature3")}
                      </span>
                    </li>
                  </ul>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {t("emailTemplates.description3")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("emailTemplates.description4")}
                  </p>
                </div>

                {/* Right Side - Image */}
                <div className="order-2 lg:order-2">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/hiring-email-template.webp"
                      alt={t("emailTemplates.imageAlt")}
                      title={t("emailTemplates.imageTitle")}
                      width={800}
                      height={600}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      suppressHydrationWarning
                    />
                    <figcaption className="sr-only">
                      {t("emailTemplates.figcaption")}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* Multiposting Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/Multiposting-job.webp"
                      alt={t("multiposting.imageAlt")}
                      title={t("multiposting.imageTitle")}
                      width={800}
                      height={600}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      suppressHydrationWarning
                    />
                    <figcaption className="sr-only">
                      {t("multiposting.figcaption")}
                    </figcaption>
                  </figure>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("multiposting.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("multiposting.description")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("multiposting.description2")}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("multiposting.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("multiposting.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group cursor-pointer">
                      <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-white">
                        {t("multiposting.features.feature3")}
                      </span>
                    </li>
                  </ul>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {t("multiposting.description3")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("multiposting.description4")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Job Widget Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Content */}
                <div className="order-1 lg:order-1 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("jobWidget.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("jobWidget.description")}
                  </p>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("jobWidget.description2")}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("jobWidget.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("jobWidget.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("jobWidget.features.feature3")}
                      </span>
                    </li>
                  </ul>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                    {t("jobWidget.description3")}
                  </p>
                </div>

                {/* Right Side - Images with Overlay Effect */}
                <div className="order-2 lg:order-2 relative">
                  <div className="relative w-full">
                    {/* First Image - Background */}
                    <figure className="rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src="/img/embed_code1.png"
                        alt={t("jobWidget.imageAlt1")}
                        title={t("jobWidget.imageTitle1")}
                        width={800}
                        height={600}
                        quality={100}
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                      <figcaption className="sr-only">
                        {t("jobWidget.figcaption1")}
                      </figcaption>
                    </figure>
                    
                    {/* Second Image - Overlay on top left */}
                    <figure className="absolute -top-4 -left-4 w-[85%] rounded-2xl overflow-hidden shadow-2xl transform rotate-[-3deg] z-10">
                      <Image
                        src="/img/embed_code2.png"
                        alt={t("jobWidget.imageAlt2")}
                        title={t("jobWidget.imageTitle2")}
                        width={800}
                        height={600}
                        quality={100}
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                      <figcaption className="sr-only">
                        {t("jobWidget.figcaption2")}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* CTA Section - Ready to Hire - Full Width */}
      <section 
        className="w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/img/free_jobs_posting_bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-900 leading-tight">
              {t("ctaSection.title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t("ctaSection.description")}
            </p>
            <div className="pt-4">
              <a
                href="https://my.flowxtra.com/registration"
                className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
              >
                {t("ctaSection.cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Us Section */}
      <ContactUsSection />
    </div>
  );
}

// FAQ Section Component
function FAQSection() {
  const t = useTranslations("homepage.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default

  interface FAQLink {
    text: string;
    url: string;
  }

  interface FAQ {
    question: string;
    answer: string;
    links?: FAQLink[];
  }

  const faqs: FAQ[] = [
    {
      question: t("questions.q1.question"),
      answer: t("questions.q1.answer")
    },
    {
      question: t("questions.q2.question"),
      answer: t("questions.q2.answer")
    },
    {
      question: t("questions.q3.question"),
      answer: t("questions.q3.answer")
    },
    {
      question: t("questions.q4.question"),
      answer: t("questions.q4.answer")
    },
    {
      question: t("questions.q5.question"),
      answer: t("questions.q5.answer")
    },
    {
      question: t("questions.q6.question"),
      answer: t("questions.q6.answer")
    },
    {
      question: t("questions.q7.question"),
      answer: t("questions.q7.answer")
    },
    {
      question: t("questions.q8.question"),
      answer: t("questions.q8.answer")
    },
    {
      question: t("questions.q9.question"),
      answer: t("questions.q9.answer")
    },
    {
      question: t("questions.q10.question"),
      answer: t("questions.q10.answer")
    },
    {
      question: t("questions.q11.question"),
      answer: t("questions.q11.answer"),
      links: t.raw("questions.q11.links") as FAQLink[]
    },
    {
      question: t("questions.q12.question"),
      answer: t("questions.q12.answer")
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="flex items-center gap-2 text-base md:text-lg text-gray-600 dark:text-white">
            <svg className="w-5 h-5 text-primary dark:text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span>{t("helpText")} <a href="/contact-us" className="text-primary dark:text-white dark:underline hover:underline dark:hover:text-[#00A8CD] font-semibold">{t("chatLink")}</a></span>
          </div>
        </div>

        {/* FAQ Accordion - No Borders */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center gap-4 py-6 text-left transition-colors hover:text-primary dark:hover:text-[#00A8CD]-light group"
              >
                <svg
                  className={`w-5 h-5 text-primary dark:text-secondary flex-shrink-0 transition-transform duration-300 dark:group-hover:text-secondary-light ${
                    openIndex === index ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary-light transition-colors">
                  {faq.question}
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[2000px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="pl-9">
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                  {faq.links && faq.links.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t("officialSources")}</p>
                      <ul className="space-y-2">
                        {faq.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="nofollow noopener"
                              className="text-sm text-primary dark:text-white dark:underline hover:underline dark:hover:text-[#00A8CD] flex items-center gap-2"
                            >
                              <svg className="w-4 h-4 text-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

