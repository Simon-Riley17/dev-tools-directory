import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Directory | Curated Stack",
  description: "A comprehensive, beautifully designed directory of nearly 600 AI models, developer APIs, codebase understanding tools, and tech platforms.",
  openGraph: {
    title: "Dev Directory | Curated Stack",
    description: "A comprehensive, beautifully designed directory of nearly 600 AI models, developer APIs, codebase understanding tools, and tech platforms.",
    url: "https://simon-riley17.github.io/dev-tools-directory/",
    siteName: "Dev Directory",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Directory | Curated Stack",
    description: "A comprehensive, beautifully designed directory of nearly 600 AI models, developer APIs, codebase understanding tools, and tech platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
