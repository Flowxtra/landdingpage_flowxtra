// Main Homepage
// The Header shows "Features" but it links here to keep the URL as flowxtra.com
"use client";

import Image from "next/image";
import { useState } from "react";
import { CodeEditor } from "@/components/ui/code-editor";
import { Code } from "lucide-react";
import CompareFeatures from "@/components/CompareFeatures";

// Features Sticky Sections Component
function FeaturesSlider() {
  const slides = [
    {
      badge: "Real Recruiting Results",
      title: "Smarter Candidate Filtering & Visualization",
      description: "Flowxtra's AI‑powered ATS streamlines recruitment. Filter and visualize candidates with list, card or drag‑and‑drop board views, then move top talent through every stage with ease.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Smarter-Candidate-Filtering.png",
      imageAlt: "Visual candidate board – part of free AI recruiting tool",
      imageOnRight: true,
    },
    {
      badge: "Candidate Board Flow",
      title: "Visual Talent Intelligence",
      description: "Compare, filter, and map candidates with Flowxtra's dynamic hiring board. Track applications, gain insights, and make smarter hiring decisions — all from one powerful, interactive view.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/candidate-fiter.png",
      imageAlt: "View candidate CVs inside free AI recruiting system",
      imageOnRight: false,
    },
    {
      badge: "Centralized Applicant Intelligence",
      title: "Candidate Profile View",
      description: "Access resumes, cover letters, LinkedIn profiles, and screening answers in one clean interface. Add notes, assign interviews, send assessments, and rate candidates — all from a unified profile view.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Candidate-Profile.webp",
      imageAlt: "View candidate CVs inside free AI recruiting system",
      imageOnRight: true,
    },
    {
      badge: "One Job Ad. Multiple Platforms.",
      title: "Multiposting Made Simple",
      description: "Post once and publish across top job boards — LinkedIn, Google Jobs, Stepstone & more. Track clicks, views, and applications from everywhere — your website, external platforms, and beyond — all in one smart dashboard.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Multiposting-job.webp",
      imageAlt: "Multiposting Made Simple",
      imageOnRight: false,
    },
    {
      badge: "Automated & Personalized Communication",
      title: "Hiring Email Template",
      description: "Save time with smart email templates tailored to every hiring stage. Send rejections, interview invites, or updates — faster, consistent, and always professional.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/hiring-email-template.webp",
      imageAlt: "Hiring Email Template",
      imageOnRight: true,
    },
    {
      badge: "Visualize Your Entire Recruitment Process at a Glance",
      title: "Smart Hiring Diagram Board",
      description: "Flowxtra's advanced diagram board lets you map candidate relationships, hiring stages, and team feedback in real time. Drag and drop candidates, assign tasks, and collaborate with your team — all in one visual dashboard.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Job-board-workflow.gif",
      imageAlt: "Visual candidate board – part of free AI recruiting tool",
      imageOnRight: false,
    },
    {
      badge: "JOB WIDGET",
      title: "Add Job Listings to Any Website",
      description: "With Flowxtra's Job Widget, you can instantly display your company's open positions on your website — without any technical setup or API integration. Whether you're using WordPress, Wix, Shopify, or any other platform, simply copy the embed code and your job board goes live automatically.",
      buttonText: "Register For Free",
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/multi-job-post.gif",
      imageAlt: "Add Job Listings to Any Website",
      imageOnRight: true,
      showCodeBlock: true,
      // Job widget embed code - displays company jobs on external websites
      codeBlock: `
<!-- Flowxtra Job Widget - Copy and paste this code into your website -->

<iframe
src="https://dpro.flowxtra.com" 
width="2000"
height="2000"
frameborder="0" 
allowfullscreen>
</iframe>

<!-- End of Flowxtra Job Widget -->`,
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-900">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className="relative"
          style={{ 
            height: index === slides.length - 1 ? '100vh' : '200vh',
            marginBottom: index === slides.length - 1 ? '0' : '-100vh'
          }}
        >
          <div 
            className="sticky top-0 min-h-screen w-full flex items-start justify-center bg-white dark:bg-gray-900 py-20 md:py-24"
            style={{ 
              zIndex: index + 1,
            }}
          >
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
              <div className={`grid gap-8 lg:gap-12 items-center max-w-7xl mx-auto ${slide.imageOnRight ? 'lg:grid-cols-[33%_67%]' : 'lg:grid-cols-[67%_33%]'}`}>
                {/* Content */}
                <div className={`bg-gray-50 dark:bg-gray-800 p-8 md:p-10 rounded-3xl ${slide.imageOnRight ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <span className="inline-block px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-sm font-normal mb-4">
                    {slide.badge}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#006980] dark:text-[#00A8CD] leading-tight mb-[150px]">
                    {slide.title}
                  </h2>
                  
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-3.5">
                    {slide.description}
                  </p>
                  
                  <div className="pt-2">
                    <a
                      href={slide.buttonLink}
                      className="inline-block bg-[#003f4d] text-white px-8 py-3 rounded-lg hover:bg-[#00A8CD] transition-colors font-medium text-base"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>

                {/* Image or Code Block */}
                <div className={`${slide.imageOnRight ? 'order-2' : 'order-2 lg:order-1'}`}>
                  {slide.showCodeBlock ? (
                    <div className="flex items-center justify-center w-full">
                      <CodeEditor
                        title="Embed Code"
                        icon={<Code />}
                        lang="html"
                        copyButton
                        header
                        dots
                        writing={false}
                        className="w-full max-w-2xl h-auto"
                      >
                        {slide.codeBlock}
                      </CodeEditor>
                    </div>
                  ) : (
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={1200}
                      height={900}
                      quality={100}
                      className={slide.image.includes('hiring-email-template') ? "w-1/2 h-auto mx-auto" : "w-full h-auto"}
                      unoptimized={slide.image.endsWith('.gif') || slide.image.endsWith('.png')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Homepage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Full Width */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20" style={{ backgroundColor: '#f4f6f8' }}>
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
            <div className="w-full">
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
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078831-1.png"
                    alt="Made in Austria"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/dsvgo-icon.svg"
                    alt="DSGVO Compliant"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584493.png"
                    alt="Review us on Trustpilot"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-1984078831-1.png"
                    alt="Made in Austria"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/dsvgo-icon.svg"
                    alt="DSGVO Compliant"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                </div>
              </div>

              {/* Row 2 - Move Left (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-left whitespace-nowrap">
                  <Image
                    src="/img/icon/trust.svg"
                    alt="Trustpilot Reviews"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/at.svg"
                    alt="Made in Austria"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/de.svg"
                    alt="Made in Germany"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/trust.svg"
                    alt="Trustpilot Reviews"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/at.svg"
                    alt="Made in Austria"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/de.svg"
                    alt="Made in Germany"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                </div>
              </div>

              {/* Row 3 - Move Right (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-right whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame-2095584494.png"
                    alt="eIDAS"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584495.png"
                    alt="Time Saving Features"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584496.png"
                    alt="AI-Powered"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584494.png"
                    alt="eIDAS"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584495.png"
                    alt="Time Saving Features"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame-2095584496.png"
                    alt="AI-Powered"
                    width={120}
                    height={60}
                    quality={100}
                    className="flex-shrink-0 h-12 w-auto inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
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
                    quality={100}
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
                          className="w-10 h-10 md:w-12 md:h-12 text-primary dark:text-primary ml-1"
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

      {/* Why Use Flowxtra Section */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20" style={{ backgroundColor: '#f4f6f8' }}>
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/img/multi-job-post.gif"
                alt="Flowxtra Multi Job Post"
                width={1200}
                height={900}
                quality={100}
                className="w-full h-auto"
                unoptimized
              />
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Why Use Flowxtra?
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                At Flowxtra, we'll help you manage your entire business, from creating job applications, managing your social media accounts, and signing your contracts online.
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">User-friendly interface.</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">High security.</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Integration between applications.</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Continuous support service.</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Scalable for all business sizes — from startups to enterprises</span>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-2.5 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  Discover Flowxtra
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Why Use Flowxtra Section 2 - White Background */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Content */}
            <div className="order-1 lg:order-1 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Recruitment
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                The Recruitment App helps companies and HR teams streamline the hiring process—from posting job ads to hiring the right talent.
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Free Job Posting With Flowxtra</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Post and manage job openings easily</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Centralized applicant tracking with smart filters</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Integrated online interviews</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Team collaboration for candidate evaluation</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">Reports & analytics to optimize hiring</span>
                </li>
              </ul>

              {/* Who Is It For */}
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Who Is It For?
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Startups, enterprises, and recruitment agencies that want to hire faster, smarter, and more efficiently.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-2.5 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  Start Now
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-2 lg:order-2">
              <figure>
                <Image
                  src="/img/job-platform-dashbourd.webp"
                  alt="Flowxtra Free job posting dashboard"
                  title="Free Job Posting Dashboard"
                  width={600}
                  height={450}
                  quality={100}
                  unoptimized
                  className="w-full h-auto"
                />
                <figcaption className="sr-only">
                  Control everything from one smart dashboard. Full view of Flowxtra's dashboard to manage and publish free job posts.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Free Job Posting Section */}
      <section className="w-full pt-12 md:pt-16 pb-3 md:pb-4 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Free Job Posting for Smart Hiring
            </h1>
            
            <div className="space-y-3">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Post up to 10 job ads for free every month — no hidden fees, no credit card required.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Flowxtra helps you publish jobs across LinkedIn, Google Jobs & more — all from one powerful dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Slider Section */}
      <div className="w-full">
        <FeaturesSlider />
      </div>

      {/* Pricing Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Plans and Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto mb-6 whitespace-nowrap">
            What you see is exactly what you pay: one simple subscription, no additional charges.</p>
            
            {/* Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  No credit card required
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-primary dark:text-secondary" viewBox="0 -960 960 960" fill="currentColor">
                  <path d="m376-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
                </svg>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Free</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">€0</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ monthly</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-white mb-4">For growing businesses</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">10 job postings</span>
                </li>
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Social Media Posts</span>
                </li>
              </ul>

              <a
                href="https://my.flowxtra.com/registration"
                className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
              >
                Get started
              </a>
            </div>

            {/* Starter Plan */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Starter</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">€30</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ monthly</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-white mb-4">For growing businesses</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">15 job postings</span>
                </li>
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Social Media Posts</span>
                </li>
              </ul>

              <a
                href="https://my.flowxtra.com/registration"
                className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
              >
                Get started
              </a>
            </div>

            {/* Basic Plan */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Basic</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">€99</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ monthly</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-white mb-4">For growing businesses</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">25 job postings</span>
                </li>
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Social Media Posts</span>
                </li>
              </ul>

              <a
                href="https://my.flowxtra.com/registration"
                className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
              >
                Get started
              </a>
            </div>

            {/* Professional Plan */}
            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/overlay_border_shadow.webp')" }}>
              
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Professional</h3>
              
              <div className="mb-6 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">€387</span>
                  <span className="text-sm text-white/80 font-medium">/ monthly</span>
                </div>
              </div>

              <p className="text-sm text-white/90 mb-4 relative z-10">For custom needs</p>
              
              <ul className="space-y-3 mb-8 flex-grow relative z-10">
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90 group-hover:text-button-hover transition-colors">35 job postings</span>
                </li>
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-sm text-white/90 group-hover:text-button-hover transition-colors">Social Media Posts</span>
                </li>
              </ul>

              <a
                href="https://my.flowxtra.com/registration"
                className="block text-center bg-white text-primary px-6 py-3 rounded-lg hover:bg-button-hover hover:text-white transition-all font-medium relative z-10"
              >
                Get started
              </a>
            </div>

            {/* Advanced Plan */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Advanced</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">€581</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ monthly</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-white mb-4">For growing businesses</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Unlimited Job postings</span>
                </li>
                <li className="flex items-start gap-2 group cursor-pointer">
                  <svg className="w-5 h-5 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Social Media Posts</span>
                </li>
              </ul>

              <a
                href="https://my.flowxtra.com/registration"
                className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium"
              >
                Get started
              </a>
            </div>
          </div>

          {/* Enterprise Plans */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center">
              Enterprise Plans
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Premium Plan */}
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Premium</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">€999</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">/ monthly</span>
                  </div>
                </div>

                <p className="text-base text-gray-600 dark:text-white mb-6">For growing businesses</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                    </svg>
                    <span className="text-base text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Unlimited Job postings</span>
                  </li>
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-primary dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                    </svg>
                    <span className="text-base text-gray-600 dark:text-white group-hover:text-button-hover dark:group-hover:text-button-hover transition-colors">Social Media Posts</span>
                  </li>
                </ul>

                <a
                  href="https://my.flowxtra.com/registration"
                  className="block text-center border-2 border-primary text-primary dark:border-white dark:text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium text-lg"
                >
                  Get started
                </a>
              </div>

              {/* Enterprise Plan */}
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col" style={{ backgroundImage: "url('/img/overlay_border_shadow2.webp')" }}>
                
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Enterprise</h3>
                
                <div className="mb-6 relative z-10">
                  <div className="text-5xl font-bold text-white">Contact us</div>
                </div>

                <p className="text-base text-white/90 mb-6 relative z-10">For custom needs</p>
                
                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                    </svg>
                    <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">Unlimited Job postings</span>
                  </li>
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>
                    </svg>
                    <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">Social Media Posts</span>
                  </li>
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">Database migration</span>
                  </li>
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">24/7 customer support</span>
                  </li>
                  <li className="flex items-start gap-3 group cursor-pointer">
                    <svg className="w-6 h-6 text-white group-hover:text-button-hover flex-shrink-0 mt-0.5 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-white/90 group-hover:text-button-hover transition-colors">Integration with your CRM systems</span>
                  </li>
                </ul>

                <a
                  href="/contact-us"
                  className="block text-center bg-white text-primary px-8 py-3 rounded-lg hover:bg-button-hover hover:text-white transition-all font-medium text-lg relative z-10"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>

          {/* Compare Features Accordion */}
          <CompareFeatures />
        </div>
      </section>
    </div>
  );
}

