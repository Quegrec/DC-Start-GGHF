import { getLearningProgressByUserId } from "@/server/repositories/learning-progress.repository";
import {
  learningProgressResponseSchema,
  type LearningProgressResponse,
} from "@/server/schemas/learning-progress.schema";

export async function getLearningProgressForUser(userId: string): Promise<LearningProgressResponse> {
  const rows = await getLearningProgressByUserId(userId);
  return learningProgressResponseSchema.parse(rows);
}
