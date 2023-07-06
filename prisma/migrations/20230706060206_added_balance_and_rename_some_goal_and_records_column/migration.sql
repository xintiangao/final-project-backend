/*
  Warnings:

  - You are about to drop the column `income` on the `CalculationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `SetGoal` table. All the data in the column will be lost.
  - The `date` column on the `SetGoal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CalculationRecord" DROP COLUMN "income",
ADD COLUMN     "balancePerMonth" INTEGER,
ADD COLUMN     "incomePerMonth" INTEGER;

-- AlterTable
ALTER TABLE "SetGoal" DROP COLUMN "income",
ADD COLUMN     "balancePerMonth" INTEGER,
ADD COLUMN     "incomePerMonth" INTEGER,
DROP COLUMN "date",
ADD COLUMN     "date" INTEGER;
