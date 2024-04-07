import notion from "@/app/utils/notionClient";
import { NotionToMarkdown } from "notion-to-md";

import { Item, Items, Post, PageMetadata } from "@/app/types/posts";
import { respData, respErr } from "@/app/utils/resp";
import { Tags } from "@/app/types/tags";
import { GetPostsParams } from "@/app/types/params";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { tabMap } from "@/app/config/tabMap";

const n2m = new NotionToMarkdown({ notionClient: notion });
// 函数用于获取数据库中的所有条目
export const getAllPosts = async (params: GetPostsParams) => {
  let allItems: any[] = [];
  let cursor: string | null | undefined = undefined;
  const databaseId = process.env.DATABASE_ID || "DEFAULT_DATABASE_ID"; // 使用默认值

  console.log("server params", params);
  const posts = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Tags",
          multi_select: {
            contains: params.tab,
          },
        },
        {
          property: "Tags",
          multi_select: {
            is_not_empty: true,
          },
        },
      ],
    },

    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });
    // Append current page's results to the array
    allItems = allItems.concat(response.results);

    // Update cursor for the next page
    cursor = response.next_cursor;
  } while (cursor);

  const allPosts = posts.results;

  return respData({
    rows: allPosts,
    count: allPosts.length,
    // totalCount: totalCount.results.length,
    totalCount: allItems.length,
  });
};

export const getAllPostsWhioutFilter = async () => {
  const databaseId = process.env.DATABASE_ID || "DEFAULT_DATABASE_ID"; // 使用默认值
  let allItems: any[] = [];
  let cursor: string | null | undefined = undefined;

  do {
    const posts = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          { property: "Title", rich_text: { is_not_empty: true } },
          {
            property: "Tags",
            multi_select: {
              is_not_empty: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      start_cursor: cursor, // 在此使用 cursor
    });

    // const response = await notion.databases.query({
    //   database_id: databaseId,
    //   start_cursor: cursor,
    // });
    // Append current page's results to the array
    allItems = allItems.concat(posts.results);

    // Update cursor for the next page
    cursor = posts.next_cursor;
  } while (cursor);

  return respData({
    rows: allItems,
    count: allItems.length,
  });
};

// 函数用于从数据库条目中收集所有标签// 函数用于从数据库条目中收集所有标签
export const getAllTags = async () => {
  const entries = await getAllPostsWhioutFilter();
  // const allTags = new Set<string>();
  // 创建一个 Set 来存储标签名称
  const uniqueTagNames = new Set<string>();
  const allTags: Tags[] = [];

  const postsData = await entries.json();
  // 如果你的数据结构不止 results，需要根据实际情况修改
  const allPosts = postsData.data.rows;

  allPosts.forEach((entry: Items) => {
    const tagsProperty = entry.properties.Tags;

    // if (tagsProperty && tagsProperty.multi_select) {
    //   tagsProperty.multi_select.forEach((tag) => {
    //     allTags.add(tag.name);
    //   });

    tagsProperty.multi_select.forEach((tag: any) => {
      // const tagObject: Tags = {
      //   id: tag.id,
      //   name: tag.name,
      //   color: tag.color,
      // };
      // allTags.push(tagObject);

      // 检查标签名称是否已经存在于 Set 中，如果不存在，则将其添加到 Set 和 tagsArray 中
      if (!uniqueTagNames.has(tag.name)) {
        uniqueTagNames.add(tag.name);

        // 将标签转换成目标接口 Tags 的对象，并添加到 tagsArray 中
        const tagObject: Tags = {
          id: tag.id,
          name: tag.name,
          color: tag.color,
        };
        allTags.push(tagObject);
      }
    });
  });

  return respData({
    rows: Array.from(allTags),
    count: allTags.length,
  });
};

