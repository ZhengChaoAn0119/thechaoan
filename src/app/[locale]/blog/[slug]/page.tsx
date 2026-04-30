import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

  return (
    <article className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-8">
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
  );
}
