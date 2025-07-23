// lib/fetchWorks.ts
const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_TOKEN = process.env.CMS_API_TOKEN

export async function fetchWorks() {
  const res = await fetch(`${CMS_BASE_URL}/api/pages?depth=1`, {
    headers: { Authorization: `Bearer ${CMS_API_TOKEN}` },
    next: { revalidate: 60 }, // ISR
  })
  const data = await res.json()
  return data.docs
}

export async function fetchWorkBySlug(slug: string) {
  const res = await fetch(
    `${CMS_BASE_URL}/api/pages?where[slug][equals]=${slug}&depth=1`,
    {
      headers: { Authorization: `Bearer ${CMS_API_TOKEN}` },
      next: { revalidate: 60 },
    }
  )
  const data = await res.json()
  return data.docs?.[0] || null
}
