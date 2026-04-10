import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import {
  buildPlayerGamesFromCatalog,
  fetchRawgGames,
  fetchRawgGenres,
  fetchRawgPlatforms,
} from "@/server/services/rawg.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  try {
    const { key } = await params;

    if (key === "games") {
      try {
        const games = await fetchRawgGames();
        return NextResponse.json(games, { status: 200, headers: { "x-dataset-key": key } });
      } catch (error) {
        console.warn("RAWG unavailable for 'games', fallback to AppDataset:", error);
      }
    }

    if (key === "player-games") {
      try {
        const games = await fetchRawgGames();
        const playerGames = buildPlayerGamesFromCatalog(games);
        return NextResponse.json(playerGames, { status: 200, headers: { "x-dataset-key": key } });
      } catch (error) {
        console.warn("RAWG unavailable for 'player-games', fallback to AppDataset:", error);
      }
    }

    if (key === "catalog-options") {
      try {
        const [platforms, genres] = await Promise.all([fetchRawgPlatforms(), fetchRawgGenres()]);
        return NextResponse.json(
          { platforms, genres },
          { status: 200, headers: { "x-dataset-key": key } },
        );
      } catch (error) {
        console.warn("RAWG unavailable for 'catalog-options', fallback to defaults:", error);
        const platforms = ["PC", "PlayStation", "Xbox", "Switch", "Mobile"];
        const genres = ["Action", "RPG", "Aventure", "Stratégie", "Simulation", "Sport", "Indie"];
        return NextResponse.json(
          { platforms, genres },
          { status: 200, headers: { "x-dataset-key": key } },
        );
      }
    }

    const dataset = await db.appDataset.findUnique({
      where: { key },
      select: { payload: true, updatedAt: true },
    });

    if (!dataset) {
      return NextResponse.json({ message: `Dataset '${key}' not found` }, { status: 404 });
    }

    return NextResponse.json(dataset.payload, {
      status: 200,
      headers: {
        "x-dataset-key": key,
        "x-dataset-updated-at": dataset.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { message: "Database is not reachable. Configure DATABASE_URL and run Prisma migrations." },
        { status: 503 },
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P6001") {
      return NextResponse.json(
        {
          message:
            "Invalid DATABASE_URL. For local Docker Postgres use postgresql://..., for Prisma Accelerate use prisma:// or prisma+postgres://.",
        },
        { status: 503 },
      );
    }

    console.error("Failed to load dataset:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
