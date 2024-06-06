import Link from "next/link";
import React from "react";
import Brand from "@/app/components/Brand";
import Search from "@/app/components/Search";
import {
  getAllPostsWhioutFilter,
  getKeyByValue,
  searchPosts,
  searchPostsByTag,
} from "@/app/services/posts";
import { tabMap } from "@/app/config/tabMap";
import PostsList from "@/app/components/PostsList";
import Tab from "@/app/components/Tab";
import { Tags } from "@/app/types/tags";
import { Metadata } from "next";
import { Items, Posts } from "@/app/types/posts";
import ProductHunt from "@/app/components/ProductHunt";

export async function generateStaticParams() {
  return Object.entries(tabMap).map(([key, value]) => ({
    slug: value, // 或者根据你实际需要的属性做调整
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const tabName = getKeyByValue(tabMap, slug) || "All in One SEO";
  if (!slug) return {};

  return {
    title: `${tabName} | Essential SEO Tools for SEO Pros in 2024`,
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
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.ico",
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: "https://seo.chuhai.tools/categories/" + slug,
    },
    openGraph: {
      title: `${tabName} | Essential SEO Tools for SEO Pros in 2024`,
      description:
        "seo.chuhai.tools offers comprehensive online SEO analysis tools to boost website rankings. It includes a wide range of SEO tools such as keyword research, website auditing, link analysis, and more, tailored for professional SEO experts and website owners. Quickly detect website health issues, identify and fix SEO problems, and improve search engine visibility. Free to use, with real-time analysis reports, this platform is your ultimate companion for website SEO optimization.",
      url: "https://seo.chuhai.tools/categories/" + slug,
      siteName: `${tabName}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${tabName}&description="Essential SEO Tools for SEO Pros in 2024"`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${tabName}&description="Essential SEO Tools for SEO Pros in 2024"`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: `${tabName}for Essential SEO Tools for SEO Pros in 2024`,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: ` ${tabName} | Essential SEO Tools for SEO Pros in 2024`,
      description:
        "seo.chuhai.tools offers comprehensive online SEO analysis tools to boost website rankings. It includes a wide range of SEO tools such as keyword research, website auditing, link analysis, and more, tailored for professional SEO experts and website owners. Quickly detect website health issues, identify and fix SEO problems, and improve search engine visibility. Free to use, with real-time analysis reports, this platform is your ultimate companion for website SEO optimization.",
      site: "https://seo.chuhai.tools/categories/" + slug,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=$${tabName}&description="Essential SEO Tools for SEO Pros in 2024"`, // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=$${tabName}&description="Essential SEO Tools for SEO Pros in 2024"`, // Dynamic og route
          width: 1800,
          height: 1600,
          alt: `${tabName} for Essential SEO Tools for SEO Pros in 2024`,
        },
      ],
    },

    // twitter: {
    //   card: "summary_large_image",
    //   title: `about-${post.metadata.title}`,
    //   description: post.metadata.description,
    //   site: "https://chuhai.categories/" + post.metadata.slug,
    //   images: "https://img.techrk1688.eu.org/file/1366731e13b3bc1da508f.png",
    // },
  };
}

async function getData(slug: string): Promise<Posts> {
  // console.log("gpts slug:", slug);

  let question: string = "";

  if (slug.startsWith("query-")) {
    question = decodeURIComponent(slug.replace("query-", ""));
    // console.log("currentSlug", currentSlug);
    const postsWithSlug = await searchPosts(question);

    const postsData = await postsWithSlug.json();

    // 如果你的数据结构不止 results，需要根据实际情况修改
    // const posts = postsData.data.rows;
    // const totalPostsCount = postsData.data.count;
    // console.log("posts ----< search", posts, question);
    return postsData;
  }

  console.log("slug:", slug);
  const tabName = getKeyByValue(tabMap, slug) || "All in One SEO";

  const postsWithSlug = await searchPostsByTag(tabName);

  const postsData = await postsWithSlug.json();

  // 如果你的数据结构不止 results，需要根据实际情况修改
  // const posts = postsData.data.rows;
  return postsData;
}

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const currentSlug = params.slug || "all-in-one-seo-tool";

  const postsData = await getData(currentSlug);

  const posts = postsData.data.rows;
  const totalPostsCount = postsData.data.count;
  // const entries = await getAllPostsWhioutFilter();

  // console.log("entries", entries);

  // const countsData = await entries.json();
  // 如果你的数据结构不止 results，需要根据实际情况修改
  // const totalPostsCount = posts.data.count;

  console.log("currentSlug from categories", currentSlug);
  // 涉及到搜索的时候
  let query = "";
  if (currentSlug.startsWith("query-")) {
    query = decodeURIComponent(currentSlug.replace("query-", ""));
  }

  return (
    <>
      <Brand count={totalPostsCount} />
      <ProductHunt />
      <Search query={query} />
      <div className="flex flex-row md:flex-row items-center justify-center mx-auto text-center">
        <Link
          href="https://github.com/weijunext/indie-hacker-tools"
          target="_target"
          className="inline-block text-sm text-orange-500 mx-2 mt-4"
          title="Submit your Tools for indie hacker tools"
        >
          <h2>Submit your Tools 👉</h2>
        </Link>
        <span className="inline-block text-sm text-slate-300 mx-2 mt-4">|</span>
        <Link
          href="https://tally.so/r/w7WWja"
          target="_target"
          className="inline-block text-sm text-orange-500 mx-2 mt-4"
          title="Submit your Tally for indie hacker tools"
        >
          <h2>Submit your Tally 👉</h2>
        </Link>
      </div>
      <Tab selectedTag={currentSlug} />
      <PostsList posts={posts} loading={false} />
    </>
  );
};

export default CategoryPage;
