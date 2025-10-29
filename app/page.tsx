// Main Homepage
// The Header shows "Features" but it links here to keep the URL as flowxtra.com
import Image from "next/image";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Full Width */}
      <section className="w-full py-12 md:py-20">
        <div className="flex flex-col items-center space-y-12">
          {/* Top Content */}
          <div className="w-full px-4 md:px-8 text-center space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mx-auto max-w-5xl px-2">
              ATS Software for Recruitment & Hiring
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-secondary-light max-w-4xl mx-auto px-2">
              All-in-One Platform to Streamline Your Hiring Process
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto px-4">
              Complete ATS software to streamline hiring and manage your team. Start with 10 free job postings per month
            </p>
            
            <div className="pt-4">
              <a
                href="https://my.flowxtra.com/registration"
                className="inline-block bg-button-primary border-2 border-button-primary text-white px-8 py-4 rounded-lg hover:bg-button-hover hover:border-button-hover transition-colors font-medium text-lg shadow-lg"
              >
                Start Your Free Plan
              </a>
            </div>
          </div>

          {/* Bottom Image - Full Width */}
          <div className="w-full bg-white dark:bg-gray-900">
            <div className="overflow-hidden">
              <figure>
                {/* Mobile Image */}
                <Image
                  src="/img/ATS-Software-for-Recruitment2.webp"
                  alt="Why Flowxtra Is the Best Free Job Posting Platform"
                  title="Free Job Posting"
                  width={800}
                  height={600}
                  quality={100}
                  priority
                  className="w-full h-auto block md:hidden"
                />
                {/* Desktop Image */}
                <Image
                  src="/img/ATS-Software-for-Recruitment.webp"
                  alt="Why Flowxtra Is the Best Free Job Posting Platform"
                  title="Free Job Posting"
                  width={1920}
                  height={1080}
                  quality={100}
                  priority
                  className="w-full h-auto hidden md:block"
                />
                <figcaption className="sr-only">
                  Control everything from one smart dashboard. Full view of Flowxtra's dashboard to manage and publish free job posts.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* GDPR & Compliance Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-4 py-2 text-primary dark:text-blue-400 rounded-full text-sm font-medium" style={{ backgroundColor: '#d9e9ec' }}>
                  GDPR & DSGVO
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Flowxtra Smarter
Hiring Faster Growth              </h2>

              {/* Description */}
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-base md:text-lg leading-relaxed">
                  Flowxtra streamlines hiring with AI! Create job ads, connect with candidates, and automate tasks like scheduling—making recruitment faster and smarter.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  All data is securely stored in the EU. Transparency. Privacy. Compliance — built in by design.
                </p>
              </div>

              {/* FAQ Link */}
              <div className="pt-4">
                <a
                  href="/faq"
                  className="inline-flex items-center text-primary dark:text-secondary-light hover:text-secondary dark:hover:text-secondary font-medium text-lg group"
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
                  Read our full FAQ
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
            <div className="space-y-2 overflow-hidden">
              {/* Row 1 - Move Right (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-6 animate-scroll-right whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame 2095584493.svg"
                    alt="Review us on Trustpilot"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078831.svg"
                    alt="Made in Austria"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584455.svg"
                    alt="AI Act Compliant"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584493.svg"
                    alt="Review us on Trustpilot"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078831.svg"
                    alt="Made in Austria"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584455.svg"
                    alt="AI Act Compliant"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                </div>
              </div>

              {/* Row 2 - Move Left (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-6 animate-scroll-left whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame 1984078825.svg"
                    alt="DSGVO & GDPR Compliant"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078827.svg"
                    alt="Customization"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078829.svg"
                    alt="User-Friendly"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078825.svg"
                    alt="DSGVO & GDPR Compliant"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078827.svg"
                    alt="Customization"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 1984078829.svg"
                    alt="User-Friendly"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                </div>
              </div>

              {/* Row 3 - Move Right (3 icons) */}
              <div className="overflow-hidden flex">
                <div className="flex gap-6 animate-scroll-right whitespace-nowrap">
                  <Image
                    src="/img/icon/Frame 2095584494.svg"
                    alt="eIDAS"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584495.svg"
                    alt="Time Saving Features"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584496.svg"
                    alt="AI-Powered"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584494.svg"
                    alt="eIDAS"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584495.svg"
                    alt="Time Saving Features"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                  <Image
                    src="/img/icon/Frame 2095584496.svg"
                    alt="AI-Powered"
                    width={500}
                    height={250}
                    className="flex-shrink-0 h-56 w-auto inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

