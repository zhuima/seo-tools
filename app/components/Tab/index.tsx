"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Tags } from "@/app/types/tags";
import { tabMap } from "@/app/config/tabMap";

interface Props {
  tabValue: string;
  setTabValue: Dispatch<SetStateAction<string>>;
}

export default ({ tabValue, setTabValue }: Props) => {
  // const tabs: Tab[] = [
  //   {
  //     name: "hot",
  //     title: "Featured 🔥",
  //   },
  //   {
  //     name: "latest",
  //     title: "Latest",
  //   },
  //   {
  //     name: "random",
  //     title: "Random",
  //   },
  // ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [tabs, setTabs] = useState([]);
  const [tabsCount, setTabsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTags = async (tab: string) => {
    setLoading(true);
    const resp = await fetch("/api/posts/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        setTabsCount(res.data.count);
        setTabs(res.data.rows);
      }
    }
  };

  useEffect(() => {
    fetchTags(tabValue);
  }, [tabValue]);

  // 单独处理 URL 参数的逻辑
  useEffect(() => {
    const handleURLParams = () => {
      const params = new URLSearchParams(searchParams);
      if (tabValue && tabValue !== "web开发模版") {
        params.set("query", tabMap[tabValue]);
        // 使用 next/navigation 中的方法来更新 URL
        replace(`${pathname}?${params.toString()}`);
      } else {
        params.delete("query");
        // 当 tabValue 等于 'web开发模版🔥' 时，设置路径为根目录 '/'
        replace("/", undefined);
      }
    };

    handleURLParams();
  }, [tabValue, searchParams, pathname, replace]);

  console.log("tabs", tabs, tabsCount, loading);
  return (
    <section className="relative mt-4">
      <div className="mx-auto max-w-7xl px-2 py-4 md:px-8 md:py-4 text-center">
        <div
          role="tablist"
          className="mx-auto flex flex-wrap justify-start gap-2"
        >
          {tabs.map((tab: Tags, idx: number) => {
            return (
              <button
                key={idx}
                className={` ${
                  tabValue === tab.name
                    ? "bg-primary border-primary text-white border text-sm rounded-md px-3 py-1 mx-1 leading-8"
                    : "border text-sm rounded-md px-3 py-1 mx-1 leading-8"
                }`}
                onClick={() => setTabValue(tab.name)}
              >
                {tab.name == "web开发模版" ? "web开发模版🔥" : tab.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
