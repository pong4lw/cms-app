// app/api/revalidate/route.ts (App Router) or pages/api/revalidate.ts (Pages Router)

import { NextRequest, NextResponse } from "next/server";

const secret = process.env.REVALIDATE_SECRET; // Webhookセキュリティキー

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const token = searchParams.get("secret");

  if (token !== secret || !path) {
    return NextResponse.json(
      { revalidated: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate-path?path=${path}`,
    );
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, error: err },
      { status: 500 },
    );
  }
}
