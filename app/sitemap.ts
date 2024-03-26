/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-07-07 16:33:57
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-26 15:56:13
 * @FilePath: /seo-tools/app/sitemap.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// app/sitemap.js
// https://claritydev.net/blog/nextjs-dynamic-sitemap-pages-app-directory
import { getAllPostsWhioutFilter } from "@/app/services/gpts";
import { Item, Items, Post, PageMetadata } from "@/app/types/gpts";

const URL = "https://seo.chuhai.tools/";

export default async function sitemap() {
  const links: string[] = [];

  const entries = await getAllPostsWhioutFilter();

  console.log("entries", entries);

  const postsData = await entries.json();
  // 如果你的数据结构不止 results，需要根据实际情况修改
  const allPosts = postsData.data.rows;

  console.log("allPosts for sitemap", allPosts);

  allPosts.map((entry: Items) => {
    links.push(`tools/about-${entry.properties.Slug.rich_text[0].plain_text}`);
  });

  // [("", "sitemap.xml", "robots.txt")].map((item) => {
  //   links.push(item);
  // });

  links.push();
  const routes = links.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
