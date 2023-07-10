/*
  Warnings:

  - You are about to drop the column `date` on the `SetGoal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SetGoal" DROP COLUMN "date",
ADD COLUMN     "end_date" INTEGER,
ADD COLUMN     "start_date" INTEGER;
