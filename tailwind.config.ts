/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-26 10:46:17
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-04-23 15:41:51
 * @FilePath: /seo/tailwind.config.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        primary: "#2752f4",
      },
      backgroundColor: {
        primary: "#2752f4",
      },
      borderColor: {
        primary: "#2752f4",
      },
    },
  },
  plugins: [ require("@tailwindcss/typography")],
};
export default config;
