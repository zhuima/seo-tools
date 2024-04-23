/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-19 15:11:08
 * @FilePath: /gpts-works/web/app/api/gpts/random/route.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import { searchSamePosts } from "@/app/services/gpts";

export async function POST(req: Request) {
  try {
    const params = await req.json();

    console.log("api router params", params);

    const tags = params.tags;

    const posts = await searchSamePosts(tags);

    console.log("search all posts: ", posts);
    return posts;
  } catch (e) {
    console.log("get same posts failed: ", e);
    return Response.json({
      code: -1,
      message: "failed",
    });
  }
}
