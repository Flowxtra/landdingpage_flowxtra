"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import CurrencySwitcher from "@/components/CurrencySwitcher";

// Lazy load heavy components - only load when user opens panels
const ConsentPreferencesPanel = dynamic(() => import("@/components/CookieConsent/ConsentPreferences"), {
  ssr: false,
});

const AccessibilityPanel = dynamic(() => import("@/components/Accessibility/AccessibilityPanel"), {
  ssr: false,
});

export default function Footer() {
  const t = useTranslations("footer");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConsentPreferences, setShowConsentPreferences] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);

  // Initialize dark mode from localStorage or browser preferences
  useEffect(() => {
    const updateDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    // Listen for class changes on html element (when Header toggles dark mode)
    const observer = new MutationObserver(() => {
      updateDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <footer className="w-full pt-8 md:pt-12 pb-[10px] px-[10px] bg-white dark:bg-gray-900 transition-colors">
      <div className="w-full rounded-[10px] px-[10px] pt-8 md:pt-12 pb-[10px] bg-[#f4f6f8] dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Main Footer Content - 5 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-6">
            {/* Company & Software Column */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{t("company.title")}</h3>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.features")}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.pricing")}
                  </Link>
                </li>
                <li>
                  <Link href="/app-store" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.appStore")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.blog")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("company.affiliate")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* ATS Column */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{t("ats.title")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="http://flowxtra.com/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.aiAts")}
                  </Link>
                </li>
                <li>
                  <Link href="http://flowxtra.com/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.candidateFiltering")}
                  </Link>
                </li>
                <li>
                  <Link href="http://flowxtra.com/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.multiposting")}
                  </Link>
                </li>
                <li>
                  <Link href="http://flowxtra.com/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.jobWidget")}
                  </Link>
                </li>
                <li>
                  <Link href="http://flowxtra.com/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.freeJobPosting")}
                  </Link>
                </li>
                <li>
                  <Link href="http://flowxtra.com/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.applicantTracking")}
                  </Link>
                </li>
                <li>
                  <Link href="/social-media-management" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("ats.socialMediaManagement")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Terms Column */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{t("terms.title")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dpa" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("terms.dpa")}
                  </Link>
                </li>
                <li>
                  <Link href="/imprint" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("terms.imprint")}
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("terms.disclaimer")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("terms.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("terms.cookie")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    {t("terms.companies")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div className="lg:col-span-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{t("followUs.title")}</h3>
              
              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <a href="https://www.facebook.com/Fowxtra" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Flowxtra on Facebook" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#00A8CD] dark:hover:bg-[#00A8CD] transition-colors group">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@flowxtra_com" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Flowxtra on YouTube" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#00A8CD] dark:hover:bg-[#00A8CD] transition-colors group">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/flowxtra" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Flowxtra on LinkedIn" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#00A8CD] dark:hover:bg-[#00A8CD] transition-colors group">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="http://x.com/flowxtra_com" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Flowxtra on X (formerly Twitter)" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#00A8CD] dark:hover:bg-[#00A8CD] transition-colors group">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/flowxtra_com/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Flowxtra on Instagram" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#00A8CD] dark:hover:bg-[#00A8CD] transition-colors group">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@flowxtra.ai" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Flowxtra on TikTok" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-[#00A8CD] dark:hover:bg-[#00A8CD] transition-colors group">
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>

              {/* Company Info */}
              <div className="space-y-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
                  </svg>
                  <span>{t("followUs.companyName")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t("followUs.address")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:Office@flowxtra.com" className="hover:text-primary dark:hover:text-[#00A8CD] transition-colors">
                    Office@flowxtra.com
                  </a>
                </div>
              </div>

              {/* reCAPTCHA Disclaimer */}
              <p className="text-xs text-gray-600 dark:text-gray-200">
                {t("followUs.recaptcha.text")}{" "}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="nofollow noopener"
                  className="underline dark:underline hover:text-primary dark:hover:text-[#00A8CD] dark:text-gray-200"
                >
                  {t("followUs.recaptcha.privacy")}
                </a>
                {" "}{t("followUs.recaptcha.and")}{" "}
                <a 
                  href="https://policies.google.com/terms" 
                  target="_blank" 
                  rel="nofollow noopener"
                  className="underline dark:underline hover:text-primary dark:hover:text-[#00A8CD] dark:text-gray-200"
                >
                  {t("followUs.recaptcha.terms")}
                </a>
                {" "}{t("followUs.recaptcha.apply")}
              </p>
            </div>
          </div>

          {/* Compliance Badges Section */}
          <div className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center justify-items-center">
              {/* MADE IN AUSTRIA */}
              <div className="flex items-center justify-center">
                <Image
                  src="/img/icon/footer_icon/made_in_austria.svg"
                  alt={t("badges.madeInAustria")}
                  width={100}
                  height={40}
                  quality={100}
                  className="w-full h-auto max-w-[120px] object-contain"
                  unoptimized
                />
              </div>

              {/* Review us on Trustpilot */}
              <div className="flex items-center justify-center">
                <Image
                  src="/img/icon/footer_icon/trust.svg"
                  alt={t("badges.trustpilot")}
                  width={100}
                  height={40}
                  quality={100}
                  className="w-full h-auto max-w-[120px] object-contain"
                  unoptimized
                />
              </div>

              {/* SERVER LOCATIONS GERMANY */}
              <div className="flex items-center justify-center">
                <Image
                  src="/img/icon/footer_icon/server_location_germany.svg"
                  alt={t("badges.serverLocation")}
                  width={130}
                  height={52}
                  quality={100}
                  className="w-full h-auto max-w-[150px] object-contain"
                  unoptimized
                />
              </div>

              {/* DSGVO & GDPR COMPLIANT */}
              <div className="flex items-center justify-center">
                <Image
                  src="/img/icon/footer_icon/Dsgvo_gdpr_icon.svg"
                  alt={t("badges.gdpr")}
                  width={130}
                  height={52}
                  quality={100}
                  className="w-full h-auto max-w-[150px] object-contain"
                  unoptimized
                />
              </div>

              {/* AI ACT COMPLIANT */}
              <div className="flex items-center justify-center">
                <Image
                  src="/img/icon/footer_icon/ai_act.svg"
                  alt={t("badges.aiAct")}
                  width={130}
                  height={52}
                  quality={100}
                  className="w-full h-auto max-w-[150px] object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-300 dark:border-gray-700 mb-4"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/Main-flowxtra-Logo.png"
                alt={t("logoAlt")}
                width={100}
                height={30}
                quality={100}
                className="h-6 w-auto dark:hidden"
                unoptimized
              />
              <Image
                src="/flowxtra-logo-white.png"
                alt={t("logoAlt")}
                width={100}
                height={30}
                quality={100}
                className="h-6 w-auto hidden dark:block"
                unoptimized
              />
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-600 dark:text-gray-200 text-center">
              {t("copyright.text")}{" "}
              <a 
                href="https://dpro.at/" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="text-primary dark:text-gray-200 dark:underline hover:text-secondary dark:hover:text-[#00A8CD] transition-colors underline decoration-1 underline-offset-2"
              >
                {t("copyright.madeBy")}
              </a>
            </div>

            {/* Consent Preferences, Dark Mode, Accessibility & Currency */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto relative">
              <CurrencySwitcher />
              <button 
                onClick={() => setShowConsentPreferences(true)}
                className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-primary dark:text-gray-200 hover:text-secondary dark:hover:text-[#00A8CD] transition-colors whitespace-nowrap underline decoration-1 underline-offset-2"
              >
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 text-primary dark:text-gray-200 dark:group-hover:text-[#00A8CD] flex-shrink-0 transition-colors" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,2 C12.7139344,2 13.4186669,2.07493649 14.1058513,2.22228153 C14.6865234,2.34678839 14.8990219,3.06470877 14.4796691,3.48521478 C14.0147885,3.95137375 13.75,4.57867916 13.75,5.25 C13.75,6.42043414 14.5611837,7.42718287 15.6858365,7.68625206 C16.0559035,7.77149876 16.3038519,8.11989963 16.2631619,8.49747198 C16.2544079,8.57870262 16.25,8.66307444 16.25,8.75 C16.25,10.1307119 17.3692881,11.25 18.75,11.25 C19.4766017,11.25 20.151276,10.9392994 20.6235262,10.4053218 C21.0526462,9.92011177 21.8536336,10.1704416 21.9300905,10.8136579 C21.9765784,11.2047517 22,11.6008646 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,3.5 C7.30557963,3.5 3.5,7.30557963 3.5,12 C3.5,16.6944204 7.30557963,20.5 12,20.5 C16.4367197,20.5 20.0795061,17.1007677 20.4660785,12.7645841 L20.4850437,12.5084524 L20.492,12.351 L20.2985099,12.4390561 C19.9679152,12.5778546 19.6173377,12.672508 19.2549465,12.7182945 L18.9810657,12.743398 L18.75,12.75 C16.7439233,12.75 15.0827631,11.2732368 14.7943277,9.34751855 L14.7694285,9.14674696 L14.755,8.96 L14.6100904,8.89964226 C13.3259006,8.32272189 12.4198681,7.0959893 12.2714595,5.6656449 L12.2549278,5.44962193 L12.25,5.25 C12.25,4.80312661 12.3237894,4.36763736 12.4635899,3.95776709 L12.5553294,3.71503308 L12.64,3.525 L12.363736,3.50762946 L12,3.5 Z M15,16 C15.5522847,16 16,16.4477153 16,17 C16,17.5522847 15.5522847,18 15,18 C14.4477153,18 14,17.5522847 14,17 C14,16.4477153 14.4477153,16 15,16 Z M8,15 C8.55228475,15 9,15.4477153 9,16 C9,16.5522847 8.55228475,17 8,17 C7.44771525,17 7,16.5522847 7,16 C7,15.4477153 7.44771525,15 8,15 Z M12,11 C12.5522847,11 13,11.4477153 13,12 C13,12.5522847 12.5522847,13 12,13 C11.4477153,13 11,12.5522847 11,12 C11,11.4477153 11.4477153,11 12,11 Z M7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 Z" fill="currentColor"/>
                </svg>
                <span className="hidden sm:inline">{t("consent.preferences")}</span>
                <span className="sm:hidden">{t("consent.short")}</span>
              </button>
              
              {showConsentPreferences && (
                <ConsentPreferencesPanel
                  onClose={() => setShowConsentPreferences(false)}
                />
              )}

              {showAccessibilityPanel && (
                <AccessibilityPanel
                  onClose={() => setShowAccessibilityPanel(false)}
                />
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-primary dark:text-gray-200 hover:text-secondary dark:hover:text-[#00A8CD] transition-colors whitespace-nowrap underline decoration-1 underline-offset-2"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-primary dark:text-gray-200 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-primary dark:text-gray-200 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
                <span>{isDarkMode ? t("darkMode.light") : t("darkMode.dark")}</span>
              </button>
              
              <button
                onClick={() => setShowAccessibilityPanel(true)}
                className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-primary dark:text-gray-200 hover:text-secondary dark:hover:text-[#00A8CD] transition-colors whitespace-nowrap underline decoration-1 underline-offset-2"
                aria-label={t("accessibility")}
              >
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 text-primary dark:text-gray-200 flex-shrink-0" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="currentColor"/>
                  <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z" fill="currentColor"/>
                </svg>
                <span>{t("accessibility")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

