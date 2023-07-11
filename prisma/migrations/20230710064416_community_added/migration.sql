/*
  Warnings:

  - You are about to drop the column `content` on the `Community` table. All the data in the column will be lost.
  - Added the required column `barChartImage` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineChartImage` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pieChartImage` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSaving` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSpend` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "content",
ADD COLUMN     "barChartImage" TEXT NOT NULL,
ADD COLUMN     "lineChartImage" TEXT NOT NULL,
ADD COLUMN     "pieChartImage" TEXT NOT NULL,
ADD COLUMN     "totalSaving" INTEGER NOT NULL,
ADD COLUMN     "totalSpend" INTEGER NOT NULL;
