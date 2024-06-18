import Link from "next/link";

import { allPosts, Post } from "@/.contentlayer/generated";
import { humanDate } from "@/lib/utils";

interface BlogCardProps extends Post {
    slug: string;
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
        <Link href={slug}>
            <div className="container h-auto py-8 flex flex-col gap-4 hover:bg-foreground/5 border custom-border-color rounded-sm transition-colors duration-300 ease-in-out">
                <div className="h-full flex flex-col gap-4 justify-between items-start">
                    <div>
                        <h2 className="text-2xl text-pretty">
                            {title}
                        </h2>
                        <p className="text-muted-foreground text-pretty">
                            {excerpt}
                        </p>
                    </div>
                    <p className="uppercase text-sm text-muted-foreground">{humanDate(new Date(date))}</p>
                </div>
            </div>
        </Link>
    )
}

const BlogPage = async () => {
    
    // Fetch and sort all posts by date from contentlayer generated post index
    // ./.contentlayer/generated/Post/_index.mjs
    const posts: Post[] = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );


    return (
            <div className="w-full h-full overflow-y-auto">
                <div className="flex flex-col max-w-2xl mx-auto py-8 gap-4 overflow-hidden">
                        {posts.map((post, i) => (
                            <BlogCard key={i} {...post} slug={`/blog/${post._raw.flattenedPath.replace(/posts\/?/, '')}`}/>
                        ))}
                </div>
            </div>
    )
};

export default BlogPage;