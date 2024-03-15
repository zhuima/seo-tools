/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-15 14:44:07
 * @FilePath: /gpts-works/web/app/api/gpts/all/route.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// import notion from "@/app/utils/notionClient";

import { respData, respErr } from "@/app/utils/resp";

import { getAllTags } from "@/app/services/gpts";
export async function POST(req: Request) {
  try {
    // const databaseId = process.env.DATABASE_ID || "DEFAULT_DATABASE_ID"; // 使用默认值

    // const posts = await notion.databases.query({
    //   database_id: databaseId,
    //   sorts: [
    //     {
    //       property: "Date",
    //       direction: "descending",
    //     },
    //   ],
    // });
    // const allPosts = posts.results;

    // return respData({
    //   rows: allPosts,
    //   count: allPosts.length,
    // });
    const allTags = await getAllTags();
    console.log("get all posts: ", allTags);
    return allTags;
  } catch (e) {
    console.log("get all posts failed: ", e);
    return respErr("get posts failed");
  }
}
