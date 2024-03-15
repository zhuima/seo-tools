/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-15 11:24:40
 * @FilePath: /gpts-works/web/app/g/[uuid]/page.tsx
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
import { findByUuid } from "@/app/models/gpts";

async function getData(uuid: string): Promise<Items | undefined> {
  if (!uuid) {
    return;
  }

  const post = await findByUuid(uuid);

  return post;
}

export default async ({ params }: { params: { uuid: string } }) => {
  const post = await getData(params.uuid);

  console.log("post data", post);
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {post && <GptsDetail post={post} />}
      </div>
    </section>
  );
};
