import type { Metadata } from "next";
import { PortfolioAssistant } from "@/components/portfolio-assistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sohail Ansari | Delhi's 17-Year-Old AI-Native Developer",
  description:
    "Premium freelance portfolio for Sohail Ansari, a Delhi-based AI-native developer building websites and apps faster and more affordably for Indian small businesses.",
  openGraph: {
    title: "Sohail Ansari | Delhi's 17-Year-Old AI-Native Developer",
    description:
      "Building websites and apps 3x faster and 50% cheaper for Indian small businesses using AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <PortfolioAssistant />
      </body>
    </html>
  );
}
