/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-25 18:58:24
 * @FilePath: /web/app/tools/[slug]/page.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import { Items } from "@/app/types/gpts";
import GptsDetail from "@/app/components/GptsDetail";
import Image from "next/image";
import extensionSrc from "@/public/extension.png";
// import { findByUuid } from "@/app/models/gpts";

import { findBySlug } from "@/app/services/gpts";
async function getData(slug: string) {
  if (!slug) {
    return;
  }

  const post = await findBySlug(slug);

  return post;
}

export default async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug.split("about-")[1];

  const post = await getData(slug);

  console.log("post data", post);

  // console.log("post", post.properties?.Title.title[0].plain_text);
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {post && <GptsDetail post={post} />}
      </div>
    </section>
  );
};
