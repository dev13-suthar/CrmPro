/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `UserPayments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserPayments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "UserPayments_orderId_key" ON "UserPayments"("orderId");
