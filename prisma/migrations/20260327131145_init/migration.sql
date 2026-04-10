-- CreateEnum
CREATE TYPE "TrophyRarity" AS ENUM ('common', 'rare', 'epic', 'legendary');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "archetypeId" TEXT;

-- CreateTable
CREATE TABLE "Archetype" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Archetype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "guidesStarted" INTEGER NOT NULL DEFAULT 0,
    "guidesCompleted" INTEGER NOT NULL DEFAULT 0,
    "quizzesTaken" INTEGER NOT NULL DEFAULT 0,
    "communityPosts" INTEGER NOT NULL DEFAULT 0,
    "helpfulVotes" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "percentile" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTrophy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3),
    "progress" INTEGER,
    "maxProgress" INTEGER,
    "rarity" "TrophyRarity" NOT NULL,

    CONSTRAINT "UserTrophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGamingDna" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "UserGamingDna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPersonalityTrait" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trait" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "fullMark" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "UserPersonalityTrait_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");

-- CreateIndex
CREATE INDEX "UserTrophy_userId_idx" ON "UserTrophy"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGamingDna_userId_name_key" ON "UserGamingDna"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UserPersonalityTrait_userId_trait_key" ON "UserPersonalityTrait"("userId", "trait");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_archetypeId_fkey" FOREIGN KEY ("archetypeId") REFERENCES "Archetype"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrophy" ADD CONSTRAINT "UserTrophy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGamingDna" ADD CONSTRAINT "UserGamingDna_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPersonalityTrait" ADD CONSTRAINT "UserPersonalityTrait_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
