/*
  Warnings:

  - You are about to drop the column `chartImageURL` on the `Community` table. All the data in the column will be lost.
  - Added the required column `category` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "chartImageURL",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "expense" INTEGER NOT NULL;
