/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-07-07 16:33:57
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-19 14:47:52
 * @FilePath: /gpts-works/web/app/sitemap.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// app/sitemap.js
// https://claritydev.net/blog/nextjs-dynamic-sitemap-pages-app-directory

const URL = "https://search.chuhai.tools/";

export default async function sitemap() {
  const links: string[] = [];

  ["", "sitemap.xml", "robots.txt"].map((item) => {
    links.push(item);
  });

  links.push();
  const routes = links.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
