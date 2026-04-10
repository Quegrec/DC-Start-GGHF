-- CreateTable
CREATE TABLE "UserGuideProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,
    "completedStepIds" JSONB NOT NULL DEFAULT '[]',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGuideProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserGuideProgress_userId_idx" ON "UserGuideProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGuideProgress_userId_guideId_key" ON "UserGuideProgress"("userId", "guideId");

-- AddForeignKey
ALTER TABLE "UserGuideProgress" ADD CONSTRAINT "UserGuideProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
