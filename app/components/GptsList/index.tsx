/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-26 16:02:32
 * @FilePath: /seo-tools/app/components/GptsList/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";

import { Items } from "@/app/types/gpts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  posts: Items[];
  loading: boolean;
}

export default ({ posts, loading }: Props) => {
  console.log("posts --->", posts);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {!loading ? (
          <div className="mb-8 gap-5 py-4 [column-count:1] md:mb-12 md:[column-count:2] lg:mb-16 lg:[column-count:3]">
            {posts?.map((item: Items, idx: number) => {
              console.log("item --->", item);
              return (
                <Link
                  href={`/tools/${item.id}`}
                  as={`/tools/about-${item.properties.Slug.rich_text[0].plain_text}`}
                  target="_self"
                  key={idx}
                >
                  <div className="relative mb-6 gap-6 overflow-hidden rounded-2xl border border-solid border-[#7e7e7e] bg-white p-8">
                    <div className="mb-4 flex flex-row">
                      <LazyLoadImage
                        src={item?.properties?.Icon?.url}
                        alt={item?.properties?.Title?.title[0]?.plain_text}
                        className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-base font-semibold">
                          {item?.properties?.Title?.title[0]?.plain_text}
                        </h4>
                        <p className="text-sm text-[#636262]">
                          {item?.properties.Title?.title[0]?.plain_text}
                        </p>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-[#636262]">
                      {item?.properties?.Description?.rich_text[0]?.plain_text}
                    </p>
                    <div className="flex items-center">
                      {item?.properties?.Rating?.number &&
                        Array.from({
                          length: item?.properties?.Rating?.number,
                        }).map((_, idx: number) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <LazyLoadImage
                            key={idx}
                            src="/star.svg"
                            alt="Hacker SEO Tools star"
                            className="mr-1.5 inline-block w-4 flex-none"
                          />
                        ))}
                      <div className="flex-1"></div>

                      <p className="text-slate-500 text-sm">
                        {moment(item?.created_time).fromNow()}
                      </p>
                    </div>
                    {item?.properties?.IsFree.checkbox ? (
                      <span
                        className={`absolute right-0  top-0 rounded-bl-md rounded-tr-md bg-red-500 p-1 text-white dark:border-r dark:border-t dark:border-gray-200
              dark:bg-red-700`}
                      >
                        开源
                      </span>
                    ) : (
                      ""
                    )}

                    {item?.properties?.IsFire.checkbox ? (
                      <span
                        className={`absolute right-0 top-0 rounded-bl-md rounded-tr-md text-2xl`}
                      >
                        🔥
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mb-8 gap-5 py-4 [column-count:1] md:mb-12 md:[column-count:2] lg:mb-16 lg:[column-count:3]">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative mb-6 gap-6 overflow-hidden rounded-2xl border border-solid border-[#7e7e7e] bg-white p-8"
                >
                  <Skeleton count={3} />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};
