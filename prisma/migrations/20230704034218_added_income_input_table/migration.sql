-- CreateTable
CREATE TABLE "IncomeInput" (
    "id" SERIAL NOT NULL,
    "monthlyincome" INTEGER,
    "otherincome" INTEGER,
    "date" TIMESTAMP(3),
    "note" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "IncomeInput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncomeInput" ADD CONSTRAINT "IncomeInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
