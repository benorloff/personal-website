import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from 'contentlayer/generated';

import { Frame } from "@/components/frame";

const BlogCard = (post: Post) => {
    return (
        <div className="container py-8">
            <h2 className="text-xl">
                <Link href={post.url}>
                    {post.title}
                </Link>
            </h2>
            <time dateTime={post.date}>
                {format(parseISO(post.date), 'LLLL dd, yyyy')}
            </time>
        </div>
    )
}

const BlogPage = () => {
    const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    return (
        <>
            <Frame position="top">
                <div className="container flex h-full items-center">
                    <h1 className="text-4xl">Blog</h1>
                </div>
            </Frame>
            <Frame position="left">
                left
            </Frame>
            <Frame position="right">
                right
            </Frame>
            <Frame position="bottom">
                bottom
            </Frame>
            <div className="h-full w-full grid grid-cols-3 divide-x">
                {posts.map((post, i) => (
                    <BlogCard key={i} {...post} />
                ))}
            </div>
        </>
    )
};

export default BlogPage;