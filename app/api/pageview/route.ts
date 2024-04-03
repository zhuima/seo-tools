import { respData, respErr } from "@/app/utils/resp";

import { getPageView } from "@/app/services/gpts";

export async function POST(req: Request) {
  try {
    const params = await req.json();

    console.log("api router params", params);

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
