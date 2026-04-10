import { db } from "@/lib/db";

export async function getLearningProgressByUserId(userId: string) {
  return db.learningProgress.findMany({
    where: { userId },
    orderBy: { category: "asc" },
    select: {
      category: true,
      color: true,
      totalLessons: true,
      completedLessons: true,
    },
  });
}
