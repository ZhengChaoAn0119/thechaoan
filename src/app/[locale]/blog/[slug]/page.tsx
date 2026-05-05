import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TableOfContents from "@/app/components/TableOfContents";

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — ChaoAn Zheng` : "Post not found",
    description: post?.excerpt ?? "",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const headings = (post.headings ?? []) as {
    level: number;
    id: string;
    text: string;
  }[];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 flex gap-12">
      <aside className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-24">
          <TableOfContents headings={headings} />
        </div>
      </aside>
      <article className="flex-1 min-w-0 flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="text-[10px] text-indigo-400 tracking-[0.2em] uppercase">
            {post.tag ?? "Post"}
          </span>
          <h1 className="text-4xl font-bold text-zinc-900">{post.title}</h1>
          <span className="text-[10px] text-zinc-600 tracking-widest uppercase">
            {post.date}
          </span>
        </header>
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
    </div>
  );
}
