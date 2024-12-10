-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updateMailTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "updatemailToken" TEXT;
