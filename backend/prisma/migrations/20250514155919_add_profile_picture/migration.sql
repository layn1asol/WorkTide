/*
  Warnings:

  - You are about to drop the `FreelancerProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FreelancerProfile" DROP CONSTRAINT "FreelancerProfile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT;

-- DropTable
DROP TABLE "FreelancerProfile";
