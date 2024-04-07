/* eslint-disable @next/next/no-img-element */

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const index = () => {
  return (
    <>
      {/* slogan */}
      <section className="relatve">
        <div className="mx-auto w-full max-w-7xl px-4 mt-12 md:mt-24">
          <div className="mx-auto w-full max-w-6xl text-center">
            <h1 className="text-3xl font-bold md:text-7xl text-primary">
              <Skeleton count={1} />
            </h1>
            <p className="mt-4 mb-4 md:mt-12 md:mb-8 text:lg md:text-4xl">
              <Skeleton count={1} />
            </p>
          </div>
        </div>
        <img
          src="/bgstar.svg"
          alt="background left star for indie hacker tools"
          className="absolute bottom-[auto] left-[auto] right-0 top-24 -z-10 inline-block max-[767px]:hidden"
        />
        <img
          src="/bgstar.svg"
          alt="background star right for indie hacker tools"
          className="absolute bottom-[auto] right-[auto] left-0 top-60 -z-10 inline-block max-[767px]:hidden"
        />
      </section>

      {/* search */}
      <section className="relatve mt-4 md:mt-8">
        <div className="mx-auto w-full max-w-2xl px-6 text-center">
          <div className="flex items-center relative">
            <Skeleton count={1} />
          </div>
        </div>
      </section>

      {/* tabs */}
      <section className="relative mt-4">
        <div className="mx-auto max-w-7xl px-2 py-4 md:px-8 md:py-4 text-center">
          <Skeleton count={3} />
        </div>
      </section>

      {/* posts cart list */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
          <div className="mb-8 gap-5 py-4 [column-count:1] md:mb-12 md:[column-count:2] lg:mb-16 lg:[column-count:3]">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative mb-6 gap-6 overflow-hidden rounded-2xl border border-solid border-[#7e7e7e] bg-white p-8"
                >
                  <Skeleton count={3} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
