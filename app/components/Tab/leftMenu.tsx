/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-05-27 11:49:02
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-06 17:16:29
 * @FilePath: /seo/app/components/Tab/leftMenu.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getKeyByValue } from "@/app/services/posts";
import { tabMap } from "@/app/config/tabMap";

interface Props {
  selectedTag: string;
}

const LeftDropdownMenu = ({ selectedTag }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  console.log("selectedTag from left menu", selectedTag);
  const selectName = selectedTag
    ? getKeyByValue(tabMap, selectedTag)
    : "Trending";

  return (
    <div className="sm:w-1/2 lg:w-1/3">
      <div className="relative inline-block text-left sm:w-52">
        <div>
          <button
            type="button"
            className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cool-indigo-300 focus:border-orange-400"
            onClick={handleDropDown}
          >
            {selectName}
            <svg
              className="w-5 h-5 ml-2 -mr-1 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute left-0 z-10 w-56 mt-2 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
            <div
              className="py-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                className="font-normal text-gray-700 hover:text-gray-900 relative block px-4 py-2 text-sm hover:bg-orange-400"
                role="menuitem"
                href="/categories/keyword-research"
                target="_self"
                scroll={false}
                prefetch
              >
                Hot 🔥
              </Link>
              <Link
                className="font-normal text-gray-700 hover:text-gray-900 relative block px-4 py-2 text-sm hover:bg-orange-400"
                role="menuitem"
                href="/categories/blog"
                target="_self"
                scroll={false}
                prefetch
              >
                Newest
              </Link>
              {/* <Link
                className="font-normal text-gray-700 hover:text-gray-900 relative block px-4 py-2 text-sm hover:bg-orange-400"
                role="menuitem"
                href="/categories/newest-columns"
              >
                最新
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftDropdownMenu;
