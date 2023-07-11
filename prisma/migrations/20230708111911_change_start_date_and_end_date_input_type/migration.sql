/*
  Warnings:

  - The `end_date` column on the `SetGoal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_date` column on the `SetGoal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SetGoal" DROP COLUMN "end_date",
ADD COLUMN     "end_date" DATE,
DROP COLUMN "start_date",
ADD COLUMN     "start_date" DATE;
