import { fetchWorkBySlug } from '@/lib/fetchWorks'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export default async function WorkDetailPage({ params }: Props) {
  const work = await fetchWorkBySlug(params.slug)
console.log(work)
  if (!work) return notFound()

  // RichTextをHTMLへ変換（null/undefined 対策付き）
  const html = work.content ? work.content : ''

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{work.title}</h1>
      {work.image && (
        <img
          src={work.image.url}
          alt={work.image.alt}
          className="rounded-xl mb-6"
        />
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
