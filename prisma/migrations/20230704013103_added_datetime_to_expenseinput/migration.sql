/*
  Warnings:

  - You are about to drop the column `categories` on the `ExpenseInput` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `ExpenseInput` table. All the data in the column will be lost.
  - Added the required column `category` to the `ExpenseInput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseInput" DROP COLUMN "categories",
DROP COLUMN "notes",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "note" TEXT;
