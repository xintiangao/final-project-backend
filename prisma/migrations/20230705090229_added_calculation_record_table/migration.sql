-- CreateTable
CREATE TABLE "CalculationRecord" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "totalSaving" INTEGER,
    "duration" TEXT,
    "expensesPerMonth" INTEGER,
    "savingsPerMonth" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CalculationRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CalculationRecord" ADD CONSTRAINT "CalculationRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
