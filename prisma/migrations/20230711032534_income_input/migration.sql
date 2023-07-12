/*
  Warnings:

  - Made the column `income` on table `IncomeInput` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "IncomeInput" ADD COLUMN     "amount" INTEGER,
ALTER COLUMN "income" SET NOT NULL,
ALTER COLUMN "income" SET DATA TYPE TEXT;
