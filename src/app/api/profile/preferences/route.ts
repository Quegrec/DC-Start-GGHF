import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";

type PreferencesPayload = {
  platforms: string[];
  genres: string[];
  favoriteGameIds: string[];
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string").map((v) => v.trim()).filter(Boolean);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      preferences: {
        select: {
          platforms: true,
          genres: true,
          favoriteGames: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  const platforms = asStringArray(user.preferences?.platforms);
  const genres = asStringArray(user.preferences?.genres);
  const favoriteGameIds = asStringArray(user.preferences?.favoriteGames);

  const payload: PreferencesPayload = { platforms, genres, favoriteGameIds };
  return NextResponse.json(payload);
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as Partial<PreferencesPayload> | null;
  if (!body) {
    return NextResponse.json({ message: "Payload invalide." }, { status: 400 });
  }

  const platforms = asStringArray(body.platforms).slice(0, 30);
  const genres = asStringArray(body.genres).slice(0, 30);
  const favoriteGameIds = Array.from(new Set(asStringArray(body.favoriteGameIds))).slice(0, 20);

  const updated = await db.userPreferences.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      platforms,
      genres,
      favoriteGames: favoriteGameIds,
    },
    update: {
      platforms,
      genres,
      favoriteGames: favoriteGameIds,
    },
    select: {
      platforms: true,
      genres: true,
      favoriteGames: true,
    },
  });

  return NextResponse.json({
    platforms: asStringArray(updated.platforms),
    genres: asStringArray(updated.genres),
    favoriteGameIds: asStringArray(updated.favoriteGames),
  } satisfies PreferencesPayload);
}
