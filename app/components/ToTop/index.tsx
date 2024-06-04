/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-02-26 10:38:26
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-06-04 13:38:58
 * @FilePath: /seo/app/components/ToTop/index.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
"use client";

import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="fixed bottom-[10%] right-0 z-50 m-5 sm:bottom-[7%] sm:m-0"
        >
          <IoIosArrowUp className="rounded-md bg-orange-500 text-[50px] text-white shadow-lg dark:bg-zinc-50 dark:text-zinc-950 md:mr-10" />
        </button>
      )}
    </>
  );
};
export default ScrollToTop;
