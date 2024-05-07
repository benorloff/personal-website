import { NextImage } from "@/components/image";
import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";

const components = {
    NextImage,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 
            className={cn(
                "text-4xl font-bold",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 
            className={cn(
                "text-2xl font-semibold",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 
            className={cn(
                "text-xl font-semibold",
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 
            className={cn(
                "text-lg font-semibold tracking-tight",
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