/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-07 15:04:00
 * @FilePath: /web/app/api/posts/tags/route.ts
//  * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// import notion from "@/app/utils/notionClient";

import { respData, respErr } from "@/app/utils/resp";

import { getAllTags } from "@/app/services/posts";
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
    // console.log("get all posts: ", allTags);
    return allTags;
  } catch (e) {
    console.log("get all posts failed: ", e);
    return respErr("get posts failed");
  }
}
