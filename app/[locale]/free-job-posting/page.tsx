"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function FreeJobPosting() {
  const t = useTranslations("freeJobPosting");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Same background as Social Media Management first section */}
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
                    src="/img/candidate-fiter.png"
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

      <div className="container mx-auto px-4 md:px-8 lg:px-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secondary transition-colors"
              >
                <div className="w-12 h-12 bg-primary dark:bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
                      src="/img/Smarter-Candidate-Filtering.svg"
                      alt={t("candidateFiltering.imageAlt")}
                      title={t("candidateFiltering.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
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
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        <strong>{t("candidateFiltering.features.listView.title")}:</strong> {t("candidateFiltering.features.listView.description")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        <strong>{t("candidateFiltering.features.cardView.title")}:</strong> {t("candidateFiltering.features.cardView.description")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
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
                      src="/img/Candidate-Profile.svg"
                      alt={t("applicantOverview.imageAlt")}
                      title={t("applicantOverview.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                      loading="lazy"
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
                      src="/img/rating_sheets.svg"
                      alt={t("ratingSheets.imageAlt")}
                      title={t("ratingSheets.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                      loading="lazy"
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
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("ratingSheets.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("ratingSheets.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
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
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("emailTemplates.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("emailTemplates.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
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
                      src="/img/hiring-email-template.svg"
                      alt={t("emailTemplates.imageAlt")}
                      title={t("emailTemplates.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                      loading="lazy"
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
                {/* Left Side - Content */}
                <div className="order-1 lg:order-1 space-y-6">
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
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("multiposting.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        {t("multiposting.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary dark:text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">
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

                {/* Right Side - Image */}
                <div className="order-2 lg:order-2">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/Multiposting-job.svg"
                      alt={t("multiposting.imageAlt")}
                      title={t("multiposting.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                      loading="lazy"
                    />
                    <figcaption className="sr-only">
                      {t("multiposting.figcaption")}
                    </figcaption>
                  </figure>
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
                        unoptimized
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
                        unoptimized
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

          {/* Intelligent Talent Overview Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Content */}
                <div className="order-1 lg:order-1 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("talentOverview.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("talentOverview.description")}
                  </p>
                </div>

                {/* Right Side - Image */}
                <div className="order-2 lg:order-2">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/Job-board-workflow.gif"
                      alt={t("talentOverview.imageAlt")}
                      title={t("talentOverview.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                      loading="lazy"
                    />
                    <figcaption className="sr-only">
                      {t("talentOverview.figcaption")}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Hiring Dashboard Section */}
          <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Image */}
                <div className="order-2 lg:order-1">
                  <figure className="rounded-2xl overflow-hidden">
                    <Image
                      src="/img/dashboard.gif"
                      alt={t("hiringDashboard.imageAlt")}
                      title={t("hiringDashboard.imageTitle")}
                      width={800}
                      height={600}
                      quality={100}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                      loading="lazy"
                    />
                    <figcaption className="sr-only">
                      {t("hiringDashboard.figcaption")}
                    </figcaption>
                  </figure>
                </div>

                {/* Right Side - Content */}
                <div className="order-1 lg:order-2 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t("hiringDashboard.title")}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t("hiringDashboard.description")}
                  </p>
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
          backgroundImage: 'url(/img/free_jobs_posting_bg.svg)',
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

// Contact Us Section Component
function ContactUsSection() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    review: "",
    agreeToPrivacy: false,
  });

  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Clean up browser extension injected elements that cause hydration mismatches
  useEffect(() => {
    const cleanupExtensions = () => {
      // Remove LastPass and other password manager injected elements
      const extensionElements = document.querySelectorAll(
        '[data-lastpass-icon-root], [data-1password-root], [data-bitwarden-watching]'
      );
      extensionElements.forEach(el => {
        try {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        } catch (e) {
          // Ignore errors if element was already removed
        }
      });
    };

    // Clean up immediately and after a delay (extensions inject at different times)
    cleanupExtensions();
    const timers = [
      setTimeout(cleanupExtensions, 100),
      setTimeout(cleanupExtensions, 500),
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "review") {
      if (value.length <= maxChars) {
        setFormData({ ...formData, [name]: value });
        setCharCount(value.length);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, agreeToPrivacy: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call (replace with your actual API endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", formData, "reCAPTCHA Token:", recaptchaToken);
      
      // Show success message
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        email: "",
        firstName: "",
        review: "",
        agreeToPrivacy: false,
      });
      setCharCount(0);
      setRecaptchaToken(null);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-block bg-[#e6f4f7] dark:bg-gray-800 px-4 py-2 rounded-lg mb-6">
              <span className="text-sm md:text-base font-semibold text-primary dark:text-white">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {t("title")}
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("description")}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 min-h-[300px]">
              {/* Email and First Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="relative" suppressHydrationWarning>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("form.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary dark:focus:border-secondary focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    placeholder={t("form.emailPlaceholder")}
                    suppressHydrationWarning
                  />
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("form.firstName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary dark:focus:border-secondary focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    placeholder={t("form.firstNamePlaceholder")}
                  />
                </div>
              </div>

              {/* Your Message */}
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("form.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={6}
                  required
                  value={formData.review}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary dark:focus:border-secondary focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none"
                  placeholder={t("form.messagePlaceholder")}
                />
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {charCount} / {maxChars}
                </div>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  checked={formData.agreeToPrivacy}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary dark:focus:ring-secondary"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-white">
                  {t("form.agreeWith")}{" "}
                  <a href="/privacy-policy" className="text-primary dark:text-white dark:underline hover:underline dark:hover:text-[#00A8CD] font-medium">
                    {t("form.privacyPolicy")}
                  </a>{" "}
                  {t("form.and")}{" "}
                  <a href="/terms-of-use" className="text-primary dark:text-white dark:underline hover:underline dark:hover:text-[#00A8CD] font-medium">
                    {t("form.termsConditions")}
                  </a>
                  {" "}<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block bg-button-primary border-2 border-button-primary text-white px-8 py-2.5 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("form.sending") : t("form.sendButton")}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg animate-fadeIn">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                  <p className="font-semibold text-green-700 dark:text-green-400">{t("form.successTitle")}</p>
                  <p className="text-sm text-green-600 dark:text-green-300">{t("form.successMessage")}</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg animate-fadeIn">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                  <p className="font-semibold text-red-700 dark:text-red-400">{t("form.errorTitle")}</p>
                  <p className="text-sm text-red-600 dark:text-red-300">{t("form.errorMessage")}</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Image and Contact Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden">
              <figure>
                <Image
                  src="/img/ai-powered-recruiting.svg"
                  alt={t("imageAlt")}
                  title={t("imageTitle")}
                  width={800}
                  height={600}
                  quality={100}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="sr-only">
                  {t("figcaption")}
                </figcaption>
              </figure>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 min-h-[150px]">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary dark:hover:bg-secondary transition-colors duration-300 group">
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("info.email")}</p>
                  <a href="mailto:sales@flowxtra.com" className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    sales@flowxtra.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary dark:hover:bg-secondary transition-colors duration-300 group">
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("info.phone")}</p>
                  <a href="tel:+436769054441" className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    +43 676 905 4441
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary dark:hover:bg-secondary transition-colors duration-300 group">
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("info.address")}</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {t("info.addressValue")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
