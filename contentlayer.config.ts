import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeToc from "@jsdevtools/rehype-toc"
import rehypeSlug from "rehype-slug"
import { customTOC } from "./components/custom-toc";
import { HashnodePost, getHashnodePosts } from "./lib/hashnode";
import fs from "fs/promises";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remark2Rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const services = [
    'Front End Development', 
    'Back End Development', 
    'Design',
    'Strategy',
];

const tech = [
    'Next.js',
    'CSS3',
    'HTML5',
    'JavaScript',
    'TypeScript',
    'Framer Motion',
    'Tailwind CSS',
    'Prisma',
    'PostgreSQL',
    'Supabase',
    'WordPress',
];

const ProjectImage = defineNestedType(() => ({
    name: 'ProjectImage',
    fields: {
        imageUrl: {
            type: 'string',
            required: true,
        },
        title: {
            type: 'string',
        },
        alt: {
            type: 'string',
        }
    }
}));

export const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: `projects/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        client: {
            type: 'string',
            required: true,
        },
        year: {
            type: 'number',
            required: true,
        },
        featuredImage: {
            type: 'string',
            required: true,
        },
        services: {
            type: 'list',
            of: { 
                type: 'enum', 
                options: services,
            },
        },
        tech: {
            type: 'list',
            of: {
                type: 'enum',
                options: tech,
            },
        },
        images: {
            type: 'list',
            of: ProjectImage,
        },
        updated: {
            type: 'date',
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (project) => `/work/${project._raw.flattenedPath.replace(/projects\/?/, '')}`
        },
    },
}));

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        excerpt: {
            type: 'string',
            required: true,
        },
        featuredImage: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        updated: {
            type: 'date',
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
        },
        category: {
            type: 'enum',
            options: ['Guide', 'Tutorial'],
        }
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `/blog/${post._raw.flattenedPath.replace(/posts\/?/, '')}`,
        },
    },
}));

const syncContentFromHashnode = async () => {
    let posts: HashnodePost[] = [];

    try {
        posts = await getHashnodePosts();
    } catch (error) {
        console.error(error);
    }

    // Hashnode response includes erroneous HTML tags in content.markdown,
    // which need to be stripped out before writing to file

    for (const post of posts) {
        // Set the front matter for the post
        const frontMatter = 
            '---\n' + 
            `title: ${post.title}\n` +
            `excerpt: ${post.subtitle}\n` +
            `featuredImage: ${post.coverImage.url}\n` +
            `tags:\n${post.tags.map(tag => `- ${tag.name}`).join('\n')}\n` +
            `date: ${post.publishedAt}\n` +
            `updated: ${post.updatedAt}\n` +
            `category: Guide\n` +
            `---\n`;
        // Get the content of the post
        const content = post.content.markdown;
        // Remove align attributes from images
        const processedContent = content.replace(
            /( align="(left|center|right)"|<div data-node-type="callout-emoji">.*?<\/div>|style=".*?")/g, ''
        )
        // const calloutContent = processedContent.replace(/<div data-node-type="callout">\s+/g, '<Callout type="info">');
        // const closingCallout = calloutContent.replace(/<\/div>/g, '</Callout>');
        const filePath = `./content/posts/${post.slug}.mdx`;
        await fs.writeFile(filePath, [frontMatter, processedContent].join('\n'));

        console.log(`Content synced for post: ${post.title}`);
    }
};

// export default makeSource({
//     syncFiles: syncContentFromHashnode,
//     contentDirPath: 'content',
//     documentTypes: [Project, Post],
//     disableImportAliasWarning: true,
//     markdown: (builder: any) => {
//         builder.use(remarkFrontmatter)
//         builder.use(remarkParse)
//         builder.use(remark2Rehype, { allowDangerousHtml: true })
//         builder.use(rehypeStringify)
//         builder.use(() => (tree) => {
//             visit(tree, (node) => {
//                 if (node?.type === "element" && node?.tagName === "pre") {
//                     const [codeEl] = node.children;
        
//                     if (codeEl.tagName !== "code") return;
        
//                     node.raw = codeEl.children?.[0].value;
//                 }
//             });
//         })
//         builder.use(rehypePrettyCode, {
//             theme: {
//                 dark: "one-dark-pro",
//                 light: "github-light",
//             },
//         })
//         builder.use(rehypeSlug)
//         builder.use(() => (tree) => {
//             visit(tree, (node) => {
//                 if (node?.type === "element" && node?.tagName === "figure") {
//                     if (!("data-rehype-pretty-code-figure" in node.properties)) {
//                         return;
//                     }
        
//                     for (const child of node.children) {
//                         if (child.tagName === "pre") {
//                             child.properties["raw"] = node.raw;
//                         }
//                     }
//                 }
//             });   
//         })
//     },
// })

syncContentFromHashnode();

export default makeSource({
    syncFiles: syncContentFromHashnode,
    contentDirPath: 'content',
    documentTypes: [Project, Post],
    mdx: {
        remarkPlugins: [],
        rehypePlugins: [
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === "element" && node?.tagName === "pre") {
                        const [codeEl] = node.children;
            
                        if (codeEl.tagName !== "code") return;
            
                        node.raw = codeEl.children?.[0].value;
                    }
                });
            },
            [
                rehypePrettyCode, 
                {
                    theme: {
                        dark: "one-dark-pro",
                        light: "github-light",
                    },                
                },
            ],
            [rehypeSlug],
            // [rehypeToc, { customizeTOC: customTOC }],
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === "element" && node?.tagName === "figure") {
                        if (!("data-rehype-pretty-code-figure" in node.properties)) {
                            return;
                        }
            
                        for (const child of node.children) {
                            if (child.tagName === "pre") {
                                child.properties["raw"] = node.raw;
                            }
                        }
                    }
                });
                
            },
        ],
    }
})