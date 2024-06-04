/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-07-07 16:33:57
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 12:27:28
 * @FilePath: /seo/app/sitemap.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// app/sitemap.js
// https://claritydev.net/blog/nextjs-dynamic-sitemap-pages-app-directory
import { getAllPostsWhioutFilter } from "@/app/services/posts";
import { Item, Items, Post, PageMetadata } from "@/app/types/posts";

export const revalidate = 60;

export default async function sitemap() {
  const links: string[] = [];

  const entries = await getAllPostsWhioutFilter();

  console.log("entries", entries);

  const postsData = await entries.json();
  // 如果你的数据结构不止 results，需要根据实际情况修改
  const allPosts = postsData.data.rows;

  console.log("allPosts for sitemap", allPosts);

  allPosts.map((entry: Items) => {
    links.push(
      `tools/about-${entry.properties?.Slug?.rich_text?.[0]?.plain_text}`
    );
  });

  ["privacy"].map((item) => {
    links.push(item);
  });

  // [("", "sitemap.xml", "robots.txt")].map((item) => {
  //   links.push(item);
  // });

  links.push();
  const routes = links.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
