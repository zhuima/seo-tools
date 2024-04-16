/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-04-07 14:33:31
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-16 17:41:54
 * @FilePath: /web/app/components/Home/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
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

const Home = () => {
  const [posts, setPosts] = useState<Items[]>([]);
  const [currentPostsCount, setCurrentPostsCount] = useState(0);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathname = usePathname();

  const queryKey = getKeyByValue(tabMap, searchParams.get("query"));

  const [tabValue, setTabValue] = useState(queryKey || "web开发模版");

  const postDataCache = useRef<{
    [key: string]: { data: Items[]; count: number; totalCount: number };
  }>({});

  const fetchPosts = async (tabValue: string) => {
    if (postDataCache.current[tabValue]) {
      // 如果这个标签的数据已经在 postDataCache 中，直接使用它
      setPosts(postDataCache.current[tabValue].data);
      setCurrentPostsCount(postDataCache.current[tabValue].count);
      setTotalPostsCount(postDataCache.current[tabValue].totalCount);
      return;
    }

    const params = {
      last_id: 0,
      limit: 50,
    };

    setLoading(true);
    const resp = await fetch("/api/posts/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        console.log("res data", res.data);

        res.data.rows.forEach((row: any) => {
          const tag = row.properties?.Tags?.multi_select?.[0]?.name;
          if (!postDataCache.current[tag]) {
            postDataCache.current[tag] = {
              data: [],
              count: 0,
              totalCount: res.data.totalCount,
            };
          }

          if (
            !postDataCache.current[tag].data.some(
              (item) => JSON.stringify(item) === JSON.stringify(row.properties)
            )
          ) {
            postDataCache.current[tag].data.push(row.properties);
            postDataCache.current[tag].count += 1;
          }
        });
      }
    }
    setLoading(false);

    // 设置首个标签页的数据显示
    setPosts(postDataCache.current[tabValue].data);
    setCurrentPostsCount(postDataCache.current[tabValue].count);
    setTotalPostsCount(postDataCache.current[tabValue].totalCount);
  };

  useEffect(() => {
    fetchPosts(tabValue);
  }, [tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log("home postss", posts);
  return (
    <>
      <Brand count={totalPostsCount} />
      {/* <ProductHunt /> */}
      <Search setPosts={setPosts} setLoading={setLoading} />
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
      <Tab tabValue={tabValue} setTabValue={setTabValue} />
      <PostsList posts={posts} loading={loading} />
    </>
  );
};

export default Home;
