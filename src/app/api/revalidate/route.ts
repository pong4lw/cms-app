// /app/api/revalidate/route.ts（Next.js 13〜の App Router）
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const secret = req.nextUrl.searchParams.get("secret");
  const slug = body?.slug;

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  try {
    const path = `/works/${slug}`; // 再生成したいページのパス
    await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/revalidate?path=${path}&secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
    );
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
