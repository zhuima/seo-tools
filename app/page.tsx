/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 19:31:30
 * @FilePath: /seo/app/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import type { Metadata, Viewport } from "next";

import Home from "@/app/components/Home";

// https://github.com/tailwindlabs/tailwindcss/issues/1193
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  let url = "https://seo.chuhai.tools";
  if (searchParams?.query) {
    url = `https://seo.chuhai.tools/?query=${searchParams?.query}`;
  }

  console.log(url, "--------------->");
  return {
    title: "Essential SEO Tools for SEO Pros in 2024",
    description:
      "SEO Awesome is a curated list of the best SEO Tools & Blogs in the internet. We are actively searching, and curating the coolest resources out there.",
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
      canonical: `${url}`,
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
      siteName: "Essential SEO Tools for SEO Pros in 2024",
      images: "https://img.techrk1688.eu.org/file/8c2f2fb7364e861288426.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "Essential SEO Tools for SEO Pros in 2024",
      description: "Essential SEO Tools for SEO Pros in 2024",
      site: "https://seo.chuhai.tools",
      images: "https://img.techrk1688.eu.org/file/8c2f2fb7364e861288426.jpg",
    },
  };
}

export default async () => {
  return <Home />;
};
