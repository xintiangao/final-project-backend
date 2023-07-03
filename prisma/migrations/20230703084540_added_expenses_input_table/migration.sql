-- CreateTable
CREATE TABLE "ExpenseInput" (
    "id" SERIAL NOT NULL,
    "categories" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseInput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseInput" ADD CONSTRAINT "ExpenseInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
