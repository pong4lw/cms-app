/* eslint-disable @typescript-eslint/no-explicit-any */
// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

async function getWorks(): Promise<{ slug: string; updatedAt: string }[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/pages?sort=-createdAt`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API fetch error:", res.status, text);
      return [];
    }

    const json = await res.json();
    return json?.docs?.map((post: any) => ({
      slug: post.slug,
      updatedAt: post.updatedAt || new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Fetch exception:", err);
    return [];
  }
}

export async function GET() {
  const works = await getWorks();
  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || "https://yourdomain.com";

  const urls = works
    .map(
      (work) => `
  <url>
    <loc>${baseUrl}/works/${work.slug}</loc>
    <lastmod>${work.updatedAt}</lastmod>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/profile</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
