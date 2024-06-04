/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 12:31:37
 * @FilePath: /seo/app/tools/[slug]/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";

import type { Metadata, ResolvingMetadata } from "next";
import { usePathname } from "next/navigation";
import { BsDownload } from "react-icons/bs";
import { Items } from "@/app/types/posts";
import PostsDetail from "@/app/components/PostsDetail";
import Image from "next/image";
import extensionSrc from "@/public/extension.png";
import { findBySlug, getAllSlugs } from "@/app/services/posts";
async function getData(slug: string) {
  if (!slug) {
    return;
  }
  const post = await findBySlug(slug);
  return post;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: `about-${slug}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug.split("about-")[1];
  const post = await getData(slug);

  if (!post) return {};

  return {
    title: `${post?.metadata.title} | Essential SEO Tools for SEO Pros in 2024`,
    description:
      "seo.chuhai.tools offers comprehensive online SEO analysis tools to boost website rankings. It includes a wide range of SEO tools such as keyword research, website auditing, link analysis, and more, tailored for professional SEO experts and website owners. Quickly detect website health issues, identify and fix SEO problems, and improve search engine visibility. Free to use, with real-time analysis reports, this platform is your ultimate companion for website SEO optimization.",
    keywords: [post?.metadata.description] || [
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
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: `${post?.metadata.title} | Essential SEO Tools for SEO Pros in 2024`,
      description: post?.metadata.description,
      url: "https://seo.chuhai.tools/about-" + post?.metadata.slug,
      siteName: post?.metadata.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&description=${post?.metadata.description}`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&description=${post?.metadata.description}`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: `${post?.metadata.title} for Essential SEO Tools for SEO Pros in 2024`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: ` ${post?.metadata.title} | Essential SEO Tools for SEO Pros in 2024`,
      description: post?.metadata.description,
      site: "https://seo.chuhai.tools/about-" + post?.metadata.slug,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&description=${post?.metadata.description}`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&description=${post?.metadata.description}`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: `${post?.metadata.title} for Essential SEO Tools for SEO Pros in 2024`,
        },
      ],
    },

    // twitter: {
    //   card: "summary_large_image",
    //   title: `about-${post.metadata.title}`,
    //   description: post.metadata.description,
    //   site: "https://chuhai.tools/about-" + post.metadata.slug,
    //   images: "https://img.techrk1688.eu.org/file/1366731e13b3bc1da508f.png",
    // },
  };
}

export default async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug.split("about-")[1];

  const post = await getData(slug);

  console.log("post data", post);

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {post && <PostsDetail post={post} />}
      </div>
    </section>
  );
};
