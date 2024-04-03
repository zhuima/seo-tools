/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-03 16:53:44
 * @FilePath: /seo-tools/app/tools/[slug]/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";

import type { Metadata, ResolvingMetadata } from "next";

import { BsDownload } from "react-icons/bs";
import { Items } from "@/app/types/gpts";
import GptsDetail from "@/app/components/GptsDetail";
import Image from "next/image";
import extensionSrc from "@/public/extension.png";
// import { findByUuid } from "@/app/models/gpts";

import { findBySlug } from "@/app/services/gpts";
async function getData(slug: string) {
  if (!slug) {
    return;
  }

  const post = await findBySlug(slug);

  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug.split("about-")[1];

  const post = await getData(slug);
  if (!post) return {};
  // read route params
  // if (!post) {
  //   return {
  //     title: "SEO Tools - Awesome Hackers Tools ",
  //     description: "收集全网最全的SEO工具，助力运营人员和独立开发者",
  //     keywords: [
  //       "技术出海",
  //       "工具出海",
  //       "品牌出海",
  //       "独立开发者",
  //       "科技出海",
  //       "独立开发者出海技术栈和工具",
  //       "独立开发者出海工具",
  //       "独立开发者出海技术栈",
  //       "出海营销",
  //       "独立开发者出海",
  //       "独立开发者出海业务",
  //       "面向海外用户开发产品",
  //       "出海第一步，搞定工具库",
  //     ],
  //     // alternates: {
  //     //   canonical: "https://seo.chuhai.tools",
  //     // },
  //     icons: {
  //       icon: "/favicon.ico",
  //       shortcut: "/favicon-16x16.ico",
  //       apple: "/apple-touch-icon.png",
  //     },
  //     openGraph: {
  //       title: "SEO Tools - Awesome Hackers Tools ",
  //       description: "收集全网最全的SEO工具，助力运营人员和独立开发者",
  //       type: "website",
  //       url: "https://seo.chuhai.tools",
  //       siteName: "SEO Tools - Awesome Hackers Tools ",
  //       images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
  //     },
  //     twitter: {
  //       card: "summary_large_image",
  //       title: "SEO Tools - Awesome Hackers Tools ",
  //       description: "收集全网最全的SEO工具，助力运营人员和独立开发者",
  //       site: "https://seo.chuhai.tools",
  //       images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
  //     },
  //   };
  // }
  return {
    title: `${post.metadata.title} - SEO Tools - Awesome Hackers Tools `,
    description: post.metadata.description,
    // alternates: {
    //   canonical: "https://chuhai.tools/about-" + post.metadata.slug,
    // },
    keywords: [post.metadata.description],
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: `about-${post.metadata.title}`,
      description: post.metadata.description,
      type: "website",
      url: "https://seo.chuhai.tools/about-" + post.metadata.slug,
      siteName: post.metadata.title,
      images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
    },
    twitter: {
      card: "summary_large_image",
      title: `about-${post.metadata.title}`,
      description: post.metadata.description,
      site: "https://seo.chuhai.tools/about-" + post.metadata.slug,
      images: "https://img.techrk1688.eu.org/file/58063a1b4aa5756c5aff2.png",
    },
  };
}

export default async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug.split("about-")[1];

  const post = await getData(slug);

  console.log("post data", post);

  // console.log("post", post.properties?.Title.title[0].plain_text);
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {post && <GptsDetail post={post} />}
      </div>
    </section>
  );
};
