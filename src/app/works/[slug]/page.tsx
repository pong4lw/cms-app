// src/app/works/[slug]/page.tsx
import { fetchWorkBySlug } from "@/lib/fetchWorks";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

// ✅ 型定義（App Routerに準拠）
interface PageProps {
  params: { slug: string };
}

// ✅ SEO用メタデータ生成関数
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
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
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/works/${slug}`;

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

// ✅ ページコンポーネント本体
export default async function WorkDetailPage({ params }: PageProps) {
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
