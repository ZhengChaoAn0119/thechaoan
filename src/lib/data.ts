import { allPosts } from "contentlayer/generated";

export type ContentType = "blog" | "project";

export type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  tag: string;
  featured?: boolean;
  type: ContentType;
};

const blogContent: ContentItem[] = allPosts.map((post) => ({
  type: "blog",
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt ?? "",
  date: post.date ?? "coming-soon",
  tag: post.tag ?? "Uncategorised",
}));

const projectContent: ContentItem[] = [
  {
    type: "project",
    slug: "#4",
    title: "Personal Website",
    excerpt:
      "This site — built with Next.js App Router, Tailwind CSS, and MDX. A personal brand and portfolio platform.",
    date: "2026-04-01",
    tag: "Next.js · Tailwind",
    featured: true,
  },
  {
    type: "project",
    slug: "#5",
    title: "Portfolio v1",
    excerpt:
      "The first iteration of my portfolio, built with plain React and CSS Modules. A learning exercise in component architecture.",
    date: "2026-01-15",
    tag: "React",
    featured: false,
  },
];

export const allContent: ContentItem[] = [...blogContent, ...projectContent];
