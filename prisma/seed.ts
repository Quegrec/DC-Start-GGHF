import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { guidesData } from "../src/data/guides";
import {
  getCurrentUserSync,
  getUserStatsSync,
  getUserTrophiesSync,
  getGamingDNASync,
  getLearningProgressSync,
} from "../src/data/user";
import { getArchetypesSync, getQuizQuestionsSync } from "../src/data/archetypes";
import {
  getCommunityPostsSync,
  getTopMembersSync,
  getCommunityGroupsSync,
  getCommentsMapSync,
} from "../src/data/community";

const prisma = new PrismaClient();

const CATEGORY_COLORS: Record<string, string> = {
  "Mécanique": "#00D1FF",
  "Stratégie": "#8B5CF6",
  Social: "#10B981",
  Communication: "#10B981",
  Mental: "#F59E0B",
  "Rôle": "#EC4899",
};

function buildLearningProgressFromGuides() {
  const byCategory = new Map<string, { totalLessons: number; completedLessons: number }>();

  for (const guide of guidesData) {
    const prev = byCategory.get(guide.category) ?? { totalLessons: 0, completedLessons: 0 };
    byCategory.set(guide.category, {
      totalLessons: prev.totalLessons + guide.totalSteps,
      completedLessons: prev.completedLessons + guide.completedSteps,
    });
  }

  return [...byCategory.entries()].map(([category, totals]) => ({
    category,
    color: CATEGORY_COLORS[category] ?? "#6366F1",
    totalLessons: totals.totalLessons,
    completedLessons: totals.completedLessons,
  }));
}

