/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 11:36:13
 * @FilePath: /seo/app/api/posts/all/route.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// import notion from "@/app/utils/notionClient";
import { GetPostsParams } from "@/app/types/params";
import { respData, respErr } from "@/app/utils/resp";

import { getAllPosts, getAllPostsWhioutFilter } from "@/app/services/posts";
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

    const params = await req.json();

    console.log("api router params", params);
    // const entries = await getAllPosts(params);
    const entries = await getAllPosts(params);
    console.log("get all posts: ", entries);
    return entries;
  } catch (e) {
    console.log("get all posts failed: ", e);
    const errinfo = "get posts failed" + e;
    return respErr(errinfo);
  }
}
