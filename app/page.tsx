// Main Homepage
// The Header shows "Features" but it links here to keep the URL as flowxtra.com
"use client";

import Image from "next/image";
import { useState } from "react";

export default function Homepage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Full Width */}
      <section className="w-full py-12 md:py-20">
        <div className="flex flex-col items-center space-y-12">
          {/* Top Content */}
          <div className="w-full px-4 md:px-8 text-center space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mx-auto max-w-5xl px-2">
              ATS Software for Recruitment & Hiring
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-secondary-light max-w-4xl mx-auto px-2">
              All-in-One Platform to Streamline Your Hiring Process
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto px-4">
              Complete ATS software to streamline hiring and manage your team. Start with 10 free job postings per month
            </p>
            
            <div className="pt-4">
              <a
                href="https://my.flowxtra.com/registration"
                className="inline-block bg-button-primary border-2 border-button-primary text-white px-8 py-4 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-lg shadow-lg"
              >
                Start Your Free Plan
              </a>
            </div>
          </div>

          {/* Bottom Image - Full Width */}
          <div className="w-full bg-white dark:bg-gray-900">
            <div className="overflow-hidden">
              <figure>
                {/* Mobile Image */}
                <Image
                  src="/img/ATS-Software-for-Recruitment2.webp"
                  alt="Why Flowxtra Is the Best Free Job Posting Platform"
                  title="Free Job Posting"
                  width={800}
                  height={600}
                  quality={100}
                  priority
                  className="w-full h-auto block md:hidden"
                />
                {/* Desktop Image */}
                <Image
                  src="/img/ATS-Software-for-Recruitment.webp"
                  alt="Why Flowxtra Is the Best Free Job Posting Platform"
                  title="Free Job Posting"
                  width={1920}
                  height={1080}
                  quality={100}
                  priority
                  className="w-full h-auto hidden md:block"
                />
                <figcaption className="sr-only">
                  Control everything from one smart dashboard. Full view of Flowxtra's dashboard to manage and publish free job posts.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* GDPR & Compliance Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-4 py-2 text-primary dark:text-blue-400 rounded-full text-sm font-medium" style={{ backgroundColor: '#d9e9ec' }}>
                  GDPR & DSGVO
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Flowxtra Smarter
Hiring Faster Growth              </h2>

              {/* Description */}
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-base md:text-lg leading-relaxed">
                  Flowxtra streamlines hiring with AI! Create job ads, connect with candidates, and automate tasks like scheduling—making recruitment faster and smarter.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  All data is securely stored in the EU. Transparency. Privacy. Compliance — built in by design.
                </p>
              </div>

              {/* FAQ Link */}
              <div className="pt-4">
                <a
                  href="/faq"
                  className="inline-flex items-center text-primary dark:text-secondary-light hover:text-secondary dark:hover:text-secondary font-medium text-lg group"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Read our full FAQ
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Icons - Animated Rows */}
            <div className="space-y-8 overflow-hidden">
              {/* Row 1 - Move Right (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-right whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame-2095584493.png"
                    alt="Review us on Trustpilot"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078831-1.png"
                    alt="Made in Austria"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584455.png"
                    alt="AI Act Compliant"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584493.png"
                    alt="Review us on Trustpilot"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078831-1.png"
                    alt="Made in Austria"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584455.png"
                    alt="AI Act Compliant"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                </div>
              </div>

              {/* Row 2 - Move Left (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-left whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame-1984078825.png"
                    alt="DSGVO & GDPR Compliant"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078827.png"
                    alt="Customization"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078829.png"
                    alt="User-Friendly"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078825.png"
                    alt="DSGVO & GDPR Compliant"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078827.png"
                    alt="Customization"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078829.png"
                    alt="User-Friendly"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                </div>
              </div>

              {/* Row 3 - Move Right (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-right whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame-2095584494.png"
                    alt="eIDAS"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584495.png"
                    alt="Time Saving Features"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584496.png"
                    alt="AI-Powered"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584494.png"
                    alt="eIDAS"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584495.png"
                    alt="Time Saving Features"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584496.png"
                    alt="AI-Powered"
                    width={100}
                    height={50}
                    className="flex-shrink-0 h-14 w-auto inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Text Content */}
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                ATS Recruitment Software in your hands
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Accelerate your talent acquisition process using our innovative AI recruitment solution.
              </p>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Image
                    src="/img/overlay-flowxtra.png"
                    alt="Play Video"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                    <div className="relative">
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-secondary-light"></div>
                      {/* Play Button */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all">
                        <svg
                          className="w-10 h-10 md:w-12 md:h-12 text-primary ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/CGa2grClFsw?autoplay=1"
                  title="ATS Recruitment Software"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Recruitment Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-950 rounded-2xl p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Recruitment
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-6">
                  Create job post opportunities.
                </p>
              </div>
            </div>

            {/* Social Media Manager Card */}
            <div className="group relative bg-gradient-to-br from-secondary to-secondary-light dark:from-secondary dark:to-[#005770] rounded-2xl p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Social Media Manager
                </h3>
                <p className="text-white/90 text-base md:text-lg mb-6">
                  Manage all your social media accounts comprehensively.
                </p>
              </div>
            </div>

            {/* E-Signature Card */}
            <div className="group relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  E-Signature
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
                  Online contract signing system.
                </p>
              </div>
            </div>

            {/* Employee Onboarding Card - Coming Soon */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-950 rounded-2xl p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Employee Onboarding
                  </h3>
                  <span className="px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
                    Soon
                  </span>
                </div>
                <p className="text-gray-300 text-base md:text-lg">
                  Streamline your employee onboarding process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

