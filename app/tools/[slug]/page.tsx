/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-23 16:30:06
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
    title:
      `${post?.metadata.title} - SEO Tools - Awesome Hackers Tools` ||
      "SEO Tools - Awesome Hackers Tools",
    description:
      post?.metadata.description ||
      "收集全网最全的SEO工具，助力运营人员和独立开发者",
    keywords: [post?.metadata.description] || [
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
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: `about ${post?.metadata.title}`,
      description: post?.metadata.description,
      url: "https://seo.chuhai.tools/about-" + post?.metadata.slug,
      siteName: post?.metadata.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&${post?.metadata.description}`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&${post?.metadata.description}`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: `about ${post?.metadata.title} for SEO Tools - Awesome Hackers Tools`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `about ${post?.metadata.title}`,
      description: post?.metadata.description,
      site: "https://seo.chuhai.tools/about-" + post?.metadata.slug,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&${post?.metadata.description}`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${post?.metadata.title}&${post?.metadata.description}`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: `about ${post?.metadata.title} for SEO Tools - Awesome Hackers Tools`,
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
