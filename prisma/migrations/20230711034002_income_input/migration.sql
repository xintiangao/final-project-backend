/*
  Warnings:

  - Made the column `amount` on table `IncomeInput` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "IncomeInput" ALTER COLUMN "amount" SET NOT NULL;
