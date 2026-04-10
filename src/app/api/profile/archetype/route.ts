import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/lib/db";

type UpdateArchetypeBody = {
  archetypeId?: string;
};

type ArchetypeDatasetItem = {
  id?: string;
  name?: string;
  icon?: string;
  color?: string;
  longDescription?: string;
  shortDescription?: string;
};

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Non authentifie." }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as UpdateArchetypeBody | null;
    const archetypeId = body?.archetypeId?.trim();

    if (!archetypeId) {
      return NextResponse.json({ message: "archetypeId manquant." }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
    }

    let archetype = await db.archetype.findUnique({
      where: { id: archetypeId },
      select: { id: true },
    });

    // Compatibilité avec une base partiellement seedée: hydrate l'archétype depuis AppDataset.
    if (!archetype) {
      const dataset = await db.appDataset.findUnique({
        where: { key: "archetypes" },
        select: { payload: true },
      });
      const payload = dataset?.payload;
      const rows = Array.isArray(payload) ? (payload as ArchetypeDatasetItem[]) : [];
      const fromDataset = rows.find((item) => item?.id === archetypeId);

      if (fromDataset?.id && fromDataset.name && fromDataset.icon && fromDataset.color) {
        archetype = await db.archetype.upsert({
          where: { id: fromDataset.id },
          update: {
            name: fromDataset.name,
            icon: fromDataset.icon,
            color: fromDataset.color,
            description: fromDataset.longDescription ?? fromDataset.shortDescription ?? fromDataset.name,
          },
          create: {
            id: fromDataset.id,
            name: fromDataset.name,
            icon: fromDataset.icon,
            color: fromDataset.color,
            description: fromDataset.longDescription ?? fromDataset.shortDescription ?? fromDataset.name,
          },
          select: { id: true },
        });
      }
    }

    if (!archetype) {
      return NextResponse.json({ message: "Archétype introuvable." }, { status: 404 });
    }

    await db.user.update({
      where: { id: user.id },
      data: { archetypeId: archetype.id },
    });

    return NextResponse.json({ ok: true, archetypeId: archetype.id });
  } catch (error) {
    console.error("Failed to update user archetype:", error);
    return NextResponse.json({ message: "Erreur serveur lors de la sauvegarde." }, { status: 500 });
  }
}
