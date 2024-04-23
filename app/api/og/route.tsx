/* eslint-disable @next/next/no-img-element */
/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-04-01 18:54:01
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-23 16:39:46
 * @FilePath: /seo/app/api/og/route.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { ImageResponse } from "next/og";

import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postTitle = searchParams.get("title");
  const subTitle = searchParams.get("description");

  // Fetch the Outfit font from the specified URL
  const font = await fetch(
    new URL("../../../public/fonts/outfit-semibold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  // const fontData = await font;

  // Create an ImageResponse with dynamic content

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage: `url(${process.env.NEXT_PUBLIC_WEBSITE_URL}/og-bg.png)`,
        }}
      >
        <div tw="flex">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8 ">
            <h2 tw="flex flex-col text-6xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left ml-40 text-font-bold">
              <span tw="text-white text-8xl ">About {postTitle}</span>
              <span tw="mt-10 text-yellow-300 text-6xl whitespace-normal break-all">
                {subTitle}
              </span>
            </h2>
            {/* <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                >
                  Get started
                </a>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                >
                  Learn more
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Typewriter",
          data: font,
          style: "normal",
        },
      ],
    }
  );
}
