// @ts-nocheck
"use client"

import { NextImage } from "@/components/image";
import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";

const components = {
    NextImage,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 
            className={cn(
                "text-4xl mt-2 font-bold",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 
            className={cn(
                "text-3xl font-semibold",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 
            className={cn(
                "text-2xl font-semibold",
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 
            className={cn(
                "text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 
            className={cn(
                "text-lg font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 
            className={cn(
                "text-base font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p 
            className={cn(
                "leading-relaxed tracking-wide [&:not(:first-child)]:mt-6",
                className
            )}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <blockquote
            className={cn("mt-6 border-l-2 pl-6 italic", className)}
            {...props}
        />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className="my-4 md:my-8" {...props} />
    ),
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("m-0 border-t p-0 even:bg-muted", className)}
            {...props}
        />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
            "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
            className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
            "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
            className
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
          className={cn(
            "relative w-full rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
            className
          )}
          {...props}
        />
      ),
}

interface MdxProps {
    code: string,
}

export const Mdx = ({ code }: MdxProps) => {
    const Component = useMDXComponent(code);
    return (
        <div className="mdx">
            <Component components={components} />
        </div>
    )
};