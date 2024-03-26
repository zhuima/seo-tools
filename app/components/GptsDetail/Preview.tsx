/* eslint-disable @next/next/no-img-element */
/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-26 14:28:47
 * @FilePath: /web/app/components/GptsDetail/Preview.tsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { FC } from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Item, Items, Post } from "@/app/types/gpts";
import { cn } from "../../utils/lib";
import { Callout } from "./callout";

interface Props {
  post: Post;
}

interface CodeBlockProps {
  language: string;
  codestring: string;
}

export default ({ post }: Props) => {
  console.log("post markdown----> ", post.markdown);
  const formattedMarkdown = post.markdown.parent.replace(/\n/g, "  \n");
  console.log("after format post markdown----> ", formattedMarkdown);

  return (
    <div className="w-full list-decimal h-full relative">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm]}
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
          h1: ({ className, ...props }) => (
            <h1
              className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h2: ({ className, ...props }) => (
            <h2
              className={cn(
                "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                className
              )}
              {...props}
            />
          ),
          h3: ({ className, ...props }) => (
            <h3
              className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h4: ({ className, ...props }) => (
            <h4
              className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h5: ({ className, ...props }) => (
            <h5
              className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h6: ({ className, ...props }) => (
            <h6
              className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          a: ({ className, ...props }) => (
            <a
              className={cn(
                "font-medium underline-offset-4 text-blue-700 dark:text-blue-400 hover:underline active:no-underline sm:hover:text-blue-700 active:text-blue-900 sm:active:text-blue-900",
                className
              )}
              rel="noopener noreferrer"
              {...props}
            />
          ),
          p: ({ className, ...props }) => (
            <p
              className={cn(
                "mt-4 leading-7 [&:not(:first-child)]:mt-6",
                className
              )}
              {...props}
            />
          ),
          ul: ({ className, ...props }) => (
            <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
          ),
          ol: ({ className, ...props }) => (
            <ol
              className={cn("my-6 ml-6 list-decimal", className)}
              {...props}
            />
          ),
          li: ({ className, ...props }) => (
            <li className={cn("mt-2", className)} {...props} />
          ),
          del: ({ className, ...props }) => (
            <del
              className={cn("line-through text-red-600/100", className)}
              {...props}
            />
          ),
          strong: ({ className, ...props }) => (
            <strong
              className={cn(
                "text-indigo-600/100 hover:text-blue-600",
                className
              )}
              {...props}
            />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote
              className={cn(
                "my-6 flex flex-col w-full rounded-lg border-l-[6px] bg-opacity-[15%] p-4 shadow-md border-[#009400] bg-[#e6f6e6]",
                className
              )}
              {...props}
            />
          ),
          hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
          table: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className={cn("w-full", className)} {...props} />
            </div>
          ),
          tr: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr
              className={cn("m-0 border-t p-0 even:bg-muted", className)}
              {...props}
            />
          ),
          th: ({ className, ...props }) => (
            <th
              className={cn(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                className
              )}
              {...props}
            />
          ),
          td: ({ className, ...props }) => (
            <td
              className={cn(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className
              )}
              {...props}
            />
          ),
          pre: ({ className, ...props }) => (
            <pre
              hidden
              className={cn(
                "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
                className
              )}
              {...props}
            />
          ),
          // code: ({ className, ...props }) => (
          //   <code
          //     className={cn(
          //       "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
          //       className
          //     )}
          //     {...props}
          //   />
          // ),
        }}
      >
        {formattedMarkdown}
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
