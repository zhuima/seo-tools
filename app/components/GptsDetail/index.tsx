/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { Item, Items, Post } from "@/app/types/gpts";
import moment from "moment";
import GptsList from "../GptsList";
import Preview from "./Preview";

interface Props {
  post: Post;
}

export default ({ post }: Props) => {
  // const tools = getGptsTools(post);

  console.log("postgpts details", post);
  const [posts, setPosts] = useState<Items[]>([]);
  const [currentPostsCount, setCurrentPostsCount] = useState(0);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (tags: string) => {
    const params = {
      tags: tags,
    };

    console.log("tab ----:", tags);
    setLoading(true);
    const resp = await fetch("/api/gpts/random", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    setLoading(false);

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        setCurrentPostsCount(res.data.count);
        setTotalPostsCount(res.data.totalCount);
        setPosts(res.data.rows);
      }
    }
  };

  useEffect(() => {
    fetchPosts(post.metadata.tags);
  }, [post.metadata.tags]);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        <div className="w-full mb-4 text-lg">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div>
                  <Link className="text-gray-400 hover:text-gray-500" href="/">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="sr-only">Home</span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                  </svg>
                  <Link
                    className="ml-2 text-md font-medium text-gray-500 hover:text-gray-700"
                    aria-current="page"
                    href="#"
                  >
                    tools
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                  </svg>
                  <Link
                    href={"#"}
                    className="ml-2 text-md font-medium text-gray-500 hover:text-gray-700"
                    aria-current="page"
                  >
                    {post.metadata.title}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {/* <div className="grid gap-12 sm:gap-20 lg:grid-cols-2"> */}
        <div className="w-full">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center rounded-md bg-[#c4c4c4] px-3 py-1">
              <div className="mr-1 h-2 w-2 rounded-full bg-black"></div>
              <p className="text-sm">
                Updated at {moment(post.metadata.lastEditTime).fromNow()}
              </p>
            </div>
            {/* <p className="text-sm text-[#808080] sm:text-xl">
              Created by {post.metadata.title}
            </p> */}
            <h2 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">
              {post.metadata.title}
            </h2>
            {/* <p className="text-sm text-[#808080] sm:text-xl">
              {post.metadata.description}
            </p> */}
            {/* <div className="mb-8 mt-8 h-px w-full bg-black"></div> */}
            {/* <div className="mb-6 flex flex-col gap-2 text-sm text-[#808080] sm:text-base lg:mb-8">
              <p className="font-medium">Capabilities</p>
              <p>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={tools && tools.includes("browser")}
                />
                Web Browsing
              </p>
              <p>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={tools && tools.includes("dalle")}
                />
                DALL·E Image Generation
              </p>
              <p>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={tools && tools.includes("python")}
                />
                Code Interpreter
              </p>
            </div> */}

            <div className="flex flex-col gap-4 font-semibold sm:flex-row">
              <Link
                href={post ? post.metadata.link : "#"}
                target="_blank"
                className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
              >
                {/* <BsChatDots /> */}
                {/* <p className="text-sm text-white-nowrap">
                  Try using {post?.properties?.Title.title[0].plain_text} in
                  your next project 👉 
                  Try in your next project 👉
                </p> */}
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-primary top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                  Try in your next project 👉
                </span>
              </Link>
            </div>
          </div>
          {post.markdown.parent ? (
            <Preview post={post} />
          ) : (
            <img
              className="h-full w-full object-cover object-center"
              src="https://img.techrk1688.eu.org/file/9fad9cc4e60011f8a64df.png"
              alt="Hacker SEO Tools"
              loading="lazy"
            />
          )}

          {/* <div className="min-h-[530px] overflow-hidden rounded-md ">
            {post.markdown.parent ? (
              <Preview post={post} />
            ) : (
              <img
                className="h-full w-full object-cover object-center"
                src="https://img.techrk1688.eu.org/file/9fad9cc4e60011f8a64df.png"
                alt="Hacker SEO Tools"
                loading="lazy"
              />
            )}
          </div> */}
        </div>
      </div>
      <div className="w-full text-center">
        <h2 className="mx-auto font-bold text-3xl mt-8 mb-4">
          Other Tools you may like
        </h2>
        <GptsList posts={posts} loading={loading} />
      </div>
    </section>
  );
};
