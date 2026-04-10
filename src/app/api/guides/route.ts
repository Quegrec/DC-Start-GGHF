import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import { getGuidesForUser } from "@/server/services/guides-progress.service";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    const guides = await getGuidesForUser();
    return NextResponse.json(guides);
  }

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  const guides = await getGuidesForUser(user?.id);
  return NextResponse.json(guides);
}
