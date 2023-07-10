/*
  Warnings:

  - You are about to drop the `ExpenseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseCategory" DROP CONSTRAINT "ExpenseCategory_setGoalId_fkey";

-- DropTable
DROP TABLE "ExpenseCategory";

-- CreateTable
CREATE TABLE "ExpensesCategoryForCalculationRecord" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "CalculationRecordId" INTEGER NOT NULL,

    CONSTRAINT "ExpensesCategoryForCalculationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseCategoryForSetGoal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "setGoalId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseCategoryForSetGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpensesCategoryForCalculationRecord" ADD CONSTRAINT "ExpensesCategoryForCalculationRecord_CalculationRecordId_fkey" FOREIGN KEY ("CalculationRecordId") REFERENCES "CalculationRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseCategoryForSetGoal" ADD CONSTRAINT "ExpenseCategoryForSetGoal_setGoalId_fkey" FOREIGN KEY ("setGoalId") REFERENCES "SetGoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
