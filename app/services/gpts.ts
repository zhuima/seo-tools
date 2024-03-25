import notion from "@/app/utils/notionClient";
import { Items } from "@/app/types/gpts";
import { respData, respErr } from "@/app/utils/resp";
import { Tags } from "../types/tags";
import { Gpts } from "../types/gpts";
import { GetPostsParams } from "../types/params";
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
  });
  const allPosts = posts.results;

  return respData({
    rows: allPosts,
    count: allPosts.length,
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
    console.log("request gpts search failed: ", e);
    throw e; // Rethrow the error to allow the calling function to handle it
  }
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
    console.log("request gpts search failed: ", e);
    throw e; // Rethrow the error to allow the calling function to handle it
  }
};
// export const getGptsFromFile = async (): Promise<Gpts[]> => {
//   try {
//     const dataFile = process.env.GPTS_DATA_FILE;
//     if (!dataFile) {
//       return [];
//     }

//     const data = fs.readFileSync(dataFile, "utf8");
//     const jsonData = JSON.parse(data);

//     let gpts: Gpts[] = [];
//     jsonData.map((v: any) => {
//       gpts.push({
//         uuid: v["data"]["gizmo"]["id"],
//         org_id: v["data"]["gizmo"]["organization_id"],
//         name: v["data"]["gizmo"]["display"]["name"],
//         description: v["data"]["gizmo"]["display"]["description"],
//         avatar_url: v["data"]["gizmo"]["display"]["profile_picture_url"],
//         short_url: v["data"]["gizmo"]["short_url"],
//         author_id: v["data"]["gizmo"]["author"]["user_id"],
//         author_name: v["data"]["gizmo"]["author"]["display_name"],
//         created_at: v["created_at"],
//         updated_at: v["data"]["gizmo"]["updated_at"],
//         detail: JSON.stringify(v),
//         properties: undefined,
//         id: undefined,
//       });
//     });

//     return gpts;
//   } catch (err) {
//     console.error("Error loading JSON file:", err);
//     return [];
//   }
// };

export const searchGpts = async (question: string): Promise<Gpts[]> => {
  const uri = `${process.env.INDEX_API_BASE_URI}/gpts/search`;
  const data = {
    question: question,
  };

  try {
    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INDEX_API_KEY}`,
      },
      body: JSON.stringify(data),
    });
    const res = await resp.json();
    if (res.data) {
      return res.data.filter((gpts: Gpts) => !isGptsSensitive(gpts));
    }
  } catch (e) {
    console.log("request gpts search failed: ", e);
  }

  return [];
};

export function isGptsSensitive(gpts: Gpts): boolean {
  const sensitiveKeywords = process.env.SENSITIVE_KEYWORDS || "";
  const keywordsArr = sensitiveKeywords.split(",");
  for (let i = 0, l = keywordsArr.length; i < l; i++) {
    const keyword = keywordsArr[i].trim();
    if (
      (gpts.name && gpts.name.includes(keyword)) ||
      (gpts.author_name && gpts.author_name.includes(keyword)) ||
      (gpts.description && gpts.description.includes(keyword))
    ) {
      console.log("gpt is sensitive: ", gpts.uuid, gpts.name, keyword);
      return true;
    }
  }

  return false;
}

export function gptGptsPromptStarters(gpts: Gpts): string[] | undefined {
  if (gpts.detail) {
    try {
      const v = gpts.detail;
      return v["data"]["gizmo"]["display"]["prompt_starters"];
    } catch (e) {
      console.log("parse gpts detail failed: ", e);
    }
  }

  return;
}

export function getGptsWelcomeMessage(gpts: Gpts): string | undefined {
  if (gpts.detail) {
    try {
      const v = gpts.detail;
      return v["data"]["gizmo"]["display"]["welcome_message"];
    } catch (e) {
      console.log("parse gpts detail failed: ", e);
    }
  }

  return;
}

export function getGptsTools(gpts: Gpts): string[] | undefined {
  if (gpts.detail) {
    try {
      const v = gpts.detail;
      let tools: string[] = [];
      v["data"]["tools"].forEach((tool: any) => {
        tools.push(tool["type"]);
      });
      return tools;
    } catch (e) {
      console.log("parse gpts detail failed: ", e);
    }
  }

  return;
}
