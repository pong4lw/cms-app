// app/components/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          MyApp
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:underline">
            制作実績
          </Link>
          <Link href="/profile" className="hover:underline">
            プロフィール
          </Link>
        </nav>
      </div>
    </header>
  );
}
