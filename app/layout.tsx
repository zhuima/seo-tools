/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-21 13:54:23
 * @FilePath: /web/app/layout.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import "./globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import ScrollToTop from "./components/ToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

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
  alternates: {
    canonical: "https://chuhai.tools",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.ico",
    android: "/android-chrome-192x192.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Chuhai Tools - 独立开发者出海技术栈和工具",
    description:
      "出海第一步，搞定技术栈, 聚合全网独立开发者出海技术栈和工具, 技术出海相关的技术实践经验、合规解读、方案选型等",
    type: "website",
    url: "https://chuhai.tools",
    siteName: "Chuhai Tools - 独立开发者出海技术栈和工具",
    images: "https://img.techrk1688.eu.org/file/1366731e13b3bc1da508f.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chuhai Tools - 独立开发者出海技术栈和工具",
    description:
      "出海第一步，搞定技术栈, 聚合全网独立开发者出海技术栈和工具, 技术出海相关的技术实践经验、合规解读、方案选型等",
    site: "https://chuhai.tools",
    images: "https://img.techrk1688.eu.org/file/1366731e13b3bc1da508f.png",
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
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <main>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </main>
      </body>
    </html>
  );
}
