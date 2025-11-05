"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Dynamic import for AnimatedBeamMultipleOutputs
const AnimatedBeamMultipleOutputs = dynamic(() => import("@/components/AnimatedBeamMultipleOutputs").then(mod => ({ default: mod.AnimatedBeamMultipleOutputs })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl animate-pulse" />
  ),
});

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

// Wrapper for LazyAnimatedBeam without background (for use inside container with buttons)
function LazyAnimatedBeamWrapper({
  facebookConnected,
  instagramConnected,
  linkedinConnected,
  twitterConnected,
  tiktokConnected,
}: {
  facebookConnected: boolean;
  instagramConnected: boolean;
  linkedinConnected: boolean;
  twitterConnected: boolean;
  tiktokConnected: boolean;
}) {
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
      { rootMargin: "300px" }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  if (!isVisible) {
    return (
      <div
        ref={setRef}
        className="flex items-center justify-center w-full h-full"
      >
        <div className="w-full h-[500px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <AnimatedBeamMultipleOutputs 
        facebookConnected={facebookConnected}
        instagramConnected={instagramConnected}
        linkedinConnected={linkedinConnected}
        twitterConnected={twitterConnected}
        tiktokConnected={tiktokConnected}
      />
    </div>
  );
}

export default function SocialMediaManagement() {
  const t = useTranslations("socialMediaManagement");
  const faqT = useTranslations("socialMediaManagement.sections.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default
  const [facebookStatus, setFacebookStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected'); // Facebook connection status
  const [instagramStatus, setInstagramStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected'); // Instagram connection status
  const [linkedinStatus, setLinkedinStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected'); // LinkedIn connection status - Auto-connected by default
  const [twitterStatus, setTwitterStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected'); // Twitter/X connection status
  const [tiktokStatus, setTiktokStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected'); // TikTok connection status - Auto-connected by default
  const facebookTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const instagramTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const linkedinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const twitterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tiktokTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (facebookTimeoutRef.current) {
        clearTimeout(facebookTimeoutRef.current);
      }
      if (instagramTimeoutRef.current) {
        clearTimeout(instagramTimeoutRef.current);
      }
      if (linkedinTimeoutRef.current) {
        clearTimeout(linkedinTimeoutRef.current);
      }
      if (twitterTimeoutRef.current) {
        clearTimeout(twitterTimeoutRef.current);
      }
      if (tiktokTimeoutRef.current) {
        clearTimeout(tiktokTimeoutRef.current);
      }
    };
  }, []);

  // Handle Facebook button click - toggle between connected and disconnected
  const handleFacebookClick = () => {
    // Clear any existing timeout first
    if (facebookTimeoutRef.current) {
      clearTimeout(facebookTimeoutRef.current);
      facebookTimeoutRef.current = null;
    }

    if (facebookStatus === 'connected') {
      // Start disconnecting - show connecting animation first
      setFacebookStatus('connecting');
      // After 1.5 seconds, mark as disconnected
      facebookTimeoutRef.current = setTimeout(() => {
        setFacebookStatus('disconnected');
        facebookTimeoutRef.current = null;
      }, 1500);
    } else if (facebookStatus === 'disconnected') {
      // Start connecting - show connecting animation
      setFacebookStatus('connecting');
      // After 1.5 seconds, mark as connected
      facebookTimeoutRef.current = setTimeout(() => {
        setFacebookStatus('connected');
        facebookTimeoutRef.current = null;
      }, 1500);
    }
    // If connecting, do nothing (button is disabled during connection)
  };

  // Handle Instagram button click - toggle between connected and disconnected
  const handleInstagramClick = () => {
    // Clear any existing timeout first
    if (instagramTimeoutRef.current) {
      clearTimeout(instagramTimeoutRef.current);
      instagramTimeoutRef.current = null;
    }

    if (instagramStatus === 'connected') {
      // Start disconnecting - show connecting animation first
      setInstagramStatus('connecting');
      // After 1.5 seconds, mark as disconnected
      instagramTimeoutRef.current = setTimeout(() => {
        setInstagramStatus('disconnected');
        instagramTimeoutRef.current = null;
      }, 1500);
    } else if (instagramStatus === 'disconnected') {
      // Start connecting - show connecting animation
      setInstagramStatus('connecting');
      // After 1.5 seconds, mark as connected
      instagramTimeoutRef.current = setTimeout(() => {
        setInstagramStatus('connected');
        instagramTimeoutRef.current = null;
      }, 1500);
    }
    // If connecting, do nothing (button is disabled during connection)
  };

  // Handle LinkedIn button click - toggle between connected and disconnected
  const handleLinkedinClick = () => {
    if (linkedinTimeoutRef.current) {
      clearTimeout(linkedinTimeoutRef.current);
      linkedinTimeoutRef.current = null;
    }

    if (linkedinStatus === 'connected') {
      setLinkedinStatus('connecting');
      linkedinTimeoutRef.current = setTimeout(() => {
        setLinkedinStatus('disconnected');
        linkedinTimeoutRef.current = null;
      }, 1500);
    } else if (linkedinStatus === 'disconnected') {
      setLinkedinStatus('connecting');
      linkedinTimeoutRef.current = setTimeout(() => {
        setLinkedinStatus('connected');
        linkedinTimeoutRef.current = null;
      }, 1500);
    }
  };

  // Handle Twitter/X button click - toggle between connected and disconnected
  const handleTwitterClick = () => {
    if (twitterTimeoutRef.current) {
      clearTimeout(twitterTimeoutRef.current);
      twitterTimeoutRef.current = null;
    }

    if (twitterStatus === 'connected') {
      setTwitterStatus('connecting');
      twitterTimeoutRef.current = setTimeout(() => {
        setTwitterStatus('disconnected');
        twitterTimeoutRef.current = null;
      }, 1500);
    } else if (twitterStatus === 'disconnected') {
      setTwitterStatus('connecting');
      twitterTimeoutRef.current = setTimeout(() => {
        setTwitterStatus('connected');
        twitterTimeoutRef.current = null;
      }, 1500);
    }
  };

  // Handle TikTok button click - toggle between connected and disconnected
  const handleTiktokClick = () => {
    if (tiktokTimeoutRef.current) {
      clearTimeout(tiktokTimeoutRef.current);
      tiktokTimeoutRef.current = null;
    }

    if (tiktokStatus === 'connected') {
      setTiktokStatus('connecting');
      tiktokTimeoutRef.current = setTimeout(() => {
        setTiktokStatus('disconnected');
        tiktokTimeoutRef.current = null;
      }, 1500);
    } else if (tiktokStatus === 'disconnected') {
      setTiktokStatus('connecting');
      tiktokTimeoutRef.current = setTimeout(() => {
        setTiktokStatus('connected');
        tiktokTimeoutRef.current = null;
      }, 1500);
    }
  };
  
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

      {/* Integration Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col gap-12">
            {/* Top Content */}
            <div className="space-y-6 text-center max-w-4xl mx-auto">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Fast Integration
              </h2>

              {/* Description */}
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-base md:text-lg leading-relaxed">
                  Connect Flowxtra to your existing tools and platforms seamlessly. Our platform integrates with everything you need.
                </p>
              </div>
            </div>

            {/* Bottom - Animated Beam Diagram with Buttons inside - Full Width */}
            {/* Lazy load AnimatedBeam only when section is in viewport */}
            <div className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden pb-8">
              <div className="w-full min-h-[500px]">
                <LazyAnimatedBeamWrapper 
                  facebookConnected={facebookStatus === 'connected'}
                  instagramConnected={instagramStatus === 'connected'}
                  linkedinConnected={linkedinStatus === 'connected'}
                  twitterConnected={twitterStatus === 'connected'}
                  tiktokConnected={tiktokStatus === 'connected'}
                />
              </div>
              
              {/* Interactive Connection Buttons - Inside the network container */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 px-4 flex-wrap">
              {/* LinkedIn Button */}
              <button
                onClick={handleLinkedinClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-all duration-300 font-medium text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={linkedinStatus === 'connecting'}
              >
                {/* LinkedIn Icon - Always visible with natural color */}
                <svg className="w-5 h-5 flex-shrink-0" fill="#0077B5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                
                {/* Red X Icon - Visible when disconnected */}
                {linkedinStatus === 'disconnected' && (
                  <svg className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                
                {/* Loading Spinner - Visible when connecting */}
                {linkedinStatus === 'connecting' && (
                  <svg className="w-5 h-5 text-primary dark:text-secondary flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                
                {/* Checkmark Icon - Only visible when connected */}
                {linkedinStatus === 'connected' && (
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                
                <span>
                  {linkedinStatus === 'connecting' ? 'Connecting...' : linkedinStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </button>

              {/* Facebook Button */}
              <button
                onClick={handleFacebookClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-all duration-300 font-medium text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={facebookStatus === 'connecting'}
              >
                {/* Facebook Icon - Always visible with natural color */}
                <svg className="w-5 h-5 flex-shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                
                {/* Red X Icon - Visible when disconnected */}
                {facebookStatus === 'disconnected' && (
                  <svg className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                
                {/* Loading Spinner - Visible when connecting */}
                {facebookStatus === 'connecting' && (
                  <svg className="w-5 h-5 text-primary dark:text-secondary flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                
                {/* Checkmark Icon - Only visible when connected */}
                {facebookStatus === 'connected' && (
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                
                <span>
                  {facebookStatus === 'connecting' ? 'Connecting...' : facebookStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </button>

              {/* Instagram Button */}
              <button
                onClick={handleInstagramClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-all duration-300 font-medium text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={instagramStatus === 'connecting'}
              >
                {/* Instagram Icon - Always visible */}
                <svg className="w-5 h-5 flex-shrink-0" style={{fill: 'url(#instagram-gradient)'}} viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                
                {/* Red X Icon - Visible when disconnected */}
                {instagramStatus === 'disconnected' && (
                  <svg className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                
                {/* Loading Spinner - Visible when connecting */}
                {instagramStatus === 'connecting' && (
                  <svg className="w-5 h-5 text-primary dark:text-secondary flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                
                {/* Checkmark Icon - Only visible when connected */}
                {instagramStatus === 'connected' && (
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                
                <span>
                  {instagramStatus === 'connecting' ? 'Connecting...' : instagramStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </button>

              {/* Twitter/X Button */}
              <button
                onClick={handleTwitterClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-all duration-300 font-medium text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={twitterStatus === 'connecting'}
              >
                {/* Twitter/X Icon - Always visible with natural color */}
                <svg className="w-5 h-5 flex-shrink-0" fill="#000000" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                
                {/* Red X Icon - Visible when disconnected */}
                {twitterStatus === 'disconnected' && (
                  <svg className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                
                {/* Loading Spinner - Visible when connecting */}
                {twitterStatus === 'connecting' && (
                  <svg className="w-5 h-5 text-primary dark:text-secondary flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                
                {/* Checkmark Icon - Only visible when connected */}
                {twitterStatus === 'connected' && (
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                
                <span>
                  {twitterStatus === 'connecting' ? 'Connecting...' : twitterStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </button>

              {/* TikTok Button */}
              <button
                onClick={handleTiktokClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-all duration-300 font-medium text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={tiktokStatus === 'connecting'}
              >
                {/* TikTok Icon - Always visible with natural color */}
                <svg className="w-5 h-5 flex-shrink-0" fill="#000000" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                
                {/* Red X Icon - Visible when disconnected */}
                {tiktokStatus === 'disconnected' && (
                  <svg className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                
                {/* Loading Spinner - Visible when connecting */}
                {tiktokStatus === 'connecting' && (
                  <svg className="w-5 h-5 text-primary dark:text-secondary flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                
                {/* Checkmark Icon - Only visible when connected */}
                {tiktokStatus === 'connected' && (
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                
                <span>
                  {tiktokStatus === 'connecting' ? 'Connecting...' : tiktokStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </button>
              </div>
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
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section3.features.feature1")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section3.features.feature2")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section4.features.feature1")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section4.features.feature2")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section5.features.feature1")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t("sections.section5.features.feature2")}</span>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <svg className="w-6 h-6 text-[#212b36] dark:text-gray-400 group-hover:text-[#006980] flex-shrink-0 mt-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
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

