import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowxtra",
  description: "Recruiting Software & Smart Hiring Tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
