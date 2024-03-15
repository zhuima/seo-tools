"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import { Tags } from "@/app/types/tags";

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

  const [tabs, setTabs] = useState([]);
  const [tabsCount, setTabsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTags = async (tab: string) => {
    setLoading(true);
    const resp = await fetch("/api/gpts/tags", {
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

  console.log("tabs", tabs, tabsCount, loading);
  return (
    <section className="relative mt-4">
      <div className="mx-auto max-w-7xl px-2 py-4 md:px-8 md:py-4 text-center">
        <div role="tablist" className=" mx-auto">
          {tabs.map((tab: Tags, idx: number) => {
            return (
              <a
                role="tab"
                key={idx}
                className={` ${
                  tabValue === tab.name
                    ? "border text-sm rounded-md px-3 py-1 mx-1 "
                    : "border text-sm rounded-md px-3 py-1 mx-1 "
                }`}
                onClick={() => setTabValue(tab.name)}
              >
                {tab.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
