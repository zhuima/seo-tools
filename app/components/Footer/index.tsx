/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-14 15:27:53
 * @FilePath: /gpts-works/web/app/components/Footer/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";

export default () => {
  return (
    <footer className="block">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
          <div className="max-[767px]: w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial">
            <h2 className="text-3xl font-bold md:text-5xl">
              Find fantastic indie hacker tools all over the world.
            </h2>
          </div>
        </div>
        <div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)]"></div>
        <div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
          <div className="max-[991px]: text-center font-semibold max-[991px]:py-1 max-[479px]:mb-4 sm:text-center">
            Credit to
            <a
              href="https://chuhai.tools/"
              className="inline-block mx-2 py-1.5 pr-6 font-normal text-[#276EF1] transition hover:text-[#276EF1] sm:py-2 sm:pr-6 lg:pr-12"
              target="_blank"
            >
              Chuhai Tools
            </a>
          </div>
          <div className="max-[991px]:flex-none">
            <p className="text-[#636262] max-[479px]:text-sm">
              {" "}
              © Copyright 2024 By Zhuima. All rights reserved.{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
