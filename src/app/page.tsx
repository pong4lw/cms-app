/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState<any>(null);

  const handleOpenModal = (post: any) => {
    setModalPost(post);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalPost(null);
  };

  const dummyPosts = [
    { id: 1, slug: "work1", title: "制作実績１", publishedAt: "2025-07-23" },
    { id: 2, slug: "work2", title: "制作実績２", publishedAt: "2025-07-22" },
  ];

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
        <ul className="space-y-4">
          {dummyPosts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              <button
                onClick={() => handleOpenModal(post)}
                className="block w-full text-left hover:text-blue-500"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <time className="text-sm text-gray-400">
                  {post.publishedAt}
                </time>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{modalPost.title}</h3>
            <p>ここに制作実績の詳細を表示します。</p>
            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
