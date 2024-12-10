/*
  Warnings:

  - Added the required column `name` to the `safeDoc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "safeDoc" ADD COLUMN     "name" TEXT NOT NULL;
