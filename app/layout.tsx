import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
    template: "%s | Flowxtra",
  },
  description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
  keywords: ["recruitment", "recruiting software", "ATS", "AI-powered hiring", "smart hiring tool", "free job posting", "candidate management", "hiring platform"],
  authors: [{ name: "Flowxtra" }],
  openGraph: {
    title: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
    description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowxtra – Recruiting Software & Smart Hiring Tool | Free Job Posting",
    description: "Hire smarter with AI — post jobs for free and manage candidates in one simple, powerful platform.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003f4d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

