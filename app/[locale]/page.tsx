// Main Homepage
// The Header shows "Features" but it links here to keep the URL as flowxtra.com
"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
// Dynamic imports for non-critical components to reduce initial bundle size
// CodeEditor is heavy (includes Shiki syntax highlighter ~600ms), so load only when needed
const CodeEditor = dynamic(() => import("@/components/ui/code-editor").then(mod => ({ default: mod.CodeEditor })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse" />
  ),
});

const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  loading: () => <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />,
});

const AnimatedBeamMultipleOutputs = dynamic(() => import("@/components/AnimatedBeamMultipleOutputs").then(mod => ({ default: mod.AnimatedBeamMultipleOutputs })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl animate-pulse" />
  ),
});

// Lazy-loaded CodeEditor - only loads when it comes into viewport
// Also lazy loads Code icon to reduce initial bundle size
function LazyCodeEditor({ children, ...props }: { children: string; [key: string]: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [CodeIcon, setCodeIcon] = useState<React.ComponentType<any> | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Lazy load Code icon only when component becomes visible
          import("lucide-react").then(mod => {
            setCodeIcon(() => mod.Code);
          });
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before it comes into view
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  if (!isVisible) {
    return (
      <div
        ref={setRef}
        className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse"
      />
    );
  }

  // Update icon prop if CodeIcon is loaded and no icon provided
  const propsWithIcon = CodeIcon && !props.icon ? { ...props, icon: <CodeIcon /> } : props;

  return <CodeEditor {...propsWithIcon}>{children}</CodeEditor>;
}

// Generic Lazy Section Wrapper - loads component only when in viewport
function LazySection({ Component }: { Component: React.ComponentType }) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Start loading 400px before it comes into view
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  if (!isVisible) {
    return (
      <div
        ref={setRef}
        className="w-full min-h-[400px] bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg"
      />
    );
  }

  return <Component />;
}

