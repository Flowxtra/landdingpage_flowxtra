"use client";

import { useState, memo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const tNav = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currency, setCurrency] = useState<string>("EUR");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Initialize dark mode from localStorage or browser preferences
  useEffect(() => {
    // Dark mode initialization
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update language state when pathname changes
  useEffect(() => {
    // Language initialization - Detect from URL path (source of truth)
    const localeMap: { [key: string]: string } = {
      '/de': 'DE',
      '/en': 'EN',
      '/fr': 'FR',
      '/es': 'ES',
      '/it': 'IT',
      '/nl': 'NL',
      '/ar': 'AR',
    };
    
    let detectedLang = 'EN'; // Default
    for (const [prefix, lang] of Object.entries(localeMap)) {
      if (pathname.startsWith(prefix)) {
        detectedLang = lang;
        break;
      }
    }
    
    setLanguage(detectedLang);
    localStorage.setItem("language", detectedLang);
  }, [pathname]);

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

  // Change language
  const changeLanguage = (lang: string) => {
    const langToLocale: { [key: string]: string } = {
      "EN": "en",
      "DE": "de",
      "FR": "fr",
      "ES": "es",
      "IT": "it",
      "NL": "nl",
      "AR": "ar",
    };
    
    const newLocale = langToLocale[lang] || "en";
    
    // Get current path without locale
    let pathWithoutLocale = pathname;
    const localePrefixes = ['/en', '/de', '/fr', '/es', '/it', '/nl', '/ar'];
    for (const prefix of localePrefixes) {
      if (pathname.startsWith(prefix)) {
        pathWithoutLocale = pathname.substring(prefix.length) || '/';
        break;
      }
    }
    
    // Translate German URLs back to English URLs first
    const germanToEnglish: { [key: string]: string } = {
      '/kontakt': '/contact-us',
      '/preise': '/pricing',
      '/funktionen': '/features',
      '/jetzt-starten': '/get-started',
      '/anmelden': '/login',
      '/barrierefreiheit': '/accessibility',
    };
    
    // If current path is a German URL, convert it to English first
    if (germanToEnglish[pathWithoutLocale]) {
      pathWithoutLocale = germanToEnglish[pathWithoutLocale];
    }
    
    // Now translate to target language if needed (only German has custom URLs for now)
    if (newLocale === 'de') {
      const englishToGerman: { [key: string]: string } = {
        '/contact-us': '/kontakt',
        '/pricing': '/preise',
        '/features': '/funktionen',
        '/get-started': '/jetzt-starten',
        '/login': '/anmelden',
        '/accessibility': '/barrierefreiheit',
      };
      pathWithoutLocale = englishToGerman[pathWithoutLocale] || pathWithoutLocale;
    }
    
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    // Clear language from localStorage before reload
    localStorage.removeItem("language");
    
    // Force full page reload to ensure translations update
    window.location.replace(newPath);
  };

  // Get current locale from pathname
  const getCurrentLocale = () => {
    if (pathname.startsWith('/de')) return 'de';
    if (pathname.startsWith('/en')) return 'en';
    if (pathname.startsWith('/fr')) return 'fr';
    if (pathname.startsWith('/es')) return 'es';
    if (pathname.startsWith('/it')) return 'it';
    if (pathname.startsWith('/nl')) return 'nl';
    if (pathname.startsWith('/ar')) return 'ar';
    return 'en'; // Default
  };
  const currentLocale = getCurrentLocale();

  // Helper function to get translated route
  const getLocalizedPath = (path: string) => {
    if (currentLocale === 'de') {
      const translations: { [key: string]: string } = {
        '/contact-us': '/kontakt',
        '/pricing': '/preise',
        '/features': '/funktionen',
        '/get-started': '/jetzt-starten',
        '/login': '/anmelden',
        '/accessibility': '/barrierefreiheit',
      };
      return `/${currentLocale}${translations[path] || path}`;
    }
    return `/${currentLocale}${path}`;
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Load currency on mount
  useEffect(() => {
    const saved = localStorage.getItem("fx_currency_code");
    if (saved) setCurrency(saved);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 transition-colors">
      <nav className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center">
            <Image
              src={isDarkMode ? "/flowxtra-logo-white.png" : "/Main-flowxtra-Logo.png"}
              alt="Flowxtra Logo"
              width={150}
              height={50}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href={`/${currentLocale}`}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-secondary-light",
                "h-10 px-4 py-2",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              {t("features")}
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-secondary-light",
                  "h-10 px-4 py-2",
                  "text-gray-700 dark:text-gray-300"
                )}
              >
                {t("services")}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                    <div className="p-2">
                      <Link
                        href={`/${currentLocale}/social-media-management`}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-sm",
                          "text-gray-700 dark:text-gray-300",
                          "hover:bg-gray-100 dark:hover:bg-gray-700",
                          "hover:text-primary dark:hover:text-secondary-light",
                          "transition-colors"
                        )}
                      >
                        {tNav("socialMediaManagement")}
                      </Link>
                      <Link
                        href={`/${currentLocale}/ats-recruiting-software`}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-sm",
                          "text-gray-700 dark:text-gray-300",
                          "hover:bg-gray-100 dark:hover:bg-gray-700",
                          "hover:text-primary dark:hover:text-secondary-light",
                          "transition-colors"
                        )}
                      >
                        {tNav("atsRecruitingSoftware")}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={getLocalizedPath('/pricing')}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-secondary-light",
                "h-10 px-4 py-2",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              {t("pricing")}
            </Link>

            <Link
              href={getLocalizedPath('/contact-us')}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-secondary-light",
                "h-10 px-4 py-2",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              {t("contactUs")}
            </Link>
          </div>

          {/* Action Buttons & Controls - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
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
                  className="w-5 h-5"
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
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Change language"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                  />
                </svg>
                <span className="text-sm font-medium">{language}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-h-96 overflow-y-auto">
                  <div className="p-2">
                    <button
                      onClick={() => changeLanguage("EN")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "EN" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("DE")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "DE" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      Deutsch
                    </button>
                    <button
                      onClick={() => changeLanguage("FR")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "FR" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      Français
                    </button>
                    <button
                      onClick={() => changeLanguage("ES")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "ES" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      Español
                    </button>
                    <button
                      onClick={() => changeLanguage("IT")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "IT" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      Italiano
                    </button>
                    <button
                      onClick={() => changeLanguage("NL")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "NL" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      Nederlands
                    </button>
                    <button
                      onClick={() => changeLanguage("AR")}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        language === "AR" 
                          ? "bg-primary text-white" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      العربية
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Login & Signup Buttons */}
            <Link
              href="https://my.flowxtra.com/login"
              className="border-2 border-[#00A8CD] bg-transparent text-[#00A8CD] px-6 py-2 rounded-lg hover:bg-[#00A8CD] hover:border-[#00A8CD] hover:text-white transition-all font-medium"
            >
              {t("login")}
            </Link>
            <Link
              href="https://my.flowxtra.com/registration"
              className="bg-button-primary border-2 border-button-primary text-white px-6 py-2 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium"
            >
              {t("signup")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden py-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${currentLocale}`}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary-light font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("features")}
              </Link>

              {/* Services - Mobile */}
              <div>
                <button
                  className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary-light font-medium transition-colors flex items-center justify-between"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  {t("services")}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href={`/${currentLocale}/social-media-management`}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tNav("socialMediaManagement")}
                    </Link>
                    <Link
                      href={`/${currentLocale}/ats-recruiting-software`}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {tNav("atsRecruitingSoftware")}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href={getLocalizedPath('/pricing')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary-light font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("pricing")}
              </Link>

              <Link
                href={getLocalizedPath('/contact-us')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary-light font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("contactUs")}
              </Link>

              {/* Dark Mode & Language - Mobile */}
              <div className="pt-4 border-t dark:border-gray-700 space-y-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  <span className="font-medium">Dark Mode</span>
                  {isDarkMode ? (
                    <svg
                      className="w-5 h-5"
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
                      className="w-5 h-5"
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
                </button>

                {/* Language Selector (Mobile dropdown) */}
                <div className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-gray-700 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Language</span>
                    </div>
                    <select
                      aria-label="Select language"
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className="bg-gray-200 dark:bg-gray-700 border-0 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                    >
                      <option value="EN">English</option>
                      <option value="DE">Deutsch</option>
                      <option value="FR">Français</option>
                      <option value="ES">Español</option>
                      <option value="IT">Italiano</option>
                      <option value="NL">Nederlands</option>
                      <option value="AR">العربية</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="pt-4 border-t space-y-3">
                <Link
                  href="https://my.flowxtra.com/login"
                  className="block text-center border-2 border-[#00A8CD] bg-transparent text-[#00A8CD] px-6 py-2 rounded-lg hover:bg-[#00A8CD] hover:border-[#00A8CD] hover:text-white transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("login")}
                </Link>
                <Link
                  href="https://my.flowxtra.com/registration"
                  className="block text-center bg-[#00A8CD] border-2 border-[#00A8CD] text-white px-6 py-2 rounded-lg hover:bg-[#00A8CD] hover:border-[#00A8CD] transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("signup")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default memo(Header);

