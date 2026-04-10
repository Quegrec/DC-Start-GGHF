import { NextRequest, NextResponse } from "next/server";
import { searchRawgGames } from "@/server/services/rawg.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const games = await searchRawgGames(q);
    return NextResponse.json(games);
  } catch (error) {
    console.error("RAWG search failed:", error);
    return NextResponse.json([], { status: 200 });
  }
}
