/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-18 11:16:32
 * @FilePath: /gpts-works/web/app/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";

import { useEffect, useState } from "react";
import Brand from "./components/Brand";
import { Items } from "./types/gpts";
import GptsList from "./components/GptsList";
import ProductHunt from "./components/ProductHunt";
import Search from "./components/Search";
import Tab from "./components/Tab";

export default () => {
  const [posts, setPosts] = useState<Items[]>([]);
  const [currentPostsCount, setCurrentPostsCount] = useState(0);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState("前端");

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
      <Tab tabValue={tabValue} setTabValue={setTabValue} />
      <GptsList posts={posts} loading={loading} />
    </>
  );
};
