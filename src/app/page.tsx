import Link from "next/link";

async function getPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pages?sort=-createdAt`,
      {
        next: { revalidate: 60 },
      },
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
  const baseUri = process.env.NEXT_PUBLIC_API_URL ?? "";

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">！</h1>
        <p className="text-lg mb-6">エンジニアのポートフォリオ</p>
        <Link href="/profile">プロフィールを見る</Link>
      </section>

      {/* Articles Section */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">実績</h2>
        {docs.length === 0 ? (
          <p>実績がありません</p>
        ) : (
          <ul className="space-y-4">
            {docs.map((post: any) => (
              <li key={post.id} className="border-b pb-2">
                <a
                  href={`${baseUri}/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                </a>
                <time className="text-sm text-gray-400">
                  {post.publishedAt}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
