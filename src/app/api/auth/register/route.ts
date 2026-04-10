import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

interface RegisterBody {
  email?: string;
  username?: string;
  password?: string;
}

function sanitizeUsername(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export async function POST(request: Request) {
  let body: RegisterBody;

  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ message: "Requete invalide." }, { status: 400 });
  }

  const email = body.email?.toString().trim().toLowerCase();
  const username = body.username ? sanitizeUsername(body.username.toString()) : "";
  const password = body.password?.toString() ?? "";

  if (!email || !username || !password) {
    return NextResponse.json(
      { message: "Email, pseudo et mot de passe sont obligatoires." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: "Email invalide." }, { status: 400 });
  }

  if (username.length < 3 || username.length > 24) {
    return NextResponse.json(
      { message: "Le pseudo doit contenir entre 3 et 24 caracteres." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Le mot de passe doit contenir au moins 8 caracteres." },
      { status: 400 },
    );
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const created = await db.user.create({
      data: {
        email,
        username,
        passwordHash,
        stats: {
          create: {
            totalXp: 0,
            currentStreak: 0,
            longestStreak: 0,
            guidesStarted: 0,
            guidesCompleted: 0,
            quizzesTaken: 0,
            communityPosts: 0,
            helpfulVotes: 0,
            rank: 0,
            percentile: 0,
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return NextResponse.json(
      {
        message: "Compte cree avec succes.",
        user: created,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { message: "Cet email ou ce pseudo est deja utilise." },
        { status: 409 },
      );
    }

    console.error("Registration failed:", error);
    return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 });
  }
}
