// app/page.tsx

async function getPosts() {
  const res = await fetch(
    "http://localhost:3000/api/pages?where[status][equals]=published&sort=-createdAt",
    {
      next: { revalidate: 60 },
    },
  );
  return res.json();
}

export default async function Home() {
  const { docs = [] } = await getPosts();

  return (
    <div>
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
    </div>
  );
}
