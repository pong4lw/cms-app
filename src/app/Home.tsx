/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useState } from "react";
import Modal from "./components/Modal"; // パスを調整してください

async function getPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pages?sort=-createdAt`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      console.error("Fetch failed:", res.statusText);
      return { docs: [] };
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { docs: [] };
  }
}

export default async function Home() {
  const { docs = [] } = await getPosts();

  // Note: useState/useEffectはクライアントコンポーネントでのみ使用可能
  // ここからクライアントコンポーネントに変更する必要あり
  return <ClientHome docs={docs} />;
}
