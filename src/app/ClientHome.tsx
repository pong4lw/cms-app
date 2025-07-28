// src/components/ClientHome.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

type Doc = {
  id: string;
  title: string;
  slug: {
    current: string;
  };
};

export default function ClientHome({ docs }: { docs: Doc[] }) {
  const [visibleDocs, setVisibleDocs] = useState(docs);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ポートフォリオ一覧</h1>
      <ul className="space-y-2">
        {visibleDocs.map((doc) => (
          <li key={doc.id}>
            <Link
              href={`/works/${doc.slug?.current ?? doc.id}`}
              className="text-blue-500 underline"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
