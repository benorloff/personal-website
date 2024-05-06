import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'caption',
            type: 'richText',
            editor: lexicalEditor({}),
        },
    ],
    upload: {
        staticDir: path.resolve(process.cwd(), "public/media"),
    },
};