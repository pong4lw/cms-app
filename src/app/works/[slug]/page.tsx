/* eslint-disable @typescript-eslint/no-explicit-any */
// ./src/app/works/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";

type Work = {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  layout?: any;
  image?: {
    url: string;
    alt?: string;
  };
};

type WorkPageParams = { slug: string };

// ✅ ワーク詳細取得（APIから）
async function fetchWorkBySlug(slug: string): Promise<Work | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/works?where[slug][equals]=${slug}`,
    {
      cache: "force-cache", // ISRやSSGに最適
      next: { revalidate: 60 }, // ISR用（オプション）
    }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json?.docs?.[0] ?? null;
}

// ✅ generateStaticParams（slug一覧を取得）
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/works?limit=1000&depth=0&select=slug`,
    { cache: "force-cache" }
  );

  if (!res.ok) return [];

  const json = await res.json();
  return json.docs.map((doc: { slug: string }) => ({ slug: doc.slug }));
}

// ✅ SEO用メタデータ
export async function generateMetadata({
  params,
}: {
  params: WorkPageParams;
}): Promise<Metadata> {
  const work = await fetchWorkBySlug(params.slug);

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
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/works/${params.slug}`;

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

// ✅ ページコンポーネント
export default async function WorkDetailPage({
  params,
}: {
  params: WorkPageParams;
}) {
  const work = await fetchWorkBySlug(params.slug);
  if (!work) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
      {work.image && (
        <img
          src={work.image.url}
          alt={work.image.alt ?? work.title}
          className="rounded-xl mb-6"
        />
      )}
      {work.layout && <PageLayout layout={work.layout} />}
      {work.content && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: work.content }}
        />
      )}
    </main>
  );
}
