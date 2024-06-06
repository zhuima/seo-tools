/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-05-22 15:00:30
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-06 12:08:39
 * @FilePath: /seo/app/components/Tab/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import LeftDropdownMenu from "./leftMenu";
import RightDropdownMenu from "./rightMenu";
import SelectionMenu from "./selectionMenu";

interface Props {
  selectedTag: string;
}

const Tab = async function ({ selectedTag }: Props) {
  // const tabs = await fetchTags();

  console.log("selectedTag from tab", selectedTag);
  return (
    <section className="relative mt-4">
      <div className="mx-auto max-w-6xl px-10 pt-6  sm:pt-8 ">
        <div className="flex flex-row flex-wrap items-center justify-between">
          {/* 左侧下拉菜单 */}
          <LeftDropdownMenu selectedTag={selectedTag} />

          {/* 中间部分 */}

          <SelectionMenu selectedTag={selectedTag} />

          {/* 右侧下拉菜单 */}

          <RightDropdownMenu selectedTag={selectedTag} />
        </div>
      </div>
    </section>
  );
};

export default Tab;
