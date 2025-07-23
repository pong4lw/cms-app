// app/works/page.tsx
import { fetchWorks } from '@/lib/fetchWorks'
import Link from 'next/link'

export default async function WorksPage() {
  const works = await fetchWorks()

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">制作実績</h1>
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {works.map((work) => (
          <li key={work.id} className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-xl font-semibold">{work.title}</h2>
            {work.image && (
              <img
                src={work.image.url}
                alt={work.image.alt}
                className="rounded-lg mt-2"
              />
            )}
            <p className="text-sm mt-2">{work.excerpt}</p>
            <Link
              href={`/works/${work.slug}`}
              className="text-blue-600 mt-4 inline-block"
            >
              詳しく見る →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
