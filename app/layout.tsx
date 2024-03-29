/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-29 15:45:27
 * @FilePath: /seo-tools/app/layout.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import "./globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import ScrollToTop from "./components/ToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEO Tools - Awesome Hackers Tools ",
  description: "收集全网最全的SEO工具，助力运营人员和独立开发者",
  keywords: [
    "技术出海",
    "工具出海",
    "品牌出海",
    "独立开发者",
    "科技出海",
    "独立开发者出海技术栈和工具",
    "独立开发者出海工具",
    "独立开发者出海技术栈",
    "出海营销",
    "独立开发者出海",
    "独立开发者出海业务",
    "面向海外用户开发产品",
    "出海第一步，搞定工具库",
  ],
  // alternates: {
  //   canonical: "https://seo.chuhai.tools",
  // },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SEO Tools - Awesome Hackers Tools ",
    description: "收集全网最全的SEO工具，助力运营人员和独立开发者",
    type: "website",
    url: "https://seo.chuhai.tools",
    siteName: "SEO Tools - Awesome Hackers Tools ",
    images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Tools - Awesome Hackers Tools ",
    description: "收集全网最全的SEO工具，助力运营人员和独立开发者",
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
          <Suspense>{children}</Suspense>
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
