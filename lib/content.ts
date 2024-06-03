import { promises as fs } from "fs";
import matter from "gray-matter";
import readingTime, { ReadTimeResults } from "reading-time";
import { humanDate } from "@/lib/utils";

export interface getPostProps {
    slug: string;
}

const getPostReadingTime = (content: string) => {
    const stats = readingTime(content);
    return stats;
}

export const getPost = async ({
    slug
}: getPostProps) => {
    
    let mdx: string;

    // Read the post's MDX file
    try {
        mdx = await fs.readFile(process.cwd() + `/content/posts/${slug}.mdx`, 'utf8');
    } catch (error) {
        throw new Error("Post not found");
    }

    // Parse the post's front matter and content
    const { 
        data: {
            title,
            excerpt,
            date,
            updated,
            tags,
            category,
        },
        content,
    } = matter(mdx);


    // Calculate the post's reading time
    const readTime: ReadTimeResults = getPostReadingTime(content);

    return {
        title,
        excerpt,
        publishDate: humanDate(date),
        updateDate: humanDate(updated),
        tags,
        category,
        content,
        readTime,
    }
}

export const getAllPosts = async () => {
    const posts = await fs.readdir(process.cwd() + '/content/posts');
    const allPosts = await Promise.all(
        posts.map(async (post) => {
            const slug = post.replace(/\.mdx$/, '');
            const { 
                data: {
                    title,
                    excerpt,
                    featuredImage,
                    date,
                    tags,
                    category,
                },
            } = matter(await fs.readFile(process.cwd() + `/content/posts/${slug}.mdx`, 'utf8'));

            return {
                slug,
                title,
                excerpt,
                featuredImage,
                date: humanDate(date),
                tags,
                category,
            }
        })
    );

    return allPosts;
}