/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-04-07 14:33:31
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-07 16:29:25
 * @FilePath: /web/app/components/Home/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Brand from "@/app/components/Brand";
import Search from "@/app/components/Search";

import { Items } from "@/app/types/posts";
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

  const queryKey = getKeyByValue(tabMap, searchParams.get("query"));

  const [tabValue, setTabValue] = useState(queryKey || "web开发模版");

  const fetchPosts = async (tab: string) => {
    const params = {
      last_id: 0,
      limit: 50,
      tab: tab,
    };

    console.log("tab ----:", tab);
    setLoading(true);
    const resp = await fetch("/api/posts/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    setLoading(false);

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        setCurrentPostsCount(res.data.count);
        setTotalPostsCount(res.data.totalCount);
        setPosts(res.data.rows);
      }
    }
  };

  useEffect(() => {
    fetchPosts(tabValue);
  }, [tabValue]);

  return (
    <>
      <Brand count={totalPostsCount} />
      {/* <ProductHunt /> */}
      <Search setPosts={setPosts} setLoading={setLoading} />
      <div className="flex flex-row md:flex-row items-center justify-center mx-auto text-center">
        <Link
          href="https://github.com/weijunext/indie-hacker-tools"
          target="_target"
          className="inline-block text-sm text-primary mx-2 mt-4"
          title="Submit your Tools for indie hacker tools"
        >
          <h2>Submit your Tools 👉</h2>
        </Link>
        <span className="inline-block text-sm text-slate-300 mx-2 mt-4">|</span>
        <Link
          href="https://tally.so/r/w7WWja"
          target="_target"
          className="inline-block text-sm text-primary mx-2 mt-4"
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
