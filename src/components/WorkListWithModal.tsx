"use client";

import { useState } from "react";

interface Post {
  id: string;
  slug: string;
  title: string;
  publishedAt?: string;
}

export default function WorkListWithModal({ posts }: { posts: Post[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState<Post | null>(null);

  const handleOpenModal = (post: Post) => {
    setModalPost(post);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalPost(null);
  };

  return (
    <>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <button
              onClick={() => handleOpenModal(post)}
              className="block w-full text-left hover:text-blue-500"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <time className="text-sm text-gray-400">{post.publishedAt}</time>
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isOpen && modalPost && (
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
    </>
  );
}
