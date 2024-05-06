import { Content } from "@/payload/blocks/content";
import type { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
    return data?.title?.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase() ?? value;
};

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  fields: [
    {
        type: "row",
        fields: [
            {
                name: "title",
                type: "text",
                required: true,
                admin: {
                    width: "50%",
                },
            },
            {
                name: "slug",
                type: "text",
                hooks: {
                    beforeChange: [
                        formatSlug,
                    ],
                },
                admin: {
                    readOnly: true,
                    width: "50%",
                },
            },
        ]
    },
    {
        name: "featuredImage",
        type: "upload",
        relationTo: "media",
        required: true,
    },
    {
        name: "layout",
        type: "blocks",
        required: true,
        blocks: [Content],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
