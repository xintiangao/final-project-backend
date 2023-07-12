/*
  Warnings:

  - You are about to drop the column `monthlyincome` on the `IncomeInput` table. All the data in the column will be lost.
  - You are about to drop the column `otherincome` on the `IncomeInput` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IncomeInput" DROP COLUMN "monthlyincome",
DROP COLUMN "otherincome",
ADD COLUMN     "income" INTEGER;
