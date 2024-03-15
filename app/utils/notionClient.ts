/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-15 10:56:29
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-15 10:56:35
 * @FilePath: /gpts-works/web/app/utils/notionClient.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
// notionClient.ts

import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN as string,
});

export default notion;
