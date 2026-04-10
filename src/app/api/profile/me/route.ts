import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import type { UserProfile } from "@/data/user";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      archetype: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  const profile: UserProfile = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar ?? "/avatar-placeholder.svg",
    level: user.level,
    xp: user.xp,
    xpToNextLevel: user.xpToNextLevel,
    archetype: user.archetype
      ? {
          id: user.archetype.id,
          name: user.archetype.name,
          icon: user.archetype.icon,
          color: user.archetype.color,
          description: user.archetype.description,
        }
      : null,
    joinedAt: user.joinedAt.toISOString(),
    gamesPlayed: user.gamesPlayed,
    guidesCompleted: user.guidesCompleted,
    hoursPlayed: user.hoursPlayed,
  };

  return NextResponse.json(profile);
}

