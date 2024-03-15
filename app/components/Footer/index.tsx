/* eslint-disable @next/next/no-img-element */
/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-15 13:46:13
 * @FilePath: /gpts-works/web/app/components/Footer/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import Link from "next/link";

export default () => {
  return (
    // <footer className="block">
    //   <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
    //     <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
    //       <div className="max-[767px]: w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial">
    //         <h2 className="text-3xl font-bold md:text-5xl">
    //           Find fantastic indie hacker tools all over the world.
    //         </h2>
    //       </div>
    //     </div>
    //     <div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)]"></div>
    //     <div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
    //       <div className="max-[991px]: text-center font-semibold max-[991px]:py-1 max-[479px]:mb-4 sm:text-center">
    //         Credit to
    //         <a
    //           href="https://chuhai.tools/"
    //           className="inline-block mx-2 py-1.5 pr-6 font-normal text-[#276EF1] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
    //           target="_blank"
    //         >
    //           Chuhai Tools
    //         </a>
    //       </div>
    //       <div className="max-[991px]:flex-none">
    //         <p className="text-[#636262] max-[479px]:text-sm">
    //           {" "}
    //           © Copyright 2024 By Zhuima. All rights reserved.{" "}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer className="block">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
          <div className="max-[767px]: w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial">
            <p className="text-lg md:text-3xl font-normal md:leading-relaxed">
              Find fantastic indie hacker tools all over the world.
            </p>
          </div>
        </div>
        <div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)]"></div>
        <div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
          <div className="max-[991px]: text-left font-semibold max-[991px]:py-1 max-[479px]:mb-4">
            <p>Credit to</p>
            <p>
              <Link
                href="https://www.gptshunter.com/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                GPTsHunter
              </Link>
            </p>
          </div>
          <div className="max-[991px]: text-left font-semibold max-[991px]:py-1 max-[479px]:mb-4">
            <p>Friends</p>
            <p>
              <Link
                href="https://gptalk.net/chat/new"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                GPTalk
              </Link>
            </p>
            <p>
              <Link
                href="https://readknown.cn/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                zKnown
              </Link>
            </p>
          </div>
          <div className="max-[991px]: text-left font-semibold max-[991px]:py-1 max-[479px]:mb-4">
            <p>Products</p>
            <p>
              <Link
                href="https://aicover.design/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                AI Cover
              </Link>
            </p>
            <p>
              <Link
                href="https://aiwallpaper.shop/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                AI Wallpaper
              </Link>
            </p>
            <p>
              <Link
                href="https://sora.fm/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                Sora.FM
              </Link>
            </p>
          </div>
          <div className="max-[991px]:flex-none">
            <p className="text-[#636262] max-[479px]:text-sm pb-8">
              {" "}
              © Copyright 2024{" "}
              <Link className="text-primary" href="https://chuhai.tools/">
                chuhai.tools
              </Link>
              . All rights reserved.{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
