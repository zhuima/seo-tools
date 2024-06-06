/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-04-07 14:33:31
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-06 16:27:08
 * @FilePath: /seo/app/components/Home/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import { useCallback, useRef } from "react";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Brand from "@/app/components/Brand";
import Search from "@/app/components/Search";

import { Item, Items } from "@/app/types/posts";
import { getKeyByValue } from "@/app/services/posts";
import { tabMap } from "@/app/config/tabMap";
import PostsList from "@/app/components/PostsList";
import Tab from "@/app/components/Tab";
import ProductHunt from "@/app/components/ProductHunt";

const getAllPosts = async () => {
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`;

  const params = {
    last_id: 0,
    limit: 50,
    tab: "On Page SEO",
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const res = await resp.json();

  return res;
};

const Home = async () => {
  const entries = await getAllPosts();

  console.log("entries", entries);

  // 如果你的数据结构不止 results，需要根据实际情况修改
  const allPosts = entries.data.rows;
  const totalPostsCount = entries.data.totalCount;

  console.log("home page allPosts", allPosts);

  return (
    <>
      <Brand count={totalPostsCount} />
      <ProductHunt />
      <Search />
      <div className="flex flex-row md:flex-row items-center justify-center mx-auto text-center">
        <Link
          href="https://tally.so/r/mYOZMB"
          target="_target"
          className="inline-block text-sm text-orange-500 fond-bold mx-2 mt-4"
          title="Submit your Tools for Essential SEO Tools for SEO Pros in 2024"
        >
          <h2>Submit your Tools 👉</h2>
        </Link>
        <span className="inline-block text-sm text-slate-300 mx-2 mt-4">|</span>
        <Link
          href="https://tally.so/r/w7WWja"
          target="_target"
          className="inline-block text-sm text-orange-500 fond-bold mx-2 mt-4"
          title="Submit your Tally for Essential SEO Tools for SEO Pros in 2024"
        >
          <h2>Submit your Tally 👉</h2>
        </Link>
      </div>
      <Tab selectedTag="all-in-one-seo-tool" />
      <PostsList posts={allPosts} loading={false} />
    </>
  );
};

export default Home;
