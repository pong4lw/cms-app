// src/app/works/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWorkBySlug } from "@/lib/fetchWorks";
import PageLayout from "@/components/PageLayout";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const work = await fetchWorkBySlug(params.slug);

  if (!work) {
    return {
      title: "ページが見つかりません",
      description: "指定された制作実績は存在しません。",
    };
  }

  return {
    title: `${work.title} | 制作実績`,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      images: [
        {
          url: work.image?.url ?? "",
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const work = await fetchWorkBySlug(params.slug);
  if (!work) return notFound();

  return (
    <main>
      <h1>{work.title}</h1>
      <PageLayout layout={work.layout} />
    </main>
  );
}
