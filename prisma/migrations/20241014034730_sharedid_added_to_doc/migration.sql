/*
  Warnings:

  - A unique constraint covering the columns `[shareId]` on the table `safeDoc` will be added. If there are existing duplicate values, this will fail.
  - The required column `shareId` was added to the `safeDoc` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "safeDoc" ADD COLUMN     "shareId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "safeDoc_shareId_key" ON "safeDoc"("shareId");
