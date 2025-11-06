"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Infinity, CreditCard, DollarSign, ArrowRight } from "lucide-react";

// Dynamic import for PricingSection to reduce initial bundle size
const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  ),
});

// FAQ Accordion Component
function FAQAccordion() {
  const t = useTranslations("affiliate.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default

  const faqs = [
    {
      question: t("q1.question"),
      answer: t("q1.answer")
    },
    {
      question: t("q2.question"),
      answer: t("q2.answer")
    },
    {
      question: t("q3.question"),
      answer: t("q3.answer")
    },
    {
      question: t("q4.question"),
      answer: t("q4.answer")
    },
    {
      question: t("q5.question"),
      answer: t("q5.answer")
    },
    {
      question: t("q6.question"),
      answer: t("q6.answer")
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-0">
      {faqs.map((faq, index) => (
        <div key={index}>
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center gap-4 py-6 text-left transition-colors hover:text-primary dark:hover:text-[#00A8CD] group"
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AffiliatePage() {
  const t = useTranslations("affiliate");

  // Commission data
  const commissionData = [
    { plan: "free", price: 0, commission: 0, monthly: 0, total: 0 },
    { plan: "starter", price: 30, commission: 15, monthly: 15, total: 180 },
    { plan: "basic", price: 99, commission: 49.5, monthly: 49.5, total: 594 },
    { plan: "professional", price: 249, commission: 124.5, monthly: 124.5, total: 1494 },
    { plan: "advanced", price: 399, commission: 199.5, monthly: 199.5, total: 2394 },
    { plan: "enterprise", price: 799, commission: 399.5, monthly: 399.5, total: 4794 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="w-full pt-2.5 pb-16 md:pb-24 px-[10px] bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full rounded-[10px] px-[10px] pt-16 md:pt-20 pb-16 md:pb-20 bg-[#f4f6f8] dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-primary dark:text-secondary font-semibold mb-4">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://my.flowxtra.com/registration"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-button-primary border-2 border-button-primary text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-lg"
              >
                {t("hero.cta")}
              </a>
              <Link
                href="#how-it-works"
                className="border-2 border-primary text-primary dark:border-white dark:text-white px-8 py-3 rounded-lg hover:bg-button-hover hover:border-button-hover hover:text-white transition-all font-medium text-lg"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("howItWorks.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("howItWorks.step1.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("howItWorks.step1.description")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("howItWorks.step2.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("howItWorks.step2.description")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("howItWorks.step3.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("howItWorks.step3.description")}
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("howItWorks.step4.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("howItWorks.step4.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Table Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("commission.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("commission.subtitle")}
            </p>
          </div>

          {/* Commission Table - Desktop */}
          <div className="max-w-5xl mx-auto hidden lg:block overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-primary dark:bg-secondary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{t("commission.table.plan")}</th>
                  <th className="px-6 py-4 text-left font-semibold">{t("commission.table.monthlyPrice")}</th>
                  <th className="px-6 py-4 text-left font-semibold">{t("commission.table.yourCommission")}</th>
                  <th className="px-6 py-4 text-left font-semibold">{t("commission.table.monthlyEarning")}</th>
                  <th className="px-6 py-4 text-left font-semibold">{t("commission.table.annualPotential")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {commissionData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {t(`commission.${item.plan}`)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {item.price === 0 ? t("commission.free") : `€${item.price}${t("commission.perMonth")}`}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {item.commission === 0 ? "—" : "50%"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary dark:text-secondary">
                      {item.monthly === 0 ? "—" : `€${item.monthly.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {item.total === 0 ? "—" : `€${item.total}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Commission Cards - Mobile/Tablet */}
          <div className="max-w-5xl mx-auto lg:hidden space-y-4">
            {commissionData.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Card Header */}
                <div className="bg-primary dark:bg-secondary text-white px-4 py-3">
                  <h3 className="font-semibold text-lg">
                    {t(`commission.${item.plan}`)}
                  </h3>
                </div>
                
                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("commission.table.monthlyPrice")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.price === 0 ? t("commission.free") : `€${item.price}${t("commission.perMonth")}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("commission.table.yourCommission")}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.commission === 0 ? "—" : "50%"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("commission.table.monthlyEarning")}</span>
                    <span className="font-semibold text-primary dark:text-secondary">
                      {item.monthly === 0 ? "—" : `€${item.monthly.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{t("commission.table.annualPotential")}</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {item.total === 0 ? "—" : `€${item.total}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Example Box */}
          <div className="max-w-3xl mx-auto mt-12 bg-primary/10 dark:bg-secondary/10 border-2 border-primary dark:border-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t("commission.example.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {t("commission.example.description")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              {t("commission.example.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Payment Terms Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("paymentTerms.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("paymentTerms.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Infinity, color: "text-[#00A8CD]" },
              { icon: CreditCard, color: "text-[#00A8CD]" },
              { icon: DollarSign, color: "text-[#00A8CD]" },
              { icon: ArrowRight, color: "text-[#00A8CD]" },
            ].map(({ icon: Icon, color }, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 dark:bg-secondary/10 flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t(`paymentTerms.terms.${index}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t(`paymentTerms.terms.${index}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Reference Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <PricingSection defaultCompareOpen={false} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("faq.title")}
            </h2>
            <div className="flex items-center gap-2 text-base md:text-lg text-gray-600 dark:text-white">
              <svg className="w-5 h-5 text-primary dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>
                {t("faq.helpText")}{" "}
                <Link href="/contact-us" className="text-primary dark:text-white dark:underline hover:underline dark:hover:text-[#00A8CD] font-semibold">
                  {t("faq.chatLink")}
                </Link>
              </span>
            </div>
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion />
        </div>
      </section>

      
    </div>
  );
}

