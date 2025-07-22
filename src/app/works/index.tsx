// app/page.tsx
"use client";

import { useEffect, useState } from "react";

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?sort=-createdAt`,
    { next: { revalidate: 60 } },
  );
  const data = await res.json();

  // _status で公開中（published）のみを抽出
  const publishedPosts = data.docs.filter(
    (doc: any) => doc._status === "published",
  );

  return publishedPosts;
}

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <main>
      <h1>記事一覧</h1>
      {posts.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <button
                onClick={() => setSelectedPost(post)}
                className="text-blue-600 underline"
              >
                {post.title}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* モーダル表示 */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-96 shadow-lg relative">
            <h2 className="text-xl font-bold mb-2">{selectedPost.title}</h2>
            <p>{selectedPost.description ?? "詳細はありません。"}</p>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
