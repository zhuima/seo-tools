/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-26 13:58:25
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-26 13:58:29
 * @FilePath: /web/app/utils/lib.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
