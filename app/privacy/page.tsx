/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-05-27 14:37:43
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 18:06:52
 * @FilePath: /seo/app/privacy/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "private policy | Essential SEO Tools for SEO Pros in 2024",
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
    canonical: "https://seo.chuhai.tools/privacy",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Essential SEO Tools for SEO Pros in 2024",
    description: "private policy for seo.chuhai.tools. ",
    type: "website",
    url: "https://seo.chuhai.tools/privacy",
    siteName: "Awesome Hackers Tools",
    images: "https://img.techrk1688.eu.org/file/8c2f2fb7364e861288426.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Essential SEO Tools for SEO Pros in 2024",
    description: "private policy for seo.chuhai.tools. ",
    site: "https://seo.chuhai.tools/privacy",
    images: "https://img.techrk1688.eu.org/file/8c2f2fb7364e861288426.jpg",
  },
};

export default async () => {
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-5  md:px-10 md:py-6 lg:py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          private policy for Essential SEO Tools for SEO Pros in 2024
        </h1>
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          last updated: May 27, 2024
        </p>
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          This Privacy Policy describes our policies and procedures for
          collecting, using, and disclosing your information when you use the
          Service, and informs you about your privacy rights and how the law
          protects you.
        </p>
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          We use your personal data to provide and improve the Service. By using
          the Service, you agree to the collection and use of information in
          accordance with this Privacy Policy. This Privacy Policy was created
          with the help of the Free Privacy Policy Generator.
        </p>
        <h2 className="mb-4 text-2xl font-bold">
          1. About Information Collection
        </h2>{" "}
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          {" "}
          This site does not collect any personal information.{" "}
        </p>{" "}
        <h2 className="mb-4 text-2xl font-bold">2. Contact Us</h2>{" "}
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          {" "}
          By visiting this page on our website:{" "}
          <Link href="https://tally.so/r/w7WWja">Feedback</Link>{" "}
        </p>
      </div>
    </section>
  );
};
