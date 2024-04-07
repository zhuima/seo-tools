/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-07 15:03:45
 * @FilePath: /web/app/api/posts/random/route.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import { searchSamePosts } from "@/app/services/posts";

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
