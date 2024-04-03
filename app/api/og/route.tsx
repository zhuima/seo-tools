/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-04-01 18:54:01
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-03 10:13:32
 * @FilePath: /web/app/api/og/route.tsx
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

  // Fetch the Outfit font from the specified URL
  const font = fetch(
    new URL("../../../public/fonts/outfit-semibold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontData = await font;

  // Create an ImageResponse with dynamic content

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          // backgroundImage: `url("https://img.techrk1688.eu.org/file/6c5b63f380ba8dacab288.png")`,
          backgroundImage: `url(${process.env.NEXT_PUBLIC_WEBSITE_URL}/og-bg.png)`,
          // backgroundSize: "cover",
          // backgroundSize: "100% 100%",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: "flex",
            fontSize: 100,
            fontFamily: "Outfit",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
            // justifyContent: "flex-start",
            // flexWrap: "wrap",
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Outfit",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
