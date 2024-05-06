import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: `projects/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        }
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (project) => `/work/${project._raw.flattenedPath}`
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
        date: {
            type: 'date',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `/blog/${post._raw.flattenedPath}`
        },
    },
}));

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Project, Post],
})