async function main() {
  const demoPassword = process.env.DEMO_LOGIN_PASSWORD || "change-me-demo";
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  const archetype = await prisma.archetype.upsert({
    where: { id: "architect" },
    update: {
      name: "L'Architecte",
      icon: "🏗️",
      color: "#F59E0B",
      description:
        "Vous etes un batisseur dans l'ame. Vous transformez des idees en realites et trouvez une satisfaction profonde dans la creation et l'optimisation.",
    },
    create: {
      id: "architect",
      name: "L'Architecte",
      icon: "🏗️",
      color: "#F59E0B",
      description:
        "Vous etes un batisseur dans l'ame. Vous transformez des idees en realites et trouvez une satisfaction profonde dans la creation et l'optimisation.",
    },
  });

  const baseUserData: Prisma.UserUncheckedCreateInput = {
    id: "user-1",
    username: "NovaStar",
    email: "novastar@example.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    level: 24,
    xp: 2847,
    xpToNextLevel: 3500,
    guidesCompleted: 8,
    gamesPlayed: 12,
    hoursPlayed: 156,
    archetypeId: archetype.id,
    joinedAt: new Date("2024-03-15"),
    passwordHash,
  };

  const user = await prisma.user.upsert({
    where: { id: "user-1" },
    update: baseUserData,
    create: baseUserData,
  });

  const progressRows = buildLearningProgressFromGuides();

  await prisma.learningProgress.deleteMany({
    where: { userId: user.id },
  });

  await prisma.learningProgress.createMany({
    data: progressRows.map((row) => ({
      userId: user.id,
      category: row.category,
      color: row.color,
      totalLessons: row.totalLessons,
      completedLessons: row.completedLessons,
    })),
  });

  await prisma.userStats.upsert({
    where: { userId: user.id },
    update: {
      totalXp: 12847,
      currentStreak: 7,
      longestStreak: 23,
      guidesStarted: 15,
      guidesCompleted: 8,
      quizzesTaken: 3,
      communityPosts: 24,
      helpfulVotes: 89,
      rank: 1247,
      percentile: 15,
    },
    create: {
      userId: user.id,
      totalXp: 12847,
      currentStreak: 7,
      longestStreak: 23,
      guidesStarted: 15,
      guidesCompleted: 8,
      quizzesTaken: 3,
      communityPosts: 24,
      helpfulVotes: 89,
      rank: 1247,
      percentile: 15,
    },
  });

  await prisma.userTrophy.deleteMany({
    where: { userId: user.id },
  });

  await prisma.userTrophy.createMany({
    data: [
      {
        id: "trophy-1",
        userId: user.id,
        name: "Premier Pas",
        description: "Completer votre premier guide",
        icon: "🎯",
        color: "#10B981",
        earnedAt: new Date("2024-03-20"),
        rarity: "common",
      },
      {
        id: "trophy-2",
        userId: user.id,
        name: "Erudit",
        description: "Completer 5 guides",
        icon: "📚",
        color: "#00D1FF",
        earnedAt: new Date("2024-04-05"),
        rarity: "common",
      },
      {
        id: "trophy-3",
        userId: user.id,
        name: "Decouverte de soi",
        description: "Passer le test d'archetype",
        icon: "🧬",
        color: "#8B5CF6",
        earnedAt: new Date("2024-03-16"),
        rarity: "common",
      },
      {
        id: "trophy-4",
        userId: user.id,
        name: "Semaine parfaite",
        description: "7 jours de connexion consecutifs",
        icon: "🔥",
        color: "#F59E0B",
        earnedAt: new Date("2024-04-12"),
        rarity: "rare",
      },
      {
        id: "trophy-5",
        userId: user.id,
        name: "Entraide",
        description: "Aider 10 joueurs dans la communaute",
        icon: "🤝",
        color: "#EC4899",
        earnedAt: new Date("2024-04-20"),
        rarity: "rare",
      },
      {
        id: "trophy-6",
        userId: user.id,
        name: "Maitre Stratege",
        description: "Completer tous les guides de strategie",
        icon: "♟️",
        color: "#8B5CF6",
        progress: 3,
        maxProgress: 5,
        rarity: "epic",
      },
      {
        id: "trophy-7",
        userId: user.id,
        name: "Legende",
        description: "Atteindre le niveau 50",
        icon: "👑",
        color: "#F59E0B",
        progress: 24,
        maxProgress: 50,
        rarity: "legendary",
      },
      {
        id: "trophy-8",
        userId: user.id,
        name: "Mentor",
        description: "Recevoir 100 votes utiles",
        icon: "⭐",
        color: "#10B981",
        progress: 89,
        maxProgress: 100,
        rarity: "epic",
      },
    ],
  });

  await prisma.userGamingDna.deleteMany({
    where: { userId: user.id },
  });

  await prisma.userGamingDna.createMany({
    data: [
      { userId: user.id, name: "Strategie", value: 85, color: "#8B5CF6" },
      { userId: user.id, name: "Reflexes", value: 70, color: "#00D1FF" },
      { userId: user.id, name: "Cooperation", value: 90, color: "#10B981" },
      { userId: user.id, name: "Competition", value: 65, color: "#F59E0B" },
      { userId: user.id, name: "Exploration", value: 75, color: "#EC4899" },
      { userId: user.id, name: "Creativite", value: 80, color: "#6366F1" },
    ],
  });

  await prisma.userPersonalityTrait.deleteMany({
    where: { userId: user.id },
  });

  await prisma.userPersonalityTrait.createMany({
    data: [
      { userId: user.id, trait: "Empathie", value: 88, fullMark: 100 },
      { userId: user.id, trait: "Esprit d'equipe", value: 76, fullMark: 100 },
      { userId: user.id, trait: "Perfectionnisme", value: 91, fullMark: 100 },
      { userId: user.id, trait: "Vision strategique", value: 84, fullMark: 100 },
      { userId: user.id, trait: "Resilience", value: 72, fullMark: 100 },
      { userId: user.id, trait: "Communication", value: 79, fullMark: 100 },
    ],
  });

  const datasets: Record<string, unknown> = {
    "user-profile": getCurrentUserSync(),
    "user-stats": getUserStatsSync(),
    "user-trophies": getUserTrophiesSync(),
    "gaming-dna": getGamingDNASync(),
    "learning-progress": getLearningProgressSync(),
    guides: guidesData,
    archetypes: getArchetypesSync(),
    "quiz-questions": getQuizQuestionsSync(),
    games: [],
    "player-games": [],
    "community-posts": getCommunityPostsSync(),
    "community-top-members": getTopMembersSync(20),
    "community-groups": getCommunityGroupsSync(),
    "community-comments": getCommentsMapSync(),
  };

  for (const [key, payload] of Object.entries(datasets)) {
    await prisma.appDataset.upsert({
      where: { key },
      update: { payload: payload as never },
      create: { key, payload: payload as never },
    });
  }

  console.log(`Seed complete for user ${user.username}: ${progressRows.length} categories.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