export const searchPosts = async (question: string) => {
  try {
    console.log("question", question);
    const databaseId = process.env.DATABASE_ID || "DEFAULT_DATABASE_ID"; // 使用默认值

    const posts = await notion.databases.query({
      database_id: databaseId,
      // filter_properties: ["Title", "Tags", "Description"],
      filter: {
        or: [
          {
            property: "Tags",
            multi_select: {
              contains: question,
            },
          },
          {
            property: "Title",
            title: {
              contains: question,
            },
          },
          {
            property: "Description",
            rich_text: {
              contains: question,
            },
          },
        ],
      },

      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const totalCount = await notion.databases.query({
      database_id: databaseId,
    });

    const allPosts = posts.results;

    console.log("allposts", posts);
    return respData({
      rows: allPosts,
      count: allPosts.length,
      totalCount: totalCount.results.length,
    });
  } catch (e) {
    console.log("request posts search failed: ", e);
    throw e; // Rethrow the error to allow the calling function to handle it
  }
};

export async function findByUuid(uuid: string): Promise<Items | undefined> {
  const res = await notion.pages.retrieve({ page_id: uuid });
  return res as Items | undefined;
}

export async function findBySlug(slug: string): Promise<Post | undefined> {
  const databaseId = process.env.DATABASE_ID || "DEFAULT_DATABASE_ID"; // 使用默认值
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  // 假设只有一个页面匹配slug，否则根据实际情况处理响应
  const page = response.results[0] as Item;

  console.log("page ----> server", page);
  if (page) {
    const postId = page.id; // 页面ID

    // const metadata = {
    //   id: page.id,
    //   lastEditTime: page?.last_edited_time,
    //   title: page.properties.Title.title[0]?.plain_text,
    //   description: page.properties.Description.rich_text[0].plain_text,
    //   link: page.properties.Link.url,
    //   tags: page.properties.Tags.multi_select[0].name,
    // };
    const metadata = getPageMetaData(page);
    const mdblocks = await n2m.pageToMarkdown(postId);
    console.log("Markdown Content:", mdblocks);

    const mdString = n2m.toMarkdownString(mdblocks);
    return {
      metadata,
      markdown: mdString,
    };
  }
}

const getPageMetaData = (post: Item): PageMetadata => {
  return {
    id: post.id,
    lastEditTime: post.last_edited_time,
    slug: post.properties.Slug?.rich_text?.[0]?.plain_text,
    title: post.properties.Title?.title?.[0]?.plain_text,
    description: post.properties.Description?.rich_text?.[0]?.plain_text,
    link: post.properties.Link?.url,
    tags: post.properties.Tags?.multi_select?.[0]?.name,
  };
};

export const searchSamePosts = async (tags: string) => {
  try {
    console.log("question", tags);
    const databaseId = process.env.DATABASE_ID || "DEFAULT_DATABASE_ID"; // 使用默认值

    const posts = await notion.databases.query({
      database_id: databaseId,
      // filter_properties: ["Title", "Tags", "Description"],
      filter: {
        or: [
          {
            property: "Tags",
            multi_select: {
              contains: tags,
            },
          },
        ],
      },

      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const totalCount = await notion.databases.query({
      database_id: databaseId,
    });

    const allPosts = posts.results;

    console.log("allposts", posts);
    return respData({
      rows: allPosts,
      count: allPosts.length,
      totalCount: totalCount.results.length,
    });
  } catch (e) {
    console.log("request posts search failed: ", e);
    throw e; // Rethrow the error to allow the calling function to handle it
  }
};

// 获取值对应的键的函数
// 获取值对应的键的函数
export function getKeyByValue(
  object: typeof tabMap,
  value: string | null
): string | undefined {
  if (value === null) {
    return undefined;
  }
  return Object.keys(object).find((key) => object[key] === value);
}

export function getPageView(url: string, hostname: string, referrer: string) {
  return fetch("https://analytics.chuhai.tools/api/visit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      hostname,
      referrer,
      pv: true,
      uv: true,
    }),
  });
}
