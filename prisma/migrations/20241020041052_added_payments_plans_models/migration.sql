-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'success', 'fail');

-- CreateEnum
CREATE TYPE "plans" AS ENUM ('Free', 'Plus');

-- CreateTable
CREATE TABLE "UserPayments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentId" TEXT,
    "amount" INTEGER NOT NULL,
    "email" TEXT,
    "Order_Status" "OrderStatus" NOT NULL DEFAULT 'created',

    CONSTRAINT "UserPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlan" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "planStatus" "plans" NOT NULL DEFAULT 'Free',
    "planExpires" TIMESTAMP(3),

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_userId_key" ON "UserPlan"("userId");

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
