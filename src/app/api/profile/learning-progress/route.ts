import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import { learningProgressResponseSchema } from "@/server/schemas/learning-progress.schema";
import { getGuidesForUser } from "@/server/services/guides-progress.service";

const CATEGORY_COLORS: Record<string, string> = {
  "Mécanique": "#00D1FF",
  "Stratégie": "#8B5CF6",
  Social: "#10B981",
  Communication: "#10B981",
  Mental: "#F59E0B",
  "Rôle": "#EC4899",
};

export async function GET() {
  try {
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

    const guides = await getGuidesForUser(user.id);
    const byCategory = new Map<string, { color: string; totalLessons: number; completedLessons: number }>();

    for (const guide of guides) {
      const prev = byCategory.get(guide.category) ?? {
        color: CATEGORY_COLORS[guide.category] ?? "#6366F1",
        totalLessons: 0,
        completedLessons: 0,
      };

      byCategory.set(guide.category, {
        color: prev.color,
        totalLessons: prev.totalLessons + guide.totalSteps,
        completedLessons: prev.completedLessons + guide.completedSteps,
      });
    }

    const data = learningProgressResponseSchema.parse(
      [...byCategory.entries()].map(([category, value]) => ({
        category,
        color: value.color,
        totalLessons: value.totalLessons,
        completedLessons: value.completedLessons,
      })),
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // During initial setup, the DB or tables may not exist yet.
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { message: "Database is not reachable. Configure DATABASE_URL and run Prisma migrations." },
        { status: 503 },
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
      return NextResponse.json(
        { message: "Database tables are missing. Run `npx prisma migrate dev`." },
        { status: 503 },
      );
    }

    console.error("Failed to load learning progress:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
