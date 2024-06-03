"use server"

import { cn } from "@/lib/utils";
import { Code, BrightProps} from "bright";
import { useTheme } from "next-themes";
import React from "react";

interface CodeBlockProps {
    title?: BrightProps["title"];
    lang?: BrightProps["lang"];
    lineNumbers?: BrightProps["lineNumbers"];
    className?: string;
    children?: string;
}

Code.theme = {
    dark: 'dark-plus',
    light: 'light-plus',
    lightSelector: 
        '[data-theme="light-red"]'
        || '[data-theme="light-green"]'
        || '[data-theme="light-blue"]'
}

export const CodeBlock = ({
    title,
    lang,
    lineNumbers,
    className,
    children,
}: CodeBlockProps) => {

    return (
        <Code 
            title={title}
            lang={lang}
            lineNumbers={lineNumbers}
            className={cn(
                "border shadow-sm !my-10",
                className
            )}
        >
            {children}
        </Code>
    )
}