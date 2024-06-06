/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-05-27 11:49:02
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-06 17:15:39
 * @FilePath: /seo/app/components/Tab/rightMenu.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Items } from "@/app/types/posts";
import { tabMap } from "@/app/config/tabMap";
import { getKeyByValue } from "@/app/services/posts";

interface Props {
  selectedTag: string;
}

export async function generateStaticParams() {
  return Object.entries(tabMap).map(([key, value]) => ({
    tabValue: key, // 或者根据你实际需要的属性做调整
  }));
}

const RightDropdownMenu = ({ selectedTag }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (slug: string) => {
    router.push(`/categories/${slug}`, { scroll: false });
  };

  // console.log("selectedTag from right menu", selectedTag);
  // let selectName = "";
  const selectName =
    selectedTag && !selectedTag.startsWith("query")
      ? getKeyByValue(tabMap, selectedTag)
      : "Any Tools";

  return (
    <div className="sm:w-1/2 lg:w-1/3">
      <div className="ml-auto sm:w-52">
        <div className="relative">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={isOpen}
            className="relative w-full py-2 pl-4 pr-10 text-sm font-medium text-left text-gray-700 bg-white border border-gray-300 shadow-sm cursor-default cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-cool-indigo-300 focus:border-cool-indigo-300 hover:bg-gray-50 hover:text-gray-900"
            onClick={handleDropDown}
          >
            <span className="flex items-center">
              <span className="block truncate">{selectName}</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 ml-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            className={`absolute z-10 w-full mt-2  bg-white shadow-lg rounded-lg ${
              isOpen ? "" : "hidden"
            }`}
          >
            <div className="py-2 overflow-auto text-base max-h-56 rounded-2lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.entries(tabMap).map(([name, slug]) => {
                return (
                  // <Link
                  //   scroll={false}
                  //   key={slug}
                  //   href={`/categories/${slug}`}
                  //   className="block cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-orange-400 hover:text-gray-900 cursor-pointer text-sm"
                  //   target="_self"
                  // >
                  //   {name}
                  // </Link>
                  <button
                    key={slug}
                    onClick={() => handleOptionSelect(slug)}
                    className="block w-full text-left whitespace-nowrap cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-orange-400 hover:text-gray-900  text-sm"
                  >
                    {name}
                  </button>
                );
              })}
              {/* Add more items here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightDropdownMenu;
