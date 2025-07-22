// app/page.tsx

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
