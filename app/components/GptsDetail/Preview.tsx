/* eslint-disable @next/next/no-img-element */
/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-15 12:01:17
 * @FilePath: /gpts-works/web/app/components/GptsDetail/Preview.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import {
  getGptsTools,
  getGptsWelcomeMessage,
  gptGptsPromptStarters,
} from "@/app/services/gpts";

import { Gpts } from "@/app/types/gpts";

interface Props {
  gpts: Gpts;
}

export default ({ gpts }: Props) => {
  const promptStarters = gptGptsPromptStarters(gpts);
  const welcomeMessage = getGptsWelcomeMessage(gpts);
  const toolss = getGptsTools(gpts);
  // console.log("toos", toolss);
  return (
    <div className="w-full text-center h-full relative">
      <div className="mx-auto mt-12">
        <img
          className="mx-auto w-16 h-16 rounded-full"
          src={gpts.avatar_url}
          alt=""
        />
        <h2 className="mt-2 text-center text-2xl font-medium">{gpts.name}</h2>
        <p className="mx-10 mt-2 text-center text-xl font-normal text-token-text-secondary">
          {gpts.description}
        </p>
        <p className="mt-2 text-sm text-token-text-tertiary">
          By {gpts.author_name}
        </p>
      </div>

      <div className="px-8 py-8">
        {welcomeMessage && (
          <div className="hidden md:flex">
            <p className="bg-white px-4 py-2 text-sm rounded-xl truncate">
              {welcomeMessage}
            </p>
            <div className="flex-1"></div>
          </div>
        )}
      </div>

      <div className="absolute bottom-20 w-full px-8">
        {promptStarters && (
          <div className="flex items-center flex-wrap">
            {promptStarters.map((v: string, idx: number) => {
              return (
                <div key={idx} className="w-full md:w-1/2 px-1 py-1">
                  <p className="rounded-xl text-left text-gray-700 border  border-gray-50 px-2 py-1 bg-white text-sm truncate">
                    {v}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <input
          type="text"
          disabled
          placeholder={`Message ${gpts.name}…`}
          className="w-full mt-4 text-sm bg-white border border-primary rounded-xl px-4 py-2"
        />
      </div>
    </div>
  );
};
