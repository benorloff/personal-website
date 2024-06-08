import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeToc from "@jsdevtools/rehype-toc"
import rehypeSlug from "rehype-slug"
import { unified } from "unified"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import remarkStringify from "remark-stringify"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import { customTOC } from "./components/custom-toc";
import { HashnodePost, getHashnodePosts } from "./lib/hashnode";
import fs from "fs/promises";
import { sync } from "framer-motion";

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
        category: {
            type: 'list',
            of: { type: 'string'},
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
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
        const processedContent = content.replace(/( align="(left|center|right)"|<div data-node-type="callout-emoji">.*?<\/div>|style=".*?"|<\/div>\s+(?=<\/div>)|<div data-node-type="callout-text">)/g, '')
        const calloutContent = processedContent.replace(/<div data-node-type="callout">\s+/g, '<Callout type="info">');
        const closingCallout = calloutContent.replace(/<\/div>/g, '</Callout>');
        const filePath = `./content/posts/${post.slug}.mdx`;
        await fs.writeFile(filePath, [frontMatter, closingCallout].join('\n'));
        console.log(`Content synced for post: ${post.title}`);
    }
};

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
            [rehypeSanitize, {
                ...defaultSchema,
                attributes: {
                    ...defaultSchema.attributes,
                    'div': [
                        ...(defaultSchema.attributes?.div || []),
                        ['data-node-type', 'callout']
                    ],
                },
            }],
            [
                rehypePrettyCode, 
                {
                    theme: {
                        dark: "github-dark",
                        light: "github-light",
                    },
                    keepBackground: false,
                },
            ],
            [rehypeSlug],
            [rehypeToc, { customizeTOC: customTOC }],
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