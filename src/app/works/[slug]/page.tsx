/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWorkBySlug } from "@/lib/fetchWorks";
import PageLayout from "@/components/PageLayout";
import getPayload from "payload"; // 👈 追加
import configPromise from "@/payload.config"; // 👈 追加

// ✅ 型定義
type WorkPageParams = {
  params: {
    slug: string;
  };
};

// ✅ SEO メタデータ生成
export async function generateMetadata({ params }: WorkPageParams): Promise<Metadata> {
  const { slug } = params;
  const work = await fetchWorkBySlug(slug);

  if (!work) {
    return {
      title: "ページが見つかりません",
      description: "指定された実績は存在しません。",
    };
  }

  const title = `${work.title} | 制作実績`;
  const description = work.description ?? "制作実績の詳細ページです。";
  const ogImage =
    work.image?.url ?? `${process.env.NEXT_PUBLIC_CMS_URL}/default-ogp.jpg`;
  const url = `${process.env.NEXT_PUBLIC_CMS_URL}/works/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ ISR/SSG 用 slug リスト生成
export async function generateStaticParams(): Promise<
  { slug: string }[]
> {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  });

  return pages.docs
    .filter((doc) => doc.slug !== "home")
    .map(({ slug }) => ({ slug }));
}

// ✅ ページコンポーネント
export default async function WorkDetailPage({ params }: WorkPageParams) {
  const work = await fetchWorkBySlug(params.slug);
  if (!work) return notFound();

  const html = work.content ?? "";

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
      {work.image && (
        <img
          src={work.image.url}
          alt={work.image.alt}
          className="rounded-xl mb-6"
        />
      )}
      <PageLayout layout={work.layout} />
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