// Lazy-loaded AnimatedBeam - only loads when it comes into viewport
function LazyAnimatedBeam() {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Start loading 300px before it comes into view
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  if (!isVisible) {
    return (
      <div
        ref={setRef}
        className="flex items-center justify-center w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden min-h-[500px]"
      >
        <div className="w-full h-[500px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden min-h-[500px]">
      <AnimatedBeamMultipleOutputs />
    </div>
  );
}

// Features Sticky Sections Component
function FeaturesSlider() {
  const t = useTranslations("homepage.featuresSlider.slides");
  const slides = [
    {
      badge: t("slide1.badge"),
      title: t("slide1.title"),
      description: t("slide1.description"),
      buttonText: t("slide1.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Smarter-Candidate-Filtering.png",
      imageAlt: t("slide1.imageAlt"),
      imageOnRight: true,
    },
    {
      badge: t("slide2.badge"),
      title: t("slide2.title"),
      description: t("slide2.description"),
      buttonText: t("slide2.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/candidate-fiter.png",
      imageAlt: t("slide2.imageAlt"),
      imageOnRight: false,
    },
    {
      badge: t("slide3.badge"),
      title: t("slide3.title"),
      description: t("slide3.description"),
      buttonText: t("slide3.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Candidate-Profile.webp",
      imageAlt: t("slide3.imageAlt"),
      imageOnRight: true,
    },
    {
      badge: t("slide4.badge"),
      title: t("slide4.title"),
      description: t("slide4.description"),
      buttonText: t("slide4.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Multiposting-job.webp",
      imageAlt: t("slide4.imageAlt"),
      imageOnRight: false,
    },
    {
      badge: t("slide5.badge"),
      title: t("slide5.title"),
      description: t("slide5.description"),
      buttonText: t("slide5.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/hiring-email-template.webp",
      imageAlt: t("slide5.imageAlt"),
      imageOnRight: true,
    },
    {
      badge: t("slide6.badge"),
      title: t("slide6.title"),
      description: t("slide6.description"),
      buttonText: t("slide6.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Job-board-workflow.gif",
      imageAlt: t("slide6.imageAlt"),
      imageOnRight: false,
    },
    {
      badge: t("slide7.badge"),
      title: t("slide7.title"),
      description: t("slide7.description"),
      buttonText: t("slide7.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/multi-job-post.gif",
      imageAlt: t("slide7.imageAlt"),
      imageOnRight: true,
      showCodeBlock: true,
      // Job widget embed code - displays company jobs on external websites
      codeBlock: `
<!-- Start of Flowxtra.com Job Widget -->
<!--Paste this code into your website -->

<iframe
src="https://dpro.flowxtra.com" 
width="2000"
height="2000"
frameborder="0" 
allowfullscreen>
</iframe>

<!-- End of Flowxtra.com Job Widget -->`,
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
                <div className={`bg-gray-50 dark:bg-gray-800 p-5 md:p-8 lg:p-10 rounded-3xl ${slide.imageOnRight ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <span className="inline-block px-3 py-1.5 bg-[#e6f4f7] dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-sm font-normal mb-3">
                    {slide.badge}
                  </span>
                  
                  <h2 className="text-base md:text-xl lg:text-3xl font-bold text-[#006980] dark:text-[#00A8CD] leading-tight mb-4 lg:mb-[150px]">
                    {slide.title}
                  </h2>
                  
                  {/* Image or Code Block inside content on mobile/tablet only */}
                  <div className="lg:hidden mb-4 w-full flex items-center justify-center">
                    {slide.showCodeBlock ? (
                      <div className="w-full max-w-[310px] flex justify-center">
                        <LazyCodeEditor
                          title={t("slide7.embedCodeTitle")}
                          lang="html"
                          copyButton
                          header
                          dots
                          writing={false}
                          className="w-full h-auto"
                        >
                          {slide.codeBlock}
                        </LazyCodeEditor>
                      </div>
                    ) : (
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={1200}
                        height={900}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                        className="w-full h-auto rounded-xl"
                        unoptimized={slide.image.endsWith('.gif') || slide.image.endsWith('.png')}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </div>
                  
                  <p className="text-xs md:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-2.5">
                    {slide.description}
                  </p>
                  
                  <div className="pt-1">
                    <a
                      href={slide.buttonLink}
                      className="inline-block bg-[#003f4d] text-white px-5 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#00A8CD] transition-colors font-medium text-xs md:text-base"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>

                {/* Image or Code Block - Hidden on mobile/tablet, shown on desktop */}
                <div className={`hidden lg:block ${slide.imageOnRight ? 'order-2' : 'order-2 lg:order-1'}`}>
                  {slide.showCodeBlock ? (
                    <div className="flex items-center justify-center w-full px-2 md:px-0">
                      <LazyCodeEditor
                        title={t("slide7.embedCodeTitle")}
                        lang="html"
                        copyButton
                        header
                        dots
                        writing={false}
                        className="w-full max-w-[360px] md:max-w-lg lg:max-w-2xl h-auto"
                      >
                        {slide.codeBlock}
                      </LazyCodeEditor>
                    </div>
                  ) : (
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={1200}
                      height={900}
                      quality={100}
                      sizes={slide.image.includes('hiring-email-template') ? "(max-width: 1200px) 50vw, 600px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"}
                      className={slide.image.includes('hiring-email-template') ? "w-1/2 h-auto mx-auto" : "w-full h-auto"}
                      unoptimized={slide.image.endsWith('.gif') || slide.image.endsWith('.png')}
                      loading={index === 0 ? "eager" : "lazy"}
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
  const t = useTranslations("homepage");
  const tContact = useTranslations("contact");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Memoize video play handler to prevent re-creating on every render
  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Full Width */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-[#f4f6f8] dark:bg-gray-800">
          <div className="flex flex-col items-center space-y-12 max-w-7xl mx-auto">
            {/* Top Content */}
            <div className="w-full px-4 md:px-8 text-center space-y-6 min-h-[200px]">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mx-auto max-w-5xl px-2">
                {t("hero.title")}
              </h1>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-secondary-light max-w-4xl mx-auto px-2">
                {t("hero.subtitle")}
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-white leading-relaxed max-w-4xl mx-auto px-4">
                {t("hero.description")}
              </p>
              
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-8 py-4 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-lg shadow-lg"
                >
                  {t("hero.cta")}
                </a>
              </div>
            </div>

            {/* Bottom Image - Full Width - LCP Element */}
            <div className="w-full">
              {/* Mobile Image - LCP Element - Only visible on mobile (< 768px) */}
              <figure className="m-0 block md:hidden">
                <Image
                  src="/img/ATS-Software-for-Recruitment2.webp"
                  alt={t("hero.imageAlt")}
                  title={t("hero.imageTitle")}
                  width={750}
                  height={512}
                  quality={75}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 375px) calc(100vw - 40px), (max-width: 640px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 40px), 750px"
                  className="w-full h-auto"
                  decoding="sync"
                  loading="eager"
                />
                <figcaption className="sr-only">
                  {t("hero.figcaption")}
                </figcaption>
              </figure>
              {/* Desktop Image - LCP Element - Only visible on tablet/desktop (>= 768px) */}
              <figure className="m-0 hidden md:block">
                <Image
                  src="/img/ATS-Software-for-Recruitment.webp"
                  alt={t("hero.imageAlt")}
                  title={t("hero.imageTitle")}
                  width={1920}
                  height={1080}
                  quality={100}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1200px) 100vw, 1920px"
                  className="w-full h-auto"
                  decoding="sync"
                  loading="eager"
                />
                <figcaption className="sr-only">
                  {t("hero.figcaption")}
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
            <div className="space-y-6 min-h-[100px]">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-4 py-2 text-primary dark:text-blue-400 rounded-full text-sm font-medium" style={{ backgroundColor: '#d9e9ec' }}>
                  {t("gdpr.badge")}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight whitespace-pre-line">
                {t("gdpr.title")}
              </h2>

              {/* Description */}
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-base md:text-lg leading-relaxed">
                  {t("gdpr.description1")}
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  {t("gdpr.description2")}
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
                  {t("gdpr.faqLink")}
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

            {/* Right Icons - Animated Rows - TEMPORARILY DISABLED */}
            {/* Commented out temporarily - Too many icons causing performance issues */}
            {/* 
            <div className="space-y-8 overflow-hidden">
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-right whitespace-nowrap">
                  <Image src="/img/icon/Frame-2095584493.png" alt="Review us on Trustpilot" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-1984078831-1.png" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/dsvgo-icon.svg" alt="DSGVO Compliant" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-2095584493.png" alt="Review us on Trustpilot" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-1984078831-1.png" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/dsvgo-icon.svg" alt="DSGVO Compliant" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                </div>
              </div>
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-left whitespace-nowrap">
                  <Image src="/img/icon/trust.svg" alt="Trustpilot Reviews" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/at.svg" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/de.svg" alt="Made in Germany" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/trust.svg" alt="Trustpilot Reviews" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/at.svg" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/de.svg" alt="Made in Germany" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                </div>
              </div>
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-right whitespace-nowrap">
                  <Image src="/img/icon/Frame-2095584494.png" alt="eIDAS" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-2095584495.png" alt="Time Saving Features" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-2095584496.png" alt="AI-Powered" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-2095584494.png" alt="eIDAS" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-2095584495.png" alt="Time Saving Features" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-2095584496.png" alt="AI-Powered" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Integration Section - Reversed Layout - Currently Hidden */}
      {false && (
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col gap-12">
            {/* Top Content */}
            <div className="space-y-6 text-center max-w-4xl mx-auto min-h-[150px]">
              {/* Badge */}
              <div className="inline-block">
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Fast Integration
              </h2>

              {/* Description */}
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-base md:text-lg leading-relaxed">
                  Connect Flowxtra to your existing tools and platforms seamlessly. Our platform integrates with everything you need.
                </p>
              </div>
            </div>

            {/* Bottom - Animated Beam Diagram - Full Width */}
            {/* Lazy load AnimatedBeam only when section is in viewport */}
            <LazyAnimatedBeam />
          </div>
        </div>
      </section>
      )}

      {/* Video Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Text Content */}
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("video.title")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t("video.description")}
              </p>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handleVideoPlay}
                >
                  <Image
                    src="/img/overlay-flowxtra.png"
                    alt={t("video.playButton")}
                    fill
                    quality={100}
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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
                  title={t("video.iframeTitle")}
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
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-[#f4f6f8] dark:bg-gray-800">
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
                loading="lazy"
              />
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("whyUseFlowxtra.title")}
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-white leading-relaxed">
                {t("whyUseFlowxtra.description")}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.userFriendly")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.highSecurity")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.integration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.support")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.scalable")}</span>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-2.5 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  {t("whyUseFlowxtra.cta")}
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
                {t("recruitment.title")}
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("recruitment.description")}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.freeJobPosting")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.postManage")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.tracking")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.interviews")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.collaboration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.reports")}</span>
                </li>
              </ul>

              {/* Who Is It For */}
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {t("recruitment.whoIsItFor.title")}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("recruitment.whoIsItFor.description")}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-6 py-2.5 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-base shadow-lg"
                >
                  {t("recruitment.cta")}
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-2 lg:order-2">
              <figure>
                <Image
                  src="/img/job-platform-dashbourd.webp"
                  alt={t("recruitment.imageAlt")}
                  title={t("recruitment.imageTitle")}
                  width={600}
                  height={450}
                  quality={100}
                  unoptimized
                  className="w-full h-auto"
                  loading="lazy"
                />
                <figcaption className="sr-only">
                  {t("recruitment.figcaption")}
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
              {t("freeJobPosting.title")}
            </h1>
            
            <div className="space-y-3">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("freeJobPosting.description1")}
              </p>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("freeJobPosting.description2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Slider Section - Lazy loaded when in viewport */}
      <div className="w-full pb-32 md:pb-48">
        <LazySection Component={FeaturesSlider} />
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Social Media Manager Section - White Background */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/img/social-media-management.webp"
                alt={t("socialMediaManager.imageAlt")}
                title={t("socialMediaManager.imageTitle")}
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
                {t("socialMediaManager.title")}
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-white leading-relaxed">
                {t("socialMediaManager.description")}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.connectManage")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.schedule")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.collaboration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.analytics")}</span>
                </li>
              </ul>

              {/* Who Is It For Section */}
              <div className="pt-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t("socialMediaManager.whoIsItFor.title")}
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-white leading-relaxed">
                  {t("socialMediaManager.whoIsItFor.description")}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-8 py-4 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-lg shadow-lg"
                >
                  {t("socialMediaManager.cta")}
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Job Posting Section - White Background */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Content */}
            <div className="order-1 lg:order-1 space-y-8">
              <div className="inline-block bg-[#e6f4f7] dark:bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-sm md:text-base font-semibold text-primary dark:text-secondary-light">
                  {t("multipleJobPosting.badge")}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("multipleJobPosting.title")}
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-white leading-relaxed">
                {t("multipleJobPosting.description")}
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://my.flowxtra.com/registration"
                  className="inline-block bg-button-primary border-2 border-button-primary text-white px-8 py-4 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-lg shadow-lg"
                >
                  {t("multipleJobPosting.cta")}
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-2 lg:order-2">
              <Image
                src="/img/multiple-job-posting.gif"
                alt={t("multipleJobPosting.imageAlt")}
                title={t("multipleJobPosting.imageTitle")}
                width={1200}
                height={900}
                quality={100}
                className="w-full h-auto"
                unoptimized
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Lazy loaded when in viewport */}
      <LazySection Component={ReviewsSection} />

      {/* FAQ Section - Lazy loaded when in viewport */}
      <LazySection Component={FAQSection} />

      {/* Contact Us Section - Lazy loaded when in viewport */}
      <LazySection Component={ContactUsSection} />
    </div>
  );
}

// Reviews Section Component
function ReviewsSection() {
  const t = useTranslations("homepage.reviews");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const reviews = [
    {
      name: t("reviews.review1.name"),
      title: t("reviews.review1.title"),
      rating: 5,
      text: t("reviews.review1.text"),
      date: t("reviews.review1.date")
    },
    {
      name: t("reviews.review2.name"),
      title: t("reviews.review2.title"),
      rating: 5,
      text: t("reviews.review2.text"),
      date: t("reviews.review2.date")
    },
    {
      name: t("reviews.review3.name"),
      title: t("reviews.review3.title"),
      rating: 5,
      text: t("reviews.review3.text"),
      date: t("reviews.review3.date")
    },
    {
      name: t("reviews.review4.name"),
      title: t("reviews.review4.title"),
      rating: 4,
      text: t("reviews.review4.text"),
      date: t("reviews.review4.date")
    },
    {
      name: t("reviews.review5.name"),
      title: t("reviews.review5.title"),
      rating: 5,
      text: t("reviews.review5.text"),
      date: t("reviews.review5.date")
    }
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = reviews.length - cardsPerView;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [cardsPerView, reviews.length]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="text-yellow-400 text-2xl flex gap-1">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <span className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-semibold">{t("rating")}</span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView + 2)}%)`
            }}
            onMouseEnter={() => setCurrentIndex(currentIndex)}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-button-hover dark:hover:border-button-hover transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <i className="fas fa-quote-right absolute top-5 right-5 text-4xl text-primary/10 dark:text-secondary/10"></i>

                {/* Reviewer Info */}
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.title}
                  </p>
                </div>

                {/* Stars */}
                <div className="text-yellow-400 text-base flex gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 relative z-10">
                  {review.text}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <i className="far fa-calendar"></i>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
          <div className="flex items-center gap-2 text-base md:text-lg text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5 text-primary dark:text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span>{t("helpText")} <a href="/contact-us" className="text-primary dark:text-secondary hover:underline font-semibold">{t("chatLink")}</a></span>
          </div>
        </div>

        {/* FAQ Accordion - No Borders */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center gap-4 py-6 text-left transition-colors hover:text-primary dark:hover:text-secondary group"
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
                <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
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
                              className="text-sm text-primary dark:text-secondary hover:underline flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  // Load reCAPTCHA script - Temporarily Disabled
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://www.google.com/recaptcha/api.js';
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);

  //   // Define callback function globally
  //   (window as any).onRecaptchaSuccess = (token: string) => {
  //     setRecaptchaToken(token);
  //   };

  //   return () => {
  //     document.body.removeChild(script);
  //     delete (window as any).onRecaptchaSuccess;
  //   };
  // }, []);

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
    
    // Temporarily disabled reCAPTCHA verification
    // if (!recaptchaToken) {
    //   alert("Please complete the reCAPTCHA verification");
    //   return;
    // }
    
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
      
      // Reset reCAPTCHA
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.reset();
      }
      
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
              <span className="text-sm md:text-base font-semibold text-primary dark:text-secondary-light">
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
                <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-300">
                  {t("form.agreeWith")}{" "}
                  <a href="/privacy-policy" className="text-primary dark:text-secondary hover:underline font-medium">
                    {t("form.privacyPolicy")}
                  </a>{" "}
                  {t("form.and")}{" "}
                  <a href="/terms-conditions" className="text-primary dark:text-secondary hover:underline font-medium">
                    {t("form.termsConditions")}
                  </a>
                  {" "}<span className="text-red-500">*</span>
                </label>
              </div>

              {/* Google reCAPTCHA - Temporarily Hidden */}
              {/* <div>
                <div 
                  className="g-recaptcha" 
                  data-sitekey="6Le9JGEqAAAAAJiw2eq6wmIOxoytM-Gd_fk0xDFz"
                  data-callback="onRecaptchaSuccess"
                />
              </div> */}

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
                  src="/img/ai-powered-recruiting.webp"
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
                  <a href="mailto:sales@flowxtra.com" className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors">
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
                  <a href="tel:+436769054441" className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors">
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

