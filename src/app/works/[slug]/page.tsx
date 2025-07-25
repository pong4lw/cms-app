import { fetchWorkBySlug } from "@/lib/fetchWorks";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

type Props = {
  params: { slug: string };
};

// ✅ メタデータ生成（SEO対応）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
  const url = `${process.env.NEXT_PUBLIC_CMS_URL}/works/${params.slug}`;

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

// ✅ ページ本体
export default async function WorkDetailPage({ params }: Props) {
  const work = await fetchWorkBySlug(params.slug);
  if (!work) return notFound();

  // RichTextをHTMLへ変換（null/undefined 対策付き）
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
      <PageLayout layout={page.layout} />

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
