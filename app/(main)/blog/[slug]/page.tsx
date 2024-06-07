import { notFound } from "next/navigation";

// import { getPost, getAllPosts } from "@/lib/content";
import { Mdx } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { allPosts, type Post } from "@/.contentlayer/generated"
import readingTime, { ReadTimeResults } from "reading-time";
import { humanDate } from "@/lib/utils";
import { remark } from "remark";
import { headingTree } from "@/lib/heading-tree";
import { TableOfContents } from "@/components/table-of-contents";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post._raw.flattenedPath,
    }))
}

// export const generateMetadata = async ({ params }: { params: { slug: string }}) => {
//     const post = await getPost({ slug: params.slug });
    
//     if (!post) return null;
    
//     return {
//         title: post.title,
//         description: post.excerpt,
//         author: "Ben Orloff",
//         publisher: "Ben Orloff",
//         keywords: post.tags,
//     }
// }

const PostPage = async ({
    params
}: {
    params: {
        slug: string;
    }
}) => {

    const post: Post | undefined = allPosts.find((post) => post._raw.flattenedPath === `posts/${params.slug}`)

    // const post = await getPost({ slug: params.slug });

    if (!post) {
        return notFound();
    }

    const { 
        title,
        excerpt,
        featuredImage,
        tags,
        date,
        updated,
    } = post;

    const publishDate = new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const updateDate = updated ? new Date(updated).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }) : null;

    const readTime: ReadTimeResults = readingTime(post.body.raw);


    const getHeadings = async () => { 
        const processedContent = await remark()
            .use(headingTree)
            .process(post.body.raw);
        return processedContent.data.headings;
    };

    const headings = await getHeadings();

    return (
        <div className="flex h-full w-full overflow-x-hidden overflow-y-auto">
            <div 
                className="hidden sticky lg:flex flex-col basis-1/4 justify-center top-0 left-0 h-[calc(100vh-116px)] w-full p-4"
            >
                <TableOfContents nodes={headings} />
            </div>
            <article 
                className="flex flex-col basis-3/4 w-full max-w-2xl mx-auto p-4" 
                data-testid="post-article"
            >
                <h1 
                    className="text-4xl font-medium pb-4"
                    data-testid="post-title"
                >
                    {title}
                </h1>
                <h4 
                    className="pb-4 font-medium" 
                    data-testid="post-excerpt"
                >
                    {excerpt}
                </h4>
                <div className="flex flex-wrap items-center text-muted-foreground gap-4">
                    <p 
                        data-testid="post-publish-date"
                    >
                        {publishDate}
                    </p>
                    <span>&bull;</span>
                    <p 
                        data-testid="post-read-time"
                    >
                        {readTime.text}
                    </p>
                    { updateDate && (
                        <Badge 
                            className="rounded-sm text-base font-normal text-muted-foreground bg-muted"
                            variant="outline" 
                            data-testid="post-update-date"
                        >
                            Last Updated: {updateDate}
                        </Badge>
                    )}
                </div>
                {/* <div 
                    className="pb-4" 
                    data-testid="post-tags"
                >
                    Tags:{' '}
                    {tags?.map((tag: string) => (
                        <Badge key={tag} className="mr-2">{tag}</Badge>
                    ))}
                </div>
                <Badge 
                    className="h-8 mr-2 rounded-sm" 
                    data-testid="post-category"
                    variant="outline"
                >
                    {category}
                </Badge> */}
                <Mdx code={post.body.code}/>
            </article>
        </div>
    )
}

export default PostPage;