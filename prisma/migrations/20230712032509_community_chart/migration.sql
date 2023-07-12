/*
  Warnings:

  - Added the required column `chartData` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "chartData" TEXT NOT NULL;
