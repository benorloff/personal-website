import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from 'contentlayer/generated';

import { Frame } from "@/components/frame";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogCard = (post: Post) => {
    return (
        <Link href={post.url}>
            <div className="container h-auto py-8 flex flex-col gap-4 bg-background">
                <div className="relative">
                    <Image
                        src={post.heroImage}
                        alt={post.title}
                        width={800}
                        height={400}
                    />
                    {post.category && (
                        <div className="absolute top-0 right-0 m-2">
                            <Badge variant="default">{post.category}</Badge>
                        </div>
                    )}
                </div>
                <div className="h-full flex flex-col gap-4 justify-between items-start">
                    <div>
                        <h2 className="text-2xl">
                            <Link href={post.url}>
                                {post.title}
                            </Link>
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-muted-foreground">
                            {post.excerpt}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        {post.tags?.map((tag, i) => (
                            <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        <Avatar>
                            <AvatarImage src="ben.jpg" alt="avatar" />
                            <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                        <p>Ben Orloff</p>
                        <span>&middot;</span>
                        <time dateTime={post.date}>
                            {format(parseISO(post.date), 'LLLL dd, yyyy')}
                        </time>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const BlogPage = () => {
    const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    return (
        <>
            <Frame position="top">
                <div className="container flex h-full items-center">
                    <h1 className="text-2xl">Blog</h1>
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
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] overflow-scroll bg-muted">
                {posts.map((post, i) => (
                    <BlogCard key={i} {...post} />
                ))}
            </div>
        </>
    )
};

export default BlogPage;