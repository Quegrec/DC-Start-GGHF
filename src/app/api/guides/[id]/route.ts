import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import { getGuideForUser } from "@/server/services/guides-progress.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const guideId = Number.parseInt(id, 10);

  if (!Number.isInteger(guideId)) {
    return NextResponse.json({ message: "Guide invalide." }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  let userId: string | undefined;
  if (email) {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    userId = user?.id;
  }

  const guide = await getGuideForUser(guideId, userId);

  if (!guide) {
    return NextResponse.json({ message: "Guide introuvable." }, { status: 404 });
  }

  return NextResponse.json(guide);
}
