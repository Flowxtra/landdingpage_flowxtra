import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowxtra- Free recruiting software & applicant tracking system",
  description:
    "Flowxtra is a free recruiting software and Applicant Tracking System (ATS) that helps companies post jobs for free, use social media recruiting, and efficiently manage applicants with AI-powered hiring tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
