/*
  Warnings:

  - Added the required column `chartImage` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "chartImage" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;
