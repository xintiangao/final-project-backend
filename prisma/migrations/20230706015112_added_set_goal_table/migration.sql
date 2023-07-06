-- CreateTable
CREATE TABLE "SetGoal" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "totalSaving" INTEGER,
    "duration" TEXT,
    "date" TIMESTAMP(3),
    "expensesPerMonth" INTEGER,
    "savingsPerMonth" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SetGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SetGoal" ADD CONSTRAINT "SetGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
