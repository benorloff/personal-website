"use client"

import { Frame } from "@/components/frame";
import { allPosts, Post } from "@/.contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Mdx } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// export const generateStaticParams = async () => {
//     allPosts.map((post: Post) => ({
//         slug: post._raw.flattenedPath.replace(/posts\/?/, ''),
//     }))
//     return allPosts;
// }

// export const generateMetadata = ({ params }: { params: { slug: string }}) => {
//     const post = allPosts.find((post) => post._raw.flattenedPath.replace(/posts\/?/, '') === params.slug);
//     if (!post) return null;
//     return {
//         title: post.title 
//     }
// }

const PostPage = ({
    params
}: {
    params: {
        slug: string;
    }
}) => {
    const post = allPosts.find((post) => post._raw.flattenedPath.replace(/posts\/?/, '') === params.slug);

    if (!post) throw new Error("Post not found")

    const contentRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: contentRef,
    });
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <div ref={contentRef} className="h-full w-full overflow-scroll no-scrollbar">
                <Mdx code={post.body.code} />
            </div>
        </>
    )
}

export default PostPage;