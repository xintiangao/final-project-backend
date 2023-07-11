/*
  Warnings:

  - You are about to drop the column `barChartImage` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `lineChartImage` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `pieChartImage` on the `Community` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "barChartImage",
DROP COLUMN "lineChartImage",
DROP COLUMN "pieChartImage";
