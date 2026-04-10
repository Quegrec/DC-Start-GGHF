import { z } from "zod";

export const learningProgressItemSchema = z
  .object({
    category: z.string().min(1),
    color: z.string().min(1),
    totalLessons: z.number().int().nonnegative(),
    completedLessons: z.number().int().nonnegative(),
  })
  .transform((item) => ({
    ...item,
    progress:
      item.totalLessons === 0
        ? 0
        : Math.min(100, Math.round((item.completedLessons / item.totalLessons) * 100)),
  }));

export const learningProgressResponseSchema = z.array(learningProgressItemSchema);

export type LearningProgressResponse = z.infer<typeof learningProgressResponseSchema>;
