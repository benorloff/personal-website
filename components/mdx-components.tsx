import React, { Suspense } from "react";

import { useMDXComponent } from "next-contentlayer/hooks";

import { cn } from "@/lib/utils";

import { NextImage } from "@/components/image";
import { Callout } from "@/components/callout";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "./copy-button";

interface Pre extends React.HTMLAttributes<HTMLPreElement> {
    raw?: string;
    ['data-language']?: string;
}

interface MdxProps {
    code: string
}

const components = {
    NextImage,
    Callout,
    Badge,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 
            className={cn(
                "text-6xl font-semibold mt-6",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 
            className={cn(
                "text-3xl font-semibold mt-6",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 
            className={cn(
                "text-2xl font-semibold mt-6",
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 
            className={cn(
                "text-xl font-semibold mt-6 tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 
            className={cn(
                "text-lg font-semibold mt-6 tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 
            className={cn(
                "text-base font-semibold mt-6 tracking-tight",
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
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
        <a 
            className={cn(
                "text-accent underline underline-offset-4 decoration-dotted hover:underline-2 hover:text-accent hover:decoration-solid transition-colors duration-300 ease-in-out",
                className
            )}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-2 list-none", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <li className={cn("mt-0 ml-4", className)} {...props} />
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
    pre: ({ children, raw, className, ...props }: Pre) => {
        const lang = props["data-language"];
        return (
            <pre {...props} className={cn("relative", className)}>
                <div className="flex items-center justify-between bg-muted px-4 py-2">
                    <span className="text-muted-foreground">{lang}</span>
                    <CopyButton text={raw!} />
                </div>
                {children}
            </pre>
        )
    },
    code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code className={cn("overflow-x-auto", className)} {...props}>
            {children}
        </code>
    ),
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component components={components} />
        </Suspense>
    )
}