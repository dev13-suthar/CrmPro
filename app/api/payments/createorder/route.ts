import { NextRequest, NextResponse } from "next/server";
import Razporpay from "razorpay";
import prisma from "@/lib/db";
import { z } from "zod";

const generateOrderSchema = z.object({
  amount:z.number(),
  userId:z.number(),
});

const AMOUNT_LAMPORT = 100;

const razorpay = new Razporpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseData = generateOrderSchema.safeParse(body);

    if(!parseData.success){
        throw new Error("Invalid Amount")
    }
  
    const ord = await razorpay.orders.create({
      amount:(parseData.data.amount * AMOUNT_LAMPORT),
      currency: "INR",
      receipt: `RECPT:${Date.now()}`,
    });

     await prisma.userPayments.create({
        data:{
          userId:parseData.data.userId,
          orderId:ord.id,
          amount:Number.parseInt(ord.amount.toString()),
        }
     })
    // Sending Created Order Object to Frontend to Open Razor Dialog WIth Options
    return NextResponse.json({ ord }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
