-- CreateTable
CREATE TABLE "ExpensesCategoryForCalculationRecord" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "CalculationRecordId" INTEGER NOT NULL,

    CONSTRAINT "ExpensesCategoryForCalculationRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpensesCategoryForCalculationRecord" ADD CONSTRAINT "ExpensesCategoryForCalculationRecord_CalculationRecordId_fkey" FOREIGN KEY ("CalculationRecordId") REFERENCES "CalculationRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
