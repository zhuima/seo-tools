/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BsChatDots } from "react-icons/bs";
import { Item, Items, Post } from "@/app/types/posts";
import moment from "moment";
import PostsList from "@/app/components/PostsList";
import Preview from "@/app/components/PostsDetail/Preview";
import { tabMap } from "@/app/config/tabMap";

interface Props {
  post: Post;
}

export default ({ post }: Props) => {
  // const tools = getGptsTools(post);
  const [pageView, setPageView] = useState(0);
  const pathname = usePathname();

  // console.log("posts details", post);
  const [posts, setPosts] = useState<Items[]>([]);
  const [currentPostsCount, setCurrentPostsCount] = useState(0);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (tags: string) => {
    const params = {
      tags: tags,
    };

    // console.log("tab ----:", tags);
    setLoading(true);
    const resp = await fetch("/api/posts/random", {
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

  const fetchPageView = async (pathname: string) => {
    const params = {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${pathname}`, //pathname,
      hostname: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      referrer: "",
    };

    setLoading(true);
    const resp = await fetch("/api/pageview", {
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
        setPageView(res.data.pv);
      }
    }
  };

  useEffect(() => {
    fetchPageView(pathname);
  }, [pathname]);

  console.log("post pv view", pageView, post);
  const tabSlug = tabMap[post.metadata.tags];
  return (
    <>
      <div className="px-8 pb-24 mx-auto mt-5 sm:pb-32 sm:px-5 lg:max-w-7xl lg:px-16 ">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 ">
          {/* <!-- Product image --> */}

          <div className="lg:row-end-1 lg:col-span-4">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center max-w-2xl space-x-2">
                <li>
                  <div className="flex items-center">
                    <Link
                      className="mr-2 text-sm font-medium text-gray-900"
                      href="/"
                    >
                      Home
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"></path>
                    </svg>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <Link
                      className="mr-2 text-sm font-medium text-gray-900"
                      href={`/?query=${tabSlug}`}
                    >
                      Tools
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"></path>
                    </svg>
                  </div>
                </li>

                <li className="text-sm">
                  <span className="font-medium text-gray-500">
                    {post.metadata.title}
                  </span>
                </li>
              </ol>
            </nav>
            {post?.metadata?.coverImage ? (
              <div className="mt-6 overflow-hidden bg-gray-100 rounded-xl">
                <img
                  className="w-full h-auto object-cover object-center"
                  alt={`${post.metadata.title} cover image`}
                  src={post?.metadata?.coverImage}
                />
              </div>
            ) : (
              <div className="mt-6 overflow-hidden bg-gray-100 rounded-xl">
                <img
                  className="w-full h-auto object-cover object-center"
                  alt={`${post.metadata.title} cover image`}
                  src="https://img.techrk1688.eu.org/file/cefff46f0a29ce378b110.png"
                />
              </div>
            )}
          </div>

          {/* <!-- Product details --> */}
          <div className="w-full max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <div className="flex flex-col-reverse">
              <div className="flex justify-between w-full lg:mt-10">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {post.metadata.title}
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Tool information
                  </h2>
                  {/* <!-- Author meta --> */}
                  <div className="flex items-center mt-2">
                    <Link href={post.metadata.link}>
                      <img
                        className="rounded-full flex-shrink-0 mr-3"
                        alt={`${post.metadata.title} avatar`}
                        width="24"
                        height="24"
                        src={post?.metadata.icon}
                      />
                    </Link>{" "}
                    <div className="text-md">
                      <span className="text-gray-600">From </span>
                      <Link
                        className="font-medium text-cool-indigo-600 hover:text-cool-indigo-500"
                        href={post.metadata.link}
                      >
                        {post.metadata.link.split(`https://`)[1].split(`/`)[0]}
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="ml-4 text-3xl font-bold sm:ml-6 text-cool-indigo-600 font-display">
                  {post.metadata.isFree ? `Free` : `Business`}
                </p>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-gray-700 text-17px">
              {post.metadata.description}
            </p>

            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Link
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-orange-500 border border-transparent rounded-2xl hover:bg-cool-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cool-indigo-500"
                target="_blank"
                href={post.metadata.link}
              >
                Get Tools
              </Link>
              {post.metadata.demo && (
                <Link
                  className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-cool-indigo-700 border border-transparent rounded-2xl bg-orange-300 hover:bg-cool-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cool-indigo-500"
                  target="_blank"
                  href={post.metadata.demo}
                >
                  Live Preivew
                </Link>
              )}
            </div>
            {/*
            <div className="pt-10 mt-10 border-t border-gray-200 ">
              <div className="font-medium leading-6 tracking-wider text-left text-gray-500 uppercase text-md">
                Github Info
              </div>

              <div className="mt-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
                <div className="flex items-center space-x-2 lg:col-span-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M8 11v-5a4 4 0 0 1 8 0"></path>
                  </svg>
                  <span className="leading-8 tracking-normal text-md font-medium text-gray-700">
                    22 open issues
                  </span>
                </div>
                <div className="flex items-center space-x-2 lg:col-span-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                  </svg>
                  <span className="leading-8 tracking-normal text-md font-medium text-gray-700">
                    1451 stars
                  </span>
                </div>
                <div className="flex items-center space-x-2 lg:col-span-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
                  </svg>
                  <span className="leading-8 tracking-normal text-md font-medium text-gray-700">
                    18 watching
                  </span>
                </div>
                <div className="flex items-center space-x-2 lg:col-span-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="18" r="2"></circle>
                    <circle cx="7" cy="6" r="2"></circle>
                    <circle cx="17" cy="6" r="2"></circle>
                    <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2"></path>
                    <line x1="12" y1="12" x2="12" y2="16"></line>
                  </svg>
                  <span className="leading-8 tracking-normal text-md font-medium text-gray-700">
                    64 forks
                  </span>
                </div>
              </div>
            </div> */}

            <div className="pt-10 mt-10 border-t border-gray-200 ">
              <div className="font-medium leading-6 tracking-wider text-left text-gray-500 uppercase text-md">
                INFO
              </div>
              <div className="mt-4 text-gray-800">
                <div className="flex justify-between my-3">
                  <div className="font-medium leading-8 text-gray-500 text-md">
                    Released
                  </div>
                  <div className="font-medium leading-8 text-gray-700 text-md whitespace-nowrap">
                    <time>{moment(post.metadata.lastEditTime).fromNow()}</time>
                  </div>
                </div>

                <div className="flex justify-between my-3">
                  <div className="font-medium leading-8 text-gray-500 text-md">
                    Last updated
                  </div>
                  <div className="font-medium leading-8 text-gray-700 text-md whitespace-nowrap">
                    <time>{moment(post.metadata.lastEditTime).fromNow()}</time>
                  </div>
                </div>

                <div className="flex justify-between my-3">
                  <div className="w-full font-medium leading-8 text-gray-500 text-md max-w-xxxs">
                    Tags
                  </div>
                  <div className="leading-8 text-right max-w-xxs">
                    <Link
                      className="text-md font-medium text-cool-indigo-600 hover:text-cool-indigo-500 whitespace-nowrap"
                      href={`/?query=${tabSlug}`}
                    >
                      {post.metadata.tags}
                    </Link>
                  </div>
                </div>

                {/* <div className="flex justify-between my-3">
                  <div className="w-full font-medium leading-8 text-gray-500 text-md max-w-xxxs">
                    Stack
                  </div>
                  <div className="leading-8 text-right max-w-xxs">
                    <Link
                      className="text-md font-medium text-cool-indigo-600 hover:text-cool-indigo-500"
                      href="/?query=Vue.js"
                    >
                      Vue.js
                    </Link>
                    ,{" "}
                    <Link
                      className="text-md font-medium text-cool-indigo-600 hover:text-cool-indigo-500"
                      href="/?query=React"
                    >
                      React
                    </Link>
                    ,{" "}
                    <Link
                      className="text-md font-medium text-cool-indigo-600 hover:text-cool-indigo-500"
                      href="/?query=HTML"
                    >
                      HTML
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
            <div className="pb-5 border-b border-gray-200">
              <h3 className="mt-10 scroll-m-20  pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                关于{post.metadata.title}
              </h3>
            </div>
            <div className="py-3 prose text-gray-700 break-words xl:pt-6 xl:pb-0 prose-indigo max-w-none">
              <div className="trix-content">
                {post.markdown.parent ? (
                  <Preview post={post} />
                ) : (
                  <>
                    <h3 className="mt-4 text-sm text-[#808080] sm:text-xl">
                      {post.metadata.description}
                    </h3>

                    <img
                      className="mt-4 h-full w-full object-cover object-center"
                      src="https://img.techrk1688.eu.org/file/cefff46f0a29ce378b110.png"
                      alt="indie hacker tools"
                      loading="lazy"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* other tools */}
      <div className="w-full text-center">
        <h2 className="mx-auto font-bold text-3xl mt-8 mb-4">猜你喜欢</h2>
        <PostsList posts={posts} loading={loading} />
      </div>
    </>
  );
};
