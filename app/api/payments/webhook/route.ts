import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import prisma from "@/lib/db";
import { headers } from "next/headers";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "HsqT2@TxTSK4smq";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const rawHeaders = headers(); // Access the headers
        const razorpaySignature = rawHeaders.get('x-razorpay-signature');
        const secret = webhookSecret;

        // Validate the signature
        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(JSON.stringify(body));
        const digest = shasum.digest("hex");

        // If signature is valid, process the event
        if (digest === razorpaySignature) {
            const event = body;
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30); // Set expiry date to 30 days from today

            if (event.event === "payment.captured") {
                const paymentData = event.payload.payment.entity;
                console.log("Captured Payment Data:", paymentData);
                const existingPayment = await prisma.userPayments.findUnique({
                    where: { id: paymentData.id }
                  });
                  
                  if (!existingPayment) {
                    throw new Error('Payment record not found');
                  }
                await prisma.$transaction(async (prisma) => {
                    try {
                        // Update userPayments table
                        const confirmPayment = await prisma.userPayments.update({
                            where: { orderId: paymentData.order_id },
                            data: {
                                paymentId: paymentData.id,
                                email: paymentData.email,
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

                        // Return success response to Razorpay
                        return NextResponse.json({ status: "OK" }, { status: 200 });
                    } catch (err) {
                        // Log and return a success response to prevent webhook retries
                        console.error("Error updating payment or plan:", err);
                        return NextResponse.json({ error: 'Error updating user data' }, { status: 200 });
                    }
                });

            } else if (event.event === "payment.failed") {
                const paymentData = event.payload.payment.entity;
                console.log("Failed Payment Data:", paymentData);
                return NextResponse.json({ status: "failed" }, { status: 400 });
            } else {
                return NextResponse.json({ error: 'Unhandled event' }, { status: 400 });
            }

        } else {
            // Signature validation failed
            console.error("Invalid signature detected");
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

    } catch (error) {
        // Catch any unhandled errors and return 200 to avoid webhook retries
        console.error('Error in webhook:', error);
        return NextResponse.json({ error: 'Error occurred' }, { status: 200 });
    }
}
