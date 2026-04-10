import { db } from "@/lib/db";
import { guidesData, type Guide } from "@/data/guides";

function toCompletedStepIds(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is number => Number.isInteger(entry));
}

function applyProgressToGuide(guide: Guide, completedStepIds: number[]): Guide {
  const completedSet = new Set(completedStepIds);
  const steps = guide.steps.map((step) => ({
    ...step,
    completed: completedSet.has(step.id),
  }));
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress =
    steps.length === 0 ? 0 : Math.min(100, Math.round((completedSteps / steps.length) * 100));

  return {
    ...guide,
    steps,
    completedSteps,
    totalSteps: steps.length,
    progress,
  };
}

export async function getGuidesForUser(userId?: string): Promise<Guide[]> {
  if (!userId) {
    return guidesData;
  }

  const rows = await db.userGuideProgress.findMany({
    where: { userId },
    select: { guideId: true, completedStepIds: true },
  });

  const byGuideId = new Map<number, number[]>(
    rows.map((row) => [row.guideId, toCompletedStepIds(row.completedStepIds)]),
  );

  return guidesData.map((guide) => applyProgressToGuide(guide, byGuideId.get(guide.id) ?? []));
}

export async function getGuideForUser(guideId: number, userId?: string): Promise<Guide | undefined> {
  const baseGuide = guidesData.find((guide) => guide.id === guideId);
  if (!baseGuide) {
    return undefined;
  }

  if (!userId) {
    return baseGuide;
  }

  const row = await db.userGuideProgress.findUnique({
    where: { userId_guideId: { userId, guideId } },
    select: { completedStepIds: true },
  });

  return applyProgressToGuide(baseGuide, toCompletedStepIds(row?.completedStepIds));
}

export async function updateGuideStepProgressForUser(
  userId: string,
  guideId: number,
  stepId: number,
  completed: boolean,
): Promise<Guide | undefined> {
  const baseGuide = guidesData.find((guide) => guide.id === guideId);
  if (!baseGuide) {
    return undefined;
  }

  const stepExists = baseGuide.steps.some((step) => step.id === stepId);
  if (!stepExists) {
    return undefined;
  }

  const existing = await db.userGuideProgress.findUnique({
    where: { userId_guideId: { userId, guideId } },
    select: { completedStepIds: true },
  });

  const completedSet = new Set(toCompletedStepIds(existing?.completedStepIds));
  if (completed) {
    completedSet.add(stepId);
  } else {
    completedSet.delete(stepId);
  }

  const completedStepIds = [...completedSet].sort((a, b) => a - b);

  await db.userGuideProgress.upsert({
    where: { userId_guideId: { userId, guideId } },
    update: { completedStepIds },
    create: { userId, guideId, completedStepIds },
  });

  return applyProgressToGuide(baseGuide, completedStepIds);
}
