/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from "next";
import Link from "next/link";
import { fetchWorks } from "@/lib/fetchWorks";
import WorkListWithModal from "@/components/WorkListWithModal";

// ✅ SEOメタデータ（トップページ用）
export const metadata: Metadata = {
  title: "ポートフォリオ | エンジニアの実績一覧",
  description:
    "フロントエンド・バックエンド・デザインなど幅広い実績を紹介しています。",
  openGraph: {
    title: "ポートフォリオ | エンジニアの実績一覧",
    description:
      "フロントエンド・バックエンド・デザインなど幅広い実績を紹介しています。",
    url: "https://yourdomain.com",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/ogp-home.jpg", // OGP用画像（1200x630 推奨）
        width: 1200,
        height: 630,
        alt: "ポートフォリオのOGP画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ポートフォリオ | エンジニアの実績一覧",
    description:
      "フロントエンド・バックエンド・デザインなど幅広い実績を紹介しています。",
    images: ["https://yourdomain.com/ogp-home.jpg"],
  },
};

export default async function Home() {
  const works = await fetchWorks();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">ポートフォリオ</h1>
        <p className="text-lg mb-6">エンジニアの実績一覧</p>
        <Link href="/profile">プロフィールを見る</Link>
      </section>

      {/* Articles Section */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">実績</h2>
        <WorkListWithModal posts={works} />
      </section>
    </main>
  );
}
