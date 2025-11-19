"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    requestType: "request_data",
    message: "",
    agreeToPrivacy: false,
  });

  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Get API base URL
  const API_BASE_URL = getApiBaseUrl();

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

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.fullName,
          request_type: formData.requestType,
          message: formData.message || null,
          agree_to_privacy: formData.agreeToPrivacy,
        }),
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

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
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
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
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
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary underline"
                >
                  {t("privacyPolicy")}
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-button-primary border-2 border-button-primary text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("submitting") : t("submitButton")}
            </button>
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

