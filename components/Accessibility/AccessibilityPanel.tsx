'use client';

import { useState, useEffect } from 'react';
import { useAccessibility } from './hooks/useAccessibility';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface AccessibilityPanelProps {
  onClose: () => void;
}

export default function AccessibilityPanel({ onClose }: AccessibilityPanelProps) {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const t = useTranslations('accessibility.widget');
  const locale = useLocale();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode state
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

    // Listen for class changes on html element
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

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle reading mask mouse tracking
  useEffect(() => {
    if (!settings.readingMask) return;

    const maskElement = document.getElementById('accessibility-reading-mask');
    if (!maskElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const radius = 100;
      maskElement.style.background = `radial-gradient(circle ${radius}px at ${e.clientX}px ${e.clientY}px, transparent 0%, rgba(0, 0, 0, 0.7) 100%)`;
      maskElement.style.display = 'block';
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [settings.readingMask]);

  const fontSizeOptions = [
    { value: 0.875, icon: 'T', label: t('content.biggerText') },
    { value: 1, icon: 'T', label: t('content.biggerText') },
    { value: 1.125, icon: 'T', label: t('content.biggerText') },
    { value: 1.25, icon: 'T', label: t('content.biggerText') },
    { value: 1.5, icon: 'T', label: t('content.biggerText') },
  ];

  const lineHeightOptions = [
    { value: 1.2, label: '1.2x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' },
    { value: 2.5, label: '2.5x' },
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      {/* Drawer Panel - Slides from Right */}
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Dark Teal */}
        <div className="bg-primary dark:bg-secondary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg 
              className="w-6 h-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="currentColor"/>
              <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z" fill="currentColor"/>
            </svg>
            <h2 id="accessibility-panel-title" className="text-lg font-bold">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetSettings}
              className="p-2 hover:bg-white/20 rounded transition-colors"
              aria-label={t('reset')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded transition-colors"
              aria-label={t('close')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Content Adjustments */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
              {t('sections.contentAdjustments')}
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {/* Bigger text */}
              <button
                onClick={() => {
                  const currentIndex = fontSizeOptions.findIndex(o => o.value === settings.fontSize);
                  const nextIndex = (currentIndex + 1) % fontSizeOptions.length;
                  updateSetting('fontSize', fontSizeOptions[nextIndex].value);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  settings.fontSize !== 1
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-xl font-bold text-primary dark:text-secondary">
                  T<span className="text-xs">r</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('content.biggerText')}</span>
              </button>

              {/* Bigger line height */}
              <button
                onClick={() => {
                  const currentIndex = lineHeightOptions.findIndex(o => o.value === settings.lineHeight);
                  const nextIndex = (currentIndex + 1) % lineHeightOptions.length;
                  updateSetting('lineHeight', lineHeightOptions[nextIndex].value);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  settings.lineHeight !== 1.5
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4 4m-4-4v12" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8l4 4m0 0l4-4m-4 4V4" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('content.biggerLineHeight')}</span>
              </button>

              {/* Text align */}
              <button
                onClick={() => {
                  const aligns: ('left' | 'center' | 'justify')[] = ['left', 'center', 'justify'];
                  const currentIndex = aligns.indexOf(settings.textAlign);
                  const nextIndex = (currentIndex + 1) % aligns.length;
                  updateSetting('textAlign', aligns[nextIndex]);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  settings.textAlign !== 'left'
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('content.textAlign')}</span>
              </button>

              {/* Readable font */}
              <button
                onClick={() => updateSetting('readableFont', !settings.readableFont)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  settings.readableFont
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-xl font-bold text-primary dark:text-secondary">Aa</div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('content.readableFont')}</span>
              </button>
            </div>
          </div>

          {/* Orientation Adjustments */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
              {t('sections.orientationAdjustments')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {/* Page structure */}
              <button
                onClick={() => updateSetting('pageStructure', !settings.pageStructure)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.pageStructure
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('orientation.pageStructure')}</span>
              </button>

              {/* Reading mask */}
              <button
                onClick={() => updateSetting('readingMask', !settings.readingMask)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.readingMask
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('orientation.readingMask')}</span>
              </button>

              {/* Hide images */}
              <button
                onClick={() => updateSetting('hideImages', !settings.hideImages)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.hideImages
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('orientation.hideImages')}</span>
              </button>

              {/* Pause animations */}
              <button
                onClick={() => updateSetting('stopAnimations', !settings.stopAnimations)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.stopAnimations
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('orientation.pauseAnimations')}</span>
              </button>

              {/* Highlight links */}
              <button
                onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.highlightLinks
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('orientation.highlightLinks')}</span>
              </button>

              {/* Outline focus */}
              <button
                onClick={() => updateSetting('outlineFocus', !settings.outlineFocus)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.outlineFocus
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('orientation.outlineFocus')}</span>
              </button>
            </div>
          </div>

          {/* Color Adjustments */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
              {t('sections.colorAdjustments')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {/* Dark/Light Mode */}
              <button
                onClick={toggleDarkMode}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {isDarkMode ? t('color.darkMode') : t('color.lightMode')}
                </span>
              </button>

              {/* Greyscale */}
              <button
                onClick={() => updateSetting('monochrome', !settings.monochrome)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.monochrome
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('color.greyscale')}</span>
              </button>

              {/* Contrast */}
              <button
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                  settings.highContrast
                    ? 'bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-6 h-6 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="text-xs text-gray-600 dark:text-gray-400">{t('color.contrast')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>{t('footer.poweredBy')}</span>
            <a
              href="https://dpro.at"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary dark:hover:text-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/img/icon/footer_icon/dpro_icon.png"
                alt="Dpro"
                width={20}
                height={20}
                quality={100}
                className="w-5 h-5 object-contain"
                unoptimized
              />
              <span className="font-medium">{t('footer.dpro')}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href={`/${locale}/accessibility`}
              className="flex items-center gap-1 hover:text-primary dark:hover:text-secondary transition-colors"
              onClick={onClose}
            >
              {t('footer.statement')}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link 
              href="https://flowxtra.com/sitemap_index.xml"
              className="flex items-center gap-1 hover:text-primary dark:hover:text-secondary transition-colors"
              onClick={onClose}
            >
              {t('footer.sitemap')}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
