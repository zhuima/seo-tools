/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-26 10:27:35
 * @FilePath: /web/app/tools/[slug]/page.tsx
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
  // read route params
  if (!post) {
    return {
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
  }
  return {
    title: `Chuhai Tools - ${post.metadata.title}`,
    description: post.metadata.description,
    alternates: {
      canonical: "https://chuhai.tools/about-" + post.metadata.slug,
    },
    openGraph: {
      title: `about-${post.metadata.title}`,
      description: post.metadata.description,
      type: "website",
      url: "https://chuhai.tools/about-" + post.metadata.slug,
      siteName: post.metadata.title,
      images: "https://img.techrk1688.eu.org/file/1366731e13b3bc1da508f.png",
    },
    twitter: {
      card: "summary_large_image",
      title: `about-${post.metadata.title}`,
      description: post.metadata.description,
      site: "https://chuhai.tools/about-" + post.metadata.slug,
      images: "https://img.techrk1688.eu.org/file/1366731e13b3bc1da508f.png",
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
