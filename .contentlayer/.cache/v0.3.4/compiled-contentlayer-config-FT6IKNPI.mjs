// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
var ProjectImage = defineNestedType(() => ({
  name: "ProjectImage",
  fields: {
    imageUrl: {
      type: "string",
      required: true
    },
    title: {
      type: "string"
    },
    alt: {
      type: "string"
    }
  }
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    client: {
      type: "string",
      required: true
    },
    year: {
      type: "number",
      required: true
    },
    heroImageUrl: {
      type: "string",
      required: true
    },
    category: {
      type: "list",
      of: { type: "string" }
    },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    images: {
      type: "list",
      of: ProjectImage
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/work/${project._raw.flattenedPath.replace(/projects\/?/, "")}`
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    excerpt: {
      type: "string",
      required: true
    },
    heroImage: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    category: {
      type: "enum",
      options: [
        "Guide",
        "Tutorial",
        "Productivity"
      ]
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace(/posts\/?/, "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Post]
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FT6IKNPI.mjs.map
