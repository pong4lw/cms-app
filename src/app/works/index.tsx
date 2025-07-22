// app/page.tsx

async function getPosts() {
  const res = await fetch(
    "http://localhost:3000/api/pages?where[status][equals]=published&sort=-createdAt",
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const { docs } = await getPosts();

  return (
    <main>
      <h1>記事一覧</h1>
      {docs.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <ul>
          {docs.map((post: any) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
