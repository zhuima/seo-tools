/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-02-27 10:55:57
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-23 11:32:53
 * @FilePath: /seo/app/not-found.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
      <div className="wf-ull lg:w-1/2">
        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          页面飞走了
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          你查看的页面被外星人👽抓走了:
        </p>

        <div className="mt-6 flex items-center gap-x-3">
          <button className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-zinc-950 px-5 py-2 text-sm text-white transition-colors duration-200 sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <Link
              href="/"
              className="text-white"
              // text="back to home for Essential SEO Tools for SEO Pros in 2024"
            >
              返回首页
            </Link>
          </button>
        </div>
      </div>

      <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
        <Image
          className="w-full max-w-lg lg:mx-auto"
          src="https://merakiui.com/images/components/illustration.svg"
          alt="404 illustration for Essential SEO Tools for SEO Pros in 2024"
          width={500}
          height={500}
          priority={true}
        />
      </div>
    </div>
  );
};

export default NotFound;
