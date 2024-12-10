import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            throw new Error("unauth Accces")
        };

        const User = await prisma.user.findFirst({
            where:{
                id:session.user.id
            },
            select:{
                Name:true,
                userplan:true
            }
        });
        return NextResponse.json({User},{status:200})
    } catch (error) {
        return NextResponse.json({
            error:"Error while Gettinh Usr"
        },{status:400})
    }
}