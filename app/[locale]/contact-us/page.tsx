"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactUs() {
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
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", formData, "reCAPTCHA Token:", recaptchaToken);
      
      setSubmitStatus('success');
      
      setFormData({
        email: "",
        firstName: "",
        review: "",
        agreeToPrivacy: false,
      });
      setCharCount(0);
      setRecaptchaToken(null);
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {t("title")}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("description")}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email and First Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("form.email")} <span className="text-red-500">{t("form.required")}</span>
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
                  />
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("form.firstName")} <span className="text-red-500">{t("form.required")}</span>
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
                  {t("form.message")} <span className="text-red-500">{t("form.required")}</span>
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
                  {" "}<span className="text-red-500">{t("form.required")}</span>
                </label>
              </div>

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
                  alt="AI-powered recruiting and HR platform for smarter hiring"
                  title="Flowxtra – All-in-One AI Recruiting & HR Platform"
                  width={800}
                  height={600}
                  quality={100}
                  unoptimized
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="sr-only">
                  Manage job posts, candidates, and contracts with AI — all in one place, Free.
                </figcaption>
              </figure>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
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
    </div>
  );
}

