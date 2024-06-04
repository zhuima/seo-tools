/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-04-03 15:45:40
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-07 15:03:28
 * @FilePath: /web/app/api/pageview/route.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { respData, respErr } from "@/app/utils/resp";

import { getPageView } from "@/app/services/posts";

export async function POST(req: Request) {
  try {
    const params = await req.json();

    // console.log("api router params", params);
// 
    // const url,
    //   hostname,
    //   referrer = params;

    const response = await getPageView(
      params.url,
      params.hostname,
      params.referrer
    );
    return response;
  } catch (e) {
    console.log("get page view failed: ", e);
    const errinfo = "get page view failed: " + e;
    return respErr(errinfo);
  }
}
