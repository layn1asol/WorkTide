/*
  Warnings:

  - You are about to drop the column `rate` on the `TaskApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskApplication" DROP CONSTRAINT "TaskApplication_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "TaskApplication" DROP CONSTRAINT "TaskApplication_taskId_fkey";

-- AlterTable
ALTER TABLE "TaskApplication" DROP COLUMN "rate",
ALTER COLUMN "coverLetter" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskApplication" ADD CONSTRAINT "TaskApplication_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskApplication" ADD CONSTRAINT "TaskApplication_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
