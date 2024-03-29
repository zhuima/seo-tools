/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-29 11:31:02
 * @FilePath: /web/app/layout.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import "./globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import ScrollToTop from "./components/ToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
// import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chuhai Tools - 独立开发者出海技术栈和工具",
  description:
    "出海第一步，搞定技术栈, 聚合全网独立开发者出海技术栈和工具, 技术出海相关的技术实践经验、合规解读、方案选型等",
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
  //   canonical: "https://chuhai.tools",
  // },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Chuhai Tools - 独立开发者出海技术栈和工具",
    description:
      "出海第一步，搞定技术栈, 聚合全网独立开发者出海技术栈和工具, 技术出海相关的技术实践经验、合规解读、方案选型等",
    type: "website",
    url: "https://chuhai.tools",
    siteName: "Chuhai Tools - 独立开发者出海技术栈和工具",
    images: "https://img.techrk1688.eu.org/file/cefff46f0a29ce378b110.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chuhai Tools - 独立开发者出海技术栈和工具",
    description:
      "出海第一步，搞定技术栈, 聚合全网独立开发者出海技术栈和工具, 技术出海相关的技术实践经验、合规解读、方案选型等",
    site: "https://chuhai.tools",
    images: "https://img.techrk1688.eu.org/file/cefff46f0a29ce378b110.png",
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
          {children}
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
