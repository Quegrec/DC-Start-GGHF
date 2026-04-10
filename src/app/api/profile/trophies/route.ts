import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import type { Trophy } from "@/data/user";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      trophies: {
        orderBy: { id: "asc" },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  const trophies: Trophy[] = user.trophies.map((trophy) => ({
    id: trophy.id,
    name: trophy.name,
    description: trophy.description,
    icon: trophy.icon,
    color: trophy.color,
    earnedAt: trophy.earnedAt ? trophy.earnedAt.toISOString() : null,
    progress: trophy.progress ?? undefined,
    maxProgress: trophy.maxProgress ?? undefined,
    rarity: trophy.rarity as Trophy["rarity"],
  }));

  return NextResponse.json(trophies);
}
