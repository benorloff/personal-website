import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";

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
        heroImageUrl: {
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
        }
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
        heroImage: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
        },
        category: {
            type: 'enum',
            options: [
                'Guide',
                'Tutorial',
                'Productivity',
            ]
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
})