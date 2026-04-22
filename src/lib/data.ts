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

export const allContent: ContentItem[] = [
  // Blog posts
  {
    type: "blog",
    slug: "#1",
    title: "Getting Started with Next.js App Router",
    excerpt:
      "A deep dive into the App Router paradigm — layouts, server components, streaming, and how it changes the way you think about data fetching.",
    date: "2026-04-10",
    tag: "Next.js",
    featured: false,
  },
  {
    type: "blog",
    slug: "#2",
    title: "Tailwind CSS Design System Tips",
    excerpt:
      "How to use Tailwind effectively at scale: design tokens, component patterns, and avoiding the utility-class sprawl trap.",
    date: "2026-03-18",
    tag: "CSS",
    featured: true,
  },
  {
    type: "blog",
    slug: "#3",
    title: "First Post on the Way",
    excerpt: "Notes on code, thinking, and craft — stay tuned.",
    date: "coming-soon",
    tag: "Meta",
    featured: false,
  },
  // Projects
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
