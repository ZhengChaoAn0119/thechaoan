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
    slug: "5am-project",
    title: "5AM Project",
    excerpt: "為什麼早晨是唯一屬於自己的時間，以及如何善用它。",
    date: "2025-08-29",
    tag: "Productivity",
    featured: true,
  },
  {
    type: "blog",
    slug: "api-gateway",
    title: "API Gateway",
    excerpt: "AWS API Gateway 的路由、授權與整合概念整理。",
    date: "2025-11-02",
    tag: "AWS",
    featured: false,
  },
  {
    type: "blog",
    slug: "bbdbuy-borrow-die",
    title: "BBD (Buy, Borrow, Die)",
    excerpt: "透過購買升值資產、抵押借款、傳承繼承來合法規避資本利得稅的策略。",
    date: "2025-09-07",
    tag: "Finance",
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
