/* eslint-disable @next/next/no-img-element */
/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-25 18:19:02
 * @FilePath: /web/app/components/GptsDetail/Preview.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { FC } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Item, Items, Post } from "@/app/types/gpts";

interface Props {
  post: Post;
}

interface CodeBlockProps {
  language: string;
  codestring: string;
}



export default ({ post }: Props) => {
  console.log("post markdown----> ", post.markdown);

  return (
    <div className="w-full text-center h-full relative">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <CodeBlock
                codestring={String(children).replace(/\n$/, "")}
                language={match[1]}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post.markdown.parent}
      </ReactMarkdown>
    </div>
  );
};

const CodeBlock: FC<CodeBlockProps> = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  );
};
