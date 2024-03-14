/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-14 14:57:31
 * @FilePath: /gpts-works/web/app/api/gpts/all/route.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

import { respData, respErr } from "@/app/utils/resp";

export async function POST(req: Request) {
  try {
    const posts = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });
    const allPosts = posts.results;

    return respData({
      rows: allPosts,
      count: allPosts.length,
    });
  } catch (e) {
    console.log("get all gpts failed: ", e);
    return respErr("get gpts failed");
  }
}

// const getPageMetaData = (post) => {
//   const getTags = (tags) => {
//     const allTags = tags.map((tag) => tag.name);
//     return allTags;
//   };
//   return {
//     id: post.id,
//     title: post.properties.Title.title[0].plain_text,
//     tags: getTags(post.properties.Tags.multi_select),
//     description: post.properties.Description.rich_text[0].plain_text,
//     date: getToday(post.properties.Date.last_edited_time),
//     slug: post.properties.Slug.rich_text[0].plain_text,
//   };
// };
