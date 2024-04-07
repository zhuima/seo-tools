import { respData, respErr } from "@/app/utils/resp";

import { searchPosts } from "@/app/services/posts";

export async function POST(req: Request) {
  try {
    const params = await req.json();

    console.log("api router params", params);

    const question = params.question;
    // const posts = await searchPosts(question);
    // return respData({ data: posts });

    const posts = await searchPosts(question);
    console.log("search all posts: ", posts);
    return posts;
  } catch (e) {
    console.log("search all posts failed: ", e);
    const errinfo = "search posts failed" + e;
    return respErr(errinfo);
  }
  // const vectorData = await searchPosts(question);
  // console.log("vectorData", vectorData);

  // // const data = mergeArraysUnique(dbData, vectorData);

  // return respData(vectorData);
}

function mergeArraysUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}
