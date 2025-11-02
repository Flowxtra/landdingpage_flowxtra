"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-block bg-[#e6f4f7] dark:bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-sm md:text-base font-semibold text-primary dark:text-secondary-light">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {t("title")}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            {t("description")}
          </p>

          {/* Main Content Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t("mission.description")}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                {t("mission.description2")}
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="rounded-2xl overflow-hidden">
              <figure>
                <Image
                  src="/img/ai-powered-recruiting.webp"
                  alt="Flowxtra team working on AI-powered recruitment solutions"
                  title="Flowxtra – Innovative Recruitment Solutions"
                  width={800}
                  height={600}
                  quality={100}
                  unoptimized
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="sr-only">
                  Flowxtra's team dedicated to transforming recruitment with AI technology.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("values.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t("values.innovation.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("values.innovation.description")}
                </p>
              </div>

              {/* Value 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t("values.transparency.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("values.transparency.description")}
                </p>
              </div>

              {/* Value 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t("values.security.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("values.security.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {t("team.title")}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
              {t("team.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

