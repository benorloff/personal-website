import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";

interface BlogCardProps {
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    date: string;
    tags: string[];
    category: string;
}

const BlogCard = async ({ 
    slug,
    title,
    excerpt,
    featuredImage,
    date,
    tags,
    category,
}: BlogCardProps) => {
    return (
        <Link href={`/blog/${slug}`}>
            <div className="container h-auto py-8 flex flex-col gap-4 bg-foreground/5 backdrop-blur-sm border custom-border-color rounded-sm">
                {/* <div className="relative">
                    <Image
                        src={featuredImage}
                        alt={title}
                        width={800}
                        height={400}
                        className="rounded-sm"
                    />
                    {category && (
                        <div className="absolute top-0 right-0 m-2">
                            <Badge variant="default">{category}</Badge>
                        </div>
                    )}
                </div> */}
                <div className="h-full flex flex-col gap-4 justify-between items-start">
                    <div>
                        <h2 className="text-2xl">
                            {title}
                        </h2>
                    </div>
                    <div>
                        <p className="text-muted-foreground">
                            {excerpt}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {tags?.map((tag, i) => (
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
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const BlogPage = async () => {
    const posts = await getAllPosts();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="p-4 h-full w-full flex flex-col gap-4 overflow-y-scroll">
                {posts.map((post, i) => (
                    <BlogCard key={i} {...post} />
                ))}
            </div>
        </Suspense>
    )
};

export default BlogPage;