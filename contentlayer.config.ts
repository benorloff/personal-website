import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeToc from "@jsdevtools/rehype-toc"
import rehypeSlug from "rehype-slug"
import { customTOC } from "./components/custom-toc";

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

export default makeSource({
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
                        dark: "github-dark",
                        light: "github-light",
                    },
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