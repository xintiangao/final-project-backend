/*
  Warnings:

  - You are about to drop the `ExpensesCategoryForCalculationRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpensesCategoryForCalculationRecord" DROP CONSTRAINT "ExpensesCategoryForCalculationRecord_CalculationRecordId_fkey";

-- DropTable
DROP TABLE "ExpensesCategoryForCalculationRecord";
