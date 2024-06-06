/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-05-27 12:46:03
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-06 11:37:02
 * @FilePath: /seo/app/components/Tab/selectionMenu.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import Link from "next/link";

interface Props {
  selectedTag: string;
}

const SelectionMenu = ({ selectedTag }: Props) => {
  return (
    <div className="order-last w-full pt-4 mt-4 border-t border-gray-200 lg:border-0 lg:mt-0 lg:pt-0 lg:order-none lg:w-1/3 sm:flex sm:flex-col sm:align-center">
      <div className="relative self-center bg-gray-100 rounded-lg p-0.5 flex">
        <Link
          className={`flex justify-center relative w-1/3 rounded-lg py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cool-indigo-400 focus:z-10 sm:w-1/3 sm:px-8 ${
            selectedTag === "all-in-one-seo-tool"
              ? "bg-white text-orange-500"
              : "text-gray-700 hover:text-gray-900"
          }`}
          href="/categories/all-in-one-seo-tool"
          target="_self"
          scroll={false}
          prefetch
        >
          On Page SEO🔥
        </Link>
        <Link
          className={`flex justify-center relative w-1/3 rounded-lg py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cool-indigo-300 focus:z-10 sm:w-1/3 sm:px-8 ml-0.5 ${
            selectedTag === "keyword-research"
              ? "bg-white text-orange-500"
              : "text-gray-700 hover:text-gray-900"
          }`}
          href="/categories/keyword-research"
          target="_self"
          scroll={false}
          prefetch
        >
          Keyword Research
        </Link>
        <Link
          className={`flex justify-center relative w-1/3 rounded-lg py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cool-indigo-300 focus:z-10 sm:w-1/3 sm:px-8 ml-0.5 ${
            selectedTag === "technical-seo"
              ? "bg-white text-orange-500"
              : "text-gray-700 hover:text-gray-900"
          }`}
          href="/categories/technical-seo"
          target="_self"
          scroll={false}
          prefetch
        >
          Technical SEO
        </Link>
      </div>
    </div>
  );
};

export default SelectionMenu;
