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
  url?: string;
};

const blogContent: ContentItem[] = allPosts.map((post) => ({
  type: "blog",
  slug: post.slug,
  title: post.title ?? "",
  excerpt: post.excerpt ?? "",
  date: post.date ?? "coming-soon",
  tag: post.tag ?? "Uncategorised",
}));

const projectContent: ContentItem[] = [
  {
    type: "project",
    slug: "personal-website",
    title: "Personal Website",
    excerpt:
      "This site — built with Next.js App Router, Tailwind CSS. A personal brand and portfolio platform.",
    date: "2026-05-01",
    tag: "Next.js · Tailwind",
    featured: true,
    url: "https://github.com/ZhengChaoAn0119/thechaoan",
  },
  {
    type: "project",
    slug: "ResNet18-34-Classes",
    title: "ResNet18 34 Classes",
    excerpt:
      "This project implements a Mahjong tile classification system using a fine-tuned ResNet18 model. The trained model achieves 97% accuracy on the validation set.",
    date: "2026-03-01",
    tag: "ResNet18 · PyTorch",
    featured: true,
    url: "https://github.com/ZhengChaoAn0119/Mahjong-Tile-Classification-with-ResNet18-34-Classes-",
  },
  {
    type: "project",
    slug: "Mahjong-Tile-yolo",
    title: "Mahjong Tile YOLO",
    excerpt:
      "This Mahjong auxiliary tool automatically identifies Mahjong Soul hand tiles through screen screenshots.",
    date: "2026-03-01",
    tag: "YOLO · PyTorch",
    featured: true,
    url: "https://github.com/ZhengChaoAn0119/Mahjong-Tile-yolo",
  },
];

export const allContent: ContentItem[] = [...blogContent, ...projectContent];
