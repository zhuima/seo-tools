/* eslint-disable @next/next/no-img-element */
/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 12:11:33
 * @FilePath: /seo/app/components/Brand/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  count: number;
}

export default ({ count }: Props) => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-4 mt-4 md:mt-12">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h1 className="text-3xl font-bold md:text-7xl text-yellow-700">
            Hacker SEO Tools
          </h1>
          <p className="mt-4 mb-4 md:mt-8 md:mb-8 text:lg md:text-4xl">
            <span className="text-yellow-700 font-bold  max-w-fit">
              {/* {count || <Skeleton width={70} inline />} */}
              Essential SEO Tools for SEO Pros in 2024
            </span>{" "}
          </p>
        </div>
      </div>
      <img
        src="/bgstar.svg"
        alt="left star for seo.chuhai.tools"
        className="absolute bottom-[auto] left-[auto] right-0 top-24 -z-10 inline-block max-[767px]:hidden"
      />
      <img
        src="/bgstar.svg"
        alt="right star for seo.chuhai.tools"
        className="absolute bottom-[auto] right-[auto] left-0 top-60 -z-10 inline-block max-[767px]:hidden"
      />
    </section>
  );
};
