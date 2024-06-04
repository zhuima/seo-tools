"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Item } from "@/app/types/posts";

import { Tags } from "@/app/types/tags";
import { tabMap } from "@/app/config/tabMap";

interface Props {
  tabValue: string;
  setTabValue: Dispatch<SetStateAction<string>>;
}

export async function generateStaticParams() {
  // const resp = await fetch("/api/posts/tags", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (resp.ok) {
  //   const res = await resp.json();
  //   return res.data.rows.map((tab: Item) => ({
  //     tabValue: tab.properties.Tags?.multi_select?.[0]?.name,
  //   }));
  // }
  // return [];
  return Object.entries(tabMap).map(([key, value]) => ({
    tabValue: key, // 或者根据你实际需要的属性做调整
  }));
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
  const router = useRouter();

  const [tabs, setTabs] = useState([]);
  const [tabsCount, setTabsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    // const resp = await fetch("/api/posts/tags", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // setLoading(false);

    // if (resp.ok) {
    //   const res = await resp.json();
    //   if (res.data) {
    //     setTabsCount(res.data.count);
    //     setTabs(res.data.rows);
    //   }
    // }
    setTabsCount(Object.keys(tabMap).length);
    // setTabs(
    //   Object.entries(tabMap).map(([key, value]) => ({
    //     tabValue: key, // 或者根据你实际需要的属性做调整
    //   }))
    // );

    setTabs(Object.entries(tabMap).map(([key, value]) => key) as never[]);

    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // 单独处理 URL 参数的逻辑
  useEffect(() => {
    const handleURLParams = () => {
      const params = new URLSearchParams(searchParams);
      if (tabValue && tabValue !== "一体化SEO工具") {
        params.set("query", tabMap[tabValue]);
        // 使用 next/navigation 中的方法来更新 URL
        replace(`${pathname}?${params.toString()}`);
      } else {
        params.delete("query");
        // 当 tabValue 等于 'web开发模版🔥' 时，设置路径为根目录 '/'
        replace("/", undefined);
        // replace("/", { state: { tabValue: "web开发模版" } });
      }
    };

    handleURLParams();
  }, [tabValue, searchParams, pathname, replace, router]);

  console.log("tabs", tabs, tabsCount, loading);
  return (
    <section className="relative mt-4">
      <div className="mx-auto max-w-6xl px-2 py-4 md:px-8 md:py-4 text-center">
        <div className="mx-auto flex flex-wrap justify-start gap-2">
          {tabs.map((tab: string, idx: number) => {
            return (
              <button
                key={idx}
                className={` ${
                  tabValue === tab
                    ? "bg-yellow-700 border-orange text-white border text-sm rounded-md px-3 py-1 mx-1 leading-8"
                    : "border text-sm rounded-md px-3 py-1 mx-1 leading-8"
                }`}
                onClick={() => setTabValue(tab)}
              >
                {tab == "一体化SEO工具" ? "一体化SEO工具🔥" : tab}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
