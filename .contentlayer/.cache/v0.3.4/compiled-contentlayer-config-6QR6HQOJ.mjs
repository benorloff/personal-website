// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import { visit } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";

// components/custom-toc.tsx
var customTOC = (toc) => {
  try {
    const { children } = toc;
    const childrenOfChildren = children?.[0]?.children;
    if (!children?.length || !childrenOfChildren?.length)
      return null;
  } catch (e) {
  }
  return {
    type: "element",
    tagName: "div",
    properties: { className: "toc bg-muted rounded-sm p-4 mt-6" },
    children: [
      {
        type: "element",
        tagName: "p",
        properties: { className: "title" },
        children: [
          {
            type: "text",
            value: "Table of Contents"
          }
        ]
      },
      ...toc.children || []
    ]
  };
};

// contentlayer.config.ts
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
    updated: {
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
      type: "enum",
      options: ["Guide", "Tutorial"]
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
  documentTypes: [Project, Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code")
              return;
            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light"
          }
        }
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
          if (node?.type === "element" && node?.tagName === "div" && node?.properties.className.includes("toc")) {
            node.toc = node.children;
          }
        });
      }
    ]
  }
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-6QR6HQOJ.mjs.map