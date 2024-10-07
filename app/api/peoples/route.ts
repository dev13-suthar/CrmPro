import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET(){
    try {
        const server = await getServerSession(authOptions);
        if(!server || !server.user){
            return NextResponse.json({
                error:"UnAuth Access"
            },{status:403})
        };
        const workSpace = await db.user.findFirst({
            where:{
                id:server.user.id
            },
            include:{
                WorkSpace:true
            }
        });
        const peoples = await db.people.findMany({
            where:{
                workSpaceId:workSpace?.id
            }
        });
        return NextResponse.json({peoples},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:400})
    }
}