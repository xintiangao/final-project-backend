/*
  Warnings:

  - You are about to drop the column `category` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `expense` on the `Community` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "category",
DROP COLUMN "expense";
