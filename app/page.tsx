/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-01 18:26:49
 * @FilePath: /web/app/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Brand from "./components/Brand";
import { Items } from "./types/gpts";
import GptsList from "./components/GptsList";
import ProductHunt from "./components/ProductHunt";
import Search from "./components/Search";
import Tab from "./components/Tab";
import { getKeyByValue } from "./services/gpts";
import { tabMap } from "@/app/config/tabMap";

export default () => {
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
    const resp = await fetch("/api/gpts/all", {
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
          <h3>Submit your Tools 👉</h3>
        </Link>
        <span className="inline-block text-sm text-slate-300 mx-2 mt-4">|</span>
        <Link
          href="https://tally.so/r/w7WWja"
          target="_target"
          className="inline-block text-sm text-primary mx-2 mt-4"
          title="Submit your Tally for indie hacker tools"
        >
          <h3>Submit your Tally 👉</h3>
        </Link>
      </div>
      <Tab tabValue={tabValue} setTabValue={setTabValue} />
      <GptsList posts={posts} loading={loading} />
    </>
  );
};
