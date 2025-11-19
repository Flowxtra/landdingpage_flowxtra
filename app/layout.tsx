import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowxtra: Free recruiting software & applicant tracking system",
  description:
    "Flowxtra is an AI-powered recruiting platform with a free ATS, unlimited job postings, social media automation, and digital signatures built for startups, SMBs, and enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
