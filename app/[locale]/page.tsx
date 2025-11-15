// Main Homepage
// The Header shows "Features" but it links here to keep the URL as flowxtra.com
"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
// Dynamic imports for non-critical components to reduce initial bundle size
// CodeEditor is heavy (includes Shiki syntax highlighter ~600ms), so load only when needed
// DISABLED - Code editor slide is hidden
/* const CodeEditor = dynamic(() => import("@/components/ui/code-editor").then(mod => ({ default: mod.CodeEditor })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse" />
  ),
}); */

const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  loading: () => <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />,
});

const ContactUsSection = dynamic(() => import("@/components/ContactUsSection"), {
  loading: () => <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />,
});

// DISABLED - Lazy-loaded CodeEditor - only loads when it comes into viewport
// Also lazy loads Code icon to reduce initial bundle size
/* function LazyCodeEditor({ children, ...props }: { children: string; [key: string]: any }) {
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
} */

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
      { rootMargin: "200px" } // Reduced from 400px to 200px for faster initial load
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
      image: "/img/Smarter-Candidate-Filtering.png", // Using PNG (98 KB) instead of SVG (53.6 MB) for better performance
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
      image: "/img/Candidate-Profile.svg",
      imageAlt: t("slide3.imageAlt"),
      imageOnRight: true,
    },
    {
      badge: t("slide4.badge"),
      title: t("slide4.title"),
      description: t("slide4.description"),
      buttonText: t("slide4.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/Multiposting-job.svg",
      imageAlt: t("slide4.imageAlt"),
      imageOnRight: false,
    },
    {
      badge: t("slide5.badge"),
      title: t("slide5.title"),
      description: t("slide5.description"),
      buttonText: t("slide5.buttonText"),
      buttonLink: "https://my.flowxtra.com/registration",
      image: "/img/hiring-email-template.svg",
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
    // DISABLED - Code editor slide with job widget embed
    /* {
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
    }, */
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
                  <span className="inline-block px-3 py-1.5 bg-[#e6f4f7] dark:bg-gray-700 text-gray-600 dark:text-white rounded-md text-sm font-normal mb-3">
                    {slide.badge}
                  </span>
                  
                  <h2 className="text-base md:text-xl lg:text-3xl font-bold text-[#006980] dark:text-[#00A8CD] leading-tight mb-4 lg:mb-[150px]">
                    {slide.title}
                  </h2>
                  
                  {/* Image inside content on mobile/tablet only */}
                  <div className="lg:hidden mb-4 w-full flex items-center justify-center">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={slide.image.includes('candidate-fiter') ? 834 : slide.image.includes('Job-board-workflow') ? 1920 : 1200}
                      height={slide.image.includes('candidate-fiter') ? 489 : slide.image.includes('Job-board-workflow') ? 1080 : 900}
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="w-full h-auto rounded-xl"
                      unoptimized={slide.image.endsWith('.gif') || slide.image.endsWith('.svg')}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
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

                {/* Image - Hidden on mobile/tablet, shown on desktop */}
                <div className={`hidden lg:block ${slide.imageOnRight ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={slide.image.includes('candidate-fiter') ? 834 : slide.image.includes('Job-board-workflow') ? 1920 : 1200}
                      height={slide.image.includes('candidate-fiter') ? 489 : slide.image.includes('Job-board-workflow') ? 1080 : 900}
                      quality={100}
                      sizes={slide.image.includes('hiring-email-template') ? "(max-width: 1024px) 50vw, 300px" : "(max-width: 1024px) 33vw, 400px"}
                      className={slide.image.includes('hiring-email-template') ? "w-1/2 h-auto mx-auto" : "w-full h-auto"}
                      unoptimized={slide.image.endsWith('.gif') || slide.image.endsWith('.svg')}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "auto"}
                  />
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
  const locale = useLocale();
  const videoId = locale === 'de' ? 'r5sBu2-NOqs' : 'CGa2grClFsw';
  
  // Memoize video play handler to prevent re-creating on every render
  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  // Note: Scroll to top is handled by ClientScripts component
  // No need to duplicate here to avoid conflicts
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Full Width */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] pt-16 md:pt-20 pb-0 bg-[#f4f6f8] dark:bg-gray-800">
          {/* Top Content */}
          <div className="flex flex-col items-center max-w-7xl mx-auto">
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
          </div>

          {/* Mobile Image - LCP Element - Only visible on mobile (< 768px) - Centered */}
          <div className="w-full mt-0 md:hidden flex justify-center">
            <figure className="m-0 flex justify-center">
              <Image
                src="/img/ATS-Software-for-Recruitment2.webp" // Using WebP (15 KB) instead of SVG (518 KB) for better performance
                alt={t("hero.imageAlt")}
                title={t("hero.imageTitle")}
                width={750}
                height={512}
                quality={100}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 372px"
                className="max-w-full h-auto"
                decoding="sync"
                loading="eager"
              />
              <figcaption className="sr-only">
                {t("hero.figcaption")}
              </figcaption>
            </figure>
          </div>

          {/* Desktop Image - LCP Element - Only visible on tablet/desktop (>= 768px) - Full Width Inside Container - Natural Size */}
          <div className="w-full mt-0 hidden md:block overflow-hidden">
            <figure className="m-0 w-full">
              <Image
                src="/img/ATS-Software-for-Recruitment.webp" // Using WebP (70 KB) instead of SVG (4.5 MB) for better performance
                alt={t("hero.imageAlt")}
                title={t("hero.imageTitle")}
                width={1920}
                height={1080}
                quality={100}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
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
      </section>

      {/* GDPR & Compliance Section - Hidden */}
      {false && (
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 min-h-[100px]">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-4 py-2 text-primary dark:text-white rounded-full text-sm font-medium" style={{ backgroundColor: '#d9e9ec' }}>
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
                  className="inline-flex items-center text-primary dark:text-secondary-light hover:text-secondary dark:hover:text-[#00A8CD] font-medium text-lg group"
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

            {/* Right Icons - Animated Rows */}
            <div className="space-y-8 overflow-hidden">
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-right whitespace-nowrap">
                  <Image src="/img/icon/Frame-2095584493.png" alt="Review us on Trustpilot" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-1984078831-1.png" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/dsvgo-icon.svg" alt="DSGVO Compliant" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                  <Image src="/img/icon/Frame-2095584493.png" alt="Review us on Trustpilot" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/Frame-1984078831-1.png" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" loading="lazy" />
                  <Image src="/img/icon/dsvgo-icon.svg" alt="DSGVO Compliant" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                </div>
              </div>
              <div className="overflow-hidden flex">
                <div className="flex gap-3 animate-scroll-left whitespace-nowrap">
                  <Image src="/img/icon/trust.svg" alt="Trustpilot Reviews" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                  <Image src="/img/icon/at.svg" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                  <Image src="/img/icon/de.svg" alt="Made in Germany" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                  <Image src="/img/icon/trust.svg" alt="Trustpilot Reviews" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                  <Image src="/img/icon/at.svg" alt="Made in Austria" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
                  <Image src="/img/icon/de.svg" alt="Made in Germany" width={120} height={60} quality={100} className="flex-shrink-0 h-12 w-auto inline-block" unoptimized loading="lazy" />
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
                    priority={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                    <div className="relative">
                      {/* Pulse Rings - Multiple rings for pulsing effect */}
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-[#00A8CD]"></div>
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-[#00A8CD]" style={{ animationDelay: '0.3s' }}></div>
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-[#00A8CD]" style={{ animationDelay: '0.6s' }}></div>
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-[#00A8CD]" style={{ animationDelay: '0.9s' }}></div>
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-[#00A8CD]" style={{ animationDelay: '1.2s' }}></div>
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full animate-pulse-ring border-4 border-[#00A8CD]" style={{ animationDelay: '1.5s' }}></div>
                      {/* Play Button */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all z-10">
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
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1`}
                  title={t("video.iframeTitle")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
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
                fetchPriority="low"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
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
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.freePosting")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.freeScheduling")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.userFriendly")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.highSecurity")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.integration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("whyUseFlowxtra.features.support")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Social Media Manager Section - White Background (placed above Recruitment) */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/img/social-media-management.svg"
                alt={t("socialMediaManager.imageAlt")}
                title={t("socialMediaManager.imageTitle")}
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
                {t("socialMediaManager.title")}
              </h2>

              <p className="text-base md:text-lg text-gray-600 dark:text-white leading-relaxed">
                {t("socialMediaManager.description")}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.connectManage")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.schedule")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-white">{t("socialMediaManager.features.collaboration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.freeJobPosting")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.postManage")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.tracking")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.interviews")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("recruitment.features.collaboration")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#00A8CD] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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
                  src="/img/job-platform-dashbourd.svg"
                  alt={t("recruitment.imageAlt")}
                  title={t("recruitment.imageTitle")}
                  width={600}
                  height={450}
                  quality={100}
                  className="w-full h-auto"
                  unoptimized
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

      {/* Sticky Slider Section - Load immediately (critical content) */}
      <div className="w-full pb-32 md:pb-48">
        <FeaturesSlider />
      </div>

      {/* Pricing Section - Temporarily hidden for testing */}
      {false && <PricingSection />}

      {/* Social Media Manager Section - White Background */}
      {/* Moved above under Recruitment */}

      {/* Multiple Job Posting Section - White Background */}
      <section className="w-full py-16 md:py-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Content */}
            <div className="order-1 lg:order-1 space-y-8">
              <div className="inline-block bg-[#e6f4f7] dark:bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-sm md:text-base font-semibold text-primary dark:text-white">
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
                loading="lazy"
                fetchPriority="low"
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

  // Auto slide - Only start when component is visible (performance optimization)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let interval: NodeJS.Timeout | null = null;
    
    // Check if element is in viewport
    const checkVisibility = () => {
      const element = document.querySelector('[data-reviews-section]');
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top < window.innerHeight + 200 && // 200px before viewport
        rect.bottom > -200 // 200px after viewport
      );
    };

    // Start auto-slide if visible, otherwise wait
    const startAutoSlide = () => {
      if (checkVisibility() && !interval) {
        interval = setInterval(() => {
          setCurrentIndex((prev) => {
            const maxIndex = reviews.length - cardsPerView;
            return prev >= maxIndex ? 0 : prev + 1;
          });
        }, 5000);
      }
    };

    // Initial check
    startAutoSlide();

    // Check periodically if component becomes visible (only if not already started)
    const visibilityCheck = setInterval(() => {
      if (!interval) {
        startAutoSlide();
      }
    }, 2000); // Check every 2 seconds

    return () => {
      if (interval) clearInterval(interval);
      clearInterval(visibilityCheck);
    };
  }, [cardsPerView, reviews.length]);

  const renderStars = (rating: number) => {
    const stars = [] as React.ReactNode[];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= rating;
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.074 3.3a1 1 0 00.95.69h3.469c.967 0 1.371 1.24.588 1.81l-2.807 2.039a1 1 0 00-.364 1.118l1.073 3.3c.301.922-.755 1.688-1.538 1.118l-2.807-2.039a1 1 0 00-1.175 0l-2.807 2.039c-.783.57-1.84-.196-1.538-1.118l1.073-3.3a1 1 0 00-.364-1.118L2.868 8.727c-.783-.57-.379-1.81.588-1.81h3.469a1 1 0 00.95-.69l1.074-3.3z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors" data-reviews-section>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="text-yellow-500 dark:text-yellow-300 text-2xl flex gap-1">
              {renderStars(5)}
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
                <svg className="absolute top-5 right-5 w-8 h-8 text-primary/10 dark:text-secondary/10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 7h5v10H6V9a2 2 0 011-2zm9 0h5v10h-6V9a2 2 0 011-2z" />
                </svg>

                {/* Reviewer Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.title}
                  </p>
                </div>

                {/* Stars */}
                <div className="text-yellow-500 dark:text-yellow-300 text-base flex gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 relative z-10">
                  {review.text}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
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


