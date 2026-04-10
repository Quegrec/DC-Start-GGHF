import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";
import type { GamingDNAAttribute } from "@/data/user";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      gamingDna: {
        orderBy: { name: "asc" },
        select: {
          name: true,
          value: true,
          color: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  const dna: GamingDNAAttribute[] = user.gamingDna;
  return NextResponse.json(dna);
}
