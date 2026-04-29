import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import { visit, SKIP } from "unist-util-visit";
import rehypePrettyCode from "rehype-pretty-code";

function remarkObsidianImages() {
  return (tree: any) => {
    visit(tree, (node: any, index: number | undefined, parent: any) => {
      if (node.type !== "text" || typeof node.value !== "string") return;
      const pattern = /!?\[\[([^\]]+\.(png|jpg|jpeg|gif|webp|svg))\]\]/gi;
      if (!pattern.test(node.value)) return;
      pattern.lastIndex = 0;

      const parts: any[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(node.value)) !== null) {
        if (match.index > lastIndex)
          parts.push({ type: "text", value: node.value.slice(lastIndex, match.index) });
        parts.push({ type: "image", url: `/images/${match[1]}`, alt: match[1], title: null });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < node.value.length)
        parts.push({ type: "text", value: node.value.slice(lastIndex) });

      if (parent && index !== undefined) {
        parent.children.splice(index, 1, ...parts);
        return [SKIP, index + parts.length];
      }
    });
  };
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.md",
  fields: {
    title:   { type: "string" },
    date:    { type: "string" },
    tag:     { type: "string" },
    excerpt: { type: "string" },
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
  markdown: {
    remarkPlugins: [remarkObsidianImages],
    rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
  },
});
