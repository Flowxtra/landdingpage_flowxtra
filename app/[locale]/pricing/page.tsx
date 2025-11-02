"use client";

import dynamic from "next/dynamic";

// Dynamic import to reduce initial bundle size
const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  loading: () => (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
      </div>
    </div>
  ),
});

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Page Header */}
      
        {/* Pricing Section Component */}
        <PricingSection defaultCompareOpen={true} />
      </div>
    </div>
  );
}

