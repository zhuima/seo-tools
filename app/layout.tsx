/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 12:23:02
 * @FilePath: /seo/app/layout.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import "./globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Script from "next/script";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import ScrollToTop from "@/app/components/ToTop";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
// import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Essential SEO Tools for SEO Pros in 2024",
  description:
    "seo.chuhai.tools offers comprehensive online SEO analysis tools to boost website rankings. It includes a wide range of SEO tools such as keyword research, website auditing, link analysis, and more, tailored for professional SEO experts and website owners. Quickly detect website health issues, identify and fix SEO problems, and improve search engine visibility. Free to use, with real-time analysis reports, this platform is your ultimate companion for website SEO optimization.",
  keywords: [
    "seo tools",
    "seo analysis tools",
    "website seo checker",
    "seo audit tools",
    "on-page seo tools",
    "keyword research tools",
    "free seo tools for small business",
    "best seo tools for agencies",
    "top on-page seo analysis tools",
    "local seo tools for google maps",
    "seo services",
    "seo company",
    "seo agency",
    "seo consultant",
    "seo tools usa",
    "seo analysis tools uk",
    "best seo tools in canada",
  ],
  alternates: {
    canonical: "https://seo.chuhai.tools",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Essential SEO Tools for SEO Pros in 2024",
    description: "Essential SEO Tools for SEO Pros in 2024",
    type: "website",
    url: "https://seo.chuhai.tools",
    siteName: "SEO Tools - Awesome Hackers Tools ",
    images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Essential SEO Tools for SEO Pros in 2024",
    description: "Essential SEO Tools for SEO Pros in 2024",
    site: "https://seo.chuhai.tools",
    images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              name: "Indie Hacker Tools",
              url: "https://seo.chuhai.tools/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://chuhai.tools/?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      {/* Clarity Script */}
      <Script strategy="lazyOnload" id="clarity-script">
        {`
          (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "l7rjuiarul");
        `}
      </Script>
      <body className={inter.className}>
        <main>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          <Footer />
          <ScrollToTop />
        </main>
      </body>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}
      />
    </html>
  );
}
