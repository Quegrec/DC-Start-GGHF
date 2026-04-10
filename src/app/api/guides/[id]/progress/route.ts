import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import { updateGuideStepProgressForUser } from "@/server/services/guides-progress.service";

type UpdateProgressBody = {
  stepId?: number;
  completed?: boolean;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;
  const guideId = Number.parseInt(id, 10);
  if (!Number.isInteger(guideId)) {
    return NextResponse.json({ message: "Guide invalide." }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as UpdateProgressBody | null;
  const stepId = Number(body?.stepId);
  const completed = body?.completed ?? true;

  if (!Number.isInteger(stepId)) {
    return NextResponse.json({ message: "stepId invalide." }, { status: 400 });
  }

  const guide = await updateGuideStepProgressForUser(user.id, guideId, stepId, completed);

  if (!guide) {
    return NextResponse.json({ message: "Guide ou etape introuvable." }, { status: 404 });
  }

  return NextResponse.json(guide);
}
