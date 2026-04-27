import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.md",
  fields: {
    title:   { type: "string" },
    date:    { type: "string" },
    tag:     { type: "string" },
    excerpt: { type: "string" },
    slug:    { type: "string" },
    up:      { type: "string" },
    aliases: { type: "list", of: { type: "string" } },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        (doc as { slug?: string }).slug ??
        doc._raw.flattenedPath
          .replace(/^posts\//, "")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
    },
    title: {
      type: "string",
      resolve: (doc) =>
        (doc as { title?: string }).title ??
        doc._raw.flattenedPath.replace(/^posts\//, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  disableImportAliasWarning: true,
});
