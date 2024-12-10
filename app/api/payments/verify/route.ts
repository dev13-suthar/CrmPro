import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderId, razorpayPaymentId, razorpaySignature } =
    await request.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
      await prisma.userPayments.update({
        where: { orderId: orderId },
        data: {
            paymentId:razorpayPaymentId,
            orderstatus: "success"
        }
    });
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  //FInd the Exitsting Payment record with Status Created and Update it to SUccess;
  await prisma.$transaction(async (prisma) => {
        // Update userPayments table
        const confirmPayment = await prisma.userPayments.update({
            where: { orderId: orderId },
            data: {
                paymentId:razorpayPaymentId,
                orderstatus: "success"
            }
        });

        // Update userPlan table with expiry date
        await prisma.userPlan.update({
            where: { userId: confirmPayment.userId },
            data: {
                planStatus: "Plus",
                planExpires: expiresAt
            }
        });
});
  // Probably some database calls here to update order or add premium status to user
  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}