import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import type { UserStats } from "@/data/user";
import { getGuidesForUser } from "@/server/services/guides-progress.service";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      stats: {
        select: {
          totalXp: true,
          currentStreak: true,
          longestStreak: true,
          guidesStarted: true,
          guidesCompleted: true,
          quizzesTaken: true,
          communityPosts: true,
          helpfulVotes: true,
          rank: true,
          percentile: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  const baseStats: UserStats = user.stats ?? {
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    guidesStarted: 0,
    guidesCompleted: 0,
    quizzesTaken: 0,
    communityPosts: 0,
    helpfulVotes: 0,
    rank: 0,
    percentile: 0,
  };

  const guides = await getGuidesForUser(user.id);
  const guidesStarted = guides.filter((guide) => guide.progress > 0).length;
  const guidesCompleted = guides.filter((guide) => guide.progress === 100).length;

  const stats: UserStats = {
    ...baseStats,
    guidesStarted,
    guidesCompleted,
  };

  return NextResponse.json(stats);
}
