/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicture",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "completedJobs" INTEGER,
ADD COLUMN     "education" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "experience" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "hourlyRate" DOUBLE PRECISION,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "title" TEXT;
