"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

declare global {
  interface Window {
    onRecaptchaSuccess?: (token: string) => void;
    onRecaptchaLoad?: () => void;
    grecaptcha?: {
      render: (element: Element | null, options: { sitekey: string; callback: string }) => void;
      reset?: () => void;
    };
  }
}

/**
 * Get API base URL from environment variables
 * Development: Uses proxy route (/api/data-request) to avoid CORS issues
 * Production: Uses NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_API_URL
 */
function getApiBaseUrl(): string {
  // ALWAYS use Next.js API route as proxy to avoid CORS issues
  console.log("[Data Request API] Using proxy /api/data-request (avoids CORS)");
  return "/api/data-request";
}

export default function DataRequestPage() {
  const t = useTranslations("dataRequest");
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    requestType: "request_data",
    message: "",
    agreeToPrivacy: false,
  });

  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const recaptchaRef = useRef<HTMLDivElement>(null);

  // Get API base URL and check if we're in local development
  const API_BASE_URL = getApiBaseUrl();
  const isLocal = process.env.NODE_ENV === "development";
  
  // Check if reCAPTCHA is enabled from environment variable
  // In development: enabled by default (uses test key)
  // In production: must be explicitly enabled via NEXT_PUBLIC_RECAPTCHA_ENABLED=true
  const isRecaptchaEnabled = isLocal 
    ? process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED !== "false" // Default: true in development
    : process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true"; // Default: false in production
  
  // Debug logging
  useEffect(() => {
    console.log('[reCAPTCHA] Status check:', {
      isLocal,
      isRecaptchaEnabled,
      envValue: process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED,
      siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? 'Set' : 'Not set'
    });
  }, [isLocal, isRecaptchaEnabled]);

  // Load reCAPTCHA script only if enabled
  useEffect(() => {
    console.log('[reCAPTCHA] useEffect triggered, isRecaptchaEnabled:', isRecaptchaEnabled);
    
    // Skip if reCAPTCHA is disabled
    if (!isRecaptchaEnabled) {
      console.log('[reCAPTCHA] Skipped - reCAPTCHA is disabled');
      return;
    }
    
    console.log('[reCAPTCHA] Starting to load reCAPTCHA...');

    // Define callback function globally (must be defined before script loads)
    window.onRecaptchaSuccess = (token: string) => {
      console.log('[reCAPTCHA] Token received:', token ? 'Yes' : 'No');
      setRecaptchaToken(token);
    };

    // Check if script already exists
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      // Script already loaded, render widget if grecaptcha is available
      if (window.grecaptcha?.render) {
        setTimeout(() => {
          const recaptchaElement = recaptchaRef.current || document.querySelector('.g-recaptcha');
          if (recaptchaElement && !recaptchaElement.querySelector('iframe')) {
            const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY 
              ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
              : (isLocal ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" : null);
            if (siteKey) {
              try {
                window.grecaptcha?.render?.(recaptchaElement, {
                  sitekey: siteKey,
                  callback: 'onRecaptchaSuccess'
                });
                console.log('[reCAPTCHA] Widget rendered (script already loaded)');
              } catch (error) {
                console.error('[reCAPTCHA] Render error:', error);
              }
            }
          }
        }, 100);
      }
      return;
    }

    // Load script with onload callback
    // Use real site key if available, otherwise use test key in development
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY 
      ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      : (isLocal ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" : null);

    if (!siteKey) {
      console.warn('[reCAPTCHA] Site key not found');
      return;
    }
    
    console.log('[reCAPTCHA] Using site key:', siteKey.substring(0, 20) + '...');

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;

    // Define onload callback to render widget after script loads
    window.onRecaptchaLoad = () => {
      console.log('[reCAPTCHA] Script loaded, rendering widget...');
      // Wait a bit to ensure DOM is ready
      setTimeout(() => {
        const recaptchaElement = recaptchaRef.current || document.querySelector('.g-recaptcha');
        console.log('[reCAPTCHA] Element found:', !!recaptchaElement);
        console.log('[reCAPTCHA] grecaptcha available:', !!window.grecaptcha);
        if (recaptchaElement && window.grecaptcha?.render && !recaptchaElement.querySelector('iframe')) {
          try {
            window.grecaptcha.render(recaptchaElement, {
              sitekey: siteKey,
              callback: 'onRecaptchaSuccess'
            });
            console.log('[reCAPTCHA] Widget rendered successfully');
          } catch (error) {
            console.error('[reCAPTCHA] Render error:', error);
          }
        } else {
          console.warn('[reCAPTCHA] Cannot render - element or grecaptcha not available, or already rendered');
        }
      }, 100);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.onRecaptchaSuccess;
      delete window.onRecaptchaLoad;
    };
  }, [isRecaptchaEnabled, isLocal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "message") {
        setCharCount(value.length);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    // Require reCAPTCHA token only if reCAPTCHA is enabled and we're not in development mode
    if (isRecaptchaEnabled && !recaptchaToken && !isLocal) {
      setSubmitStatus('error');
      setErrorMessage(t("recaptchaRequired") || "Please complete the reCAPTCHA verification");
      setIsSubmitting(false);
      return;
    }

    try {
      // Build request body - include recaptcha_token
      const requestBody: {
        email: string;
        full_name: string;
        request_type: string;
        message: string | null;
        agree_to_privacy: boolean;
        recaptcha_token?: string;
      } = {
        email: formData.email,
        full_name: formData.fullName,
        request_type: formData.requestType,
        message: formData.message || null,
        agree_to_privacy: formData.agreeToPrivacy,
      };

      // Add recaptcha_token
      // If reCAPTCHA is enabled and we have a token, use it
      if (isRecaptchaEnabled && recaptchaToken) {
        requestBody.recaptcha_token = recaptchaToken;
        console.log('[reCAPTCHA] Sending real token');
      } else if (isLocal && !recaptchaToken) {
        // In development mode, send dummy token if reCAPTCHA widget didn't work
        // Backend will accept it if RECAPTCHA_ENABLED=false
        requestBody.recaptcha_token = "test-token-development-mode";
        console.log('[reCAPTCHA] Sending dummy token (development mode)');
      } else if (!recaptchaToken) {
        // No token and not in development - this shouldn't happen due to validation above
        console.warn('[reCAPTCHA] No token available!');
      }

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || t("submitError"));
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        email: "",
        fullName: "",
        requestType: "request_data",
        message: "",
        agreeToPrivacy: false,
      });
      setCharCount(0);
      setRecaptchaToken(null);
      // Reset reCAPTCHA only if it's enabled and exists
      if (isRecaptchaEnabled && !isLocal && typeof window.grecaptcha?.reset === 'function') {
        try {
          window.grecaptcha?.reset?.();
        } catch (error) {
          console.warn('reCAPTCHA reset failed:', error);
        }
      }
    } catch (error) {
      console.error("Error submitting data request:", error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : t("submitError")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("emailLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={t("emailPlaceholder")}
              />
            </div>

            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("fullNameLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={t("fullNamePlaceholder")}
              />
            </div>

            {/* Request Type Field */}
            <div>
              <label
                htmlFor="requestType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("requestTypeLabel")} <span className="text-red-500">*</span>
              </label>
              <select
                id="requestType"
                name="requestType"
                required
                value={formData.requestType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="request_data">{t("requestTypeOptions.requestData")}</option>
                <option value="delete_data">{t("requestTypeOptions.deleteData")}</option>
                <option value="update_data">{t("requestTypeOptions.updateData")}</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("messageLabel")} ({charCount}/{maxChars})
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                maxLength={maxChars}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder={t("messagePlaceholder")}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t("messageHint")}
              </p>
            </div>

            {/* Privacy Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToPrivacy"
                name="agreeToPrivacy"
                required
                checked={formData.agreeToPrivacy}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
              />
              <label
                htmlFor="agreeToPrivacy"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                {t("privacyAgreement")}{" "}
                <a
                  href={`/${locale}/privacy-policy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary underline"
                >
                  {t("privacyPolicy")}
                </a>
                {" "}{t("and")}{" "}
                <a
                  href={`/${locale}/terms-of-use`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary underline"
                >
                  {t("termsOfUse")}
                </a>
              </label>
            </div>

            {/* Google reCAPTCHA - Only show if enabled */}
            {isRecaptchaEnabled && (
              <div ref={recaptchaRef} className="g-recaptcha" id="recaptcha-widget"></div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("submitting") : t("submitButton")}
            </button>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-800 dark:text-green-200">
                    {t("successMessage")}
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400 mr-3"
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
                  <p className="text-red-800 dark:text-red-200">
                    {errorMessage || t("errorMessage")}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-footer-bg dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("infoTitle")}
          </h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p>{t("infoDescription")}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t("infoPoint1")}</li>
              <li>{t("infoPoint2")}</li>
              <li>{t("infoPoint3")}</li>
              {t("infoPoint4") && <li>{t("infoPoint4")}</li>}
              {t("infoPoint5") && <li>{t("infoPoint5")}</li>}
            </ul>
            <p className="mt-4">
              <strong>{t("infoNote")}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

