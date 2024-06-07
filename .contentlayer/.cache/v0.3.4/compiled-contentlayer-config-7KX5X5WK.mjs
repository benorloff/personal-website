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
    featuredImage: {
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
    },
    udpated: {
      type: "date"
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
    featuredImage: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    updated: {
      type: "date"
    },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    category: {
      type: "list"
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
  // mdx: {
  //     remarkPlugins: [],
  //     rehypePlugins: [rehypePrettyCode],
  //     () => (tree) => {
  //         visit(tree, (node) => {
  //             if (node?.type === "element" && node?.tagName === "pre") {
  //                 const [codeEl] = node.children;
  //                 if (codeEl.tagName !== "code") return;
  //                 node.raw = codeEl.children?.[0].value;
  //             }
  //         });
  //     },
  //     [
  //         rehypePrettyCode,
  //         {
  //             theme: {
  //                 dark: "github-dark",
  //                 light: "github",
  //             }
  //         }
  //     ],
  //     () => (tree) => {
  //         visit(tree, (node) => {
  //             if (node?.type === "element" && node?.tagName === "div") {
  //                 if (!("data-rehype-pretty-code-fragment" in node.properties)) {
  //                     return;
  //                 }
  //                 for (const child of node.children) {
  //                     if (child.tagName === "pre") {
  //                         child.properties["raw"] = node.raw;
  //                     }
  //                 }
  //             }
  //         });
  //     },
  // ]
  // }
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7KX5X5WK.mjs.map
