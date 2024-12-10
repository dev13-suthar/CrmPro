'use server';

import { TypeSafeAction } from "@/lib/async-catch";
import { resetPassSchema, resetPassSchemaType, ServerActionReturnType } from "@/types/apiTypes";
import { z } from "zod";
import { SuccessResponse } from "@/lib/Success";
import prisma from "@/lib/db";
import SendingWelcomeMail from "@/components/emails/WelcomeEmail";
import ResetPassEmail from "@/components/emails/ResetPassEmail";
import crypto from "crypto"
import { sendBrodCastMailSchema, sendBrodCastMailType } from "@/types/mailsInput.types";
import BrodCastMails from "@/components/emails/BrodCastMails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { resend } from "@/lib/resendClient";
import { ErrorHandler } from "@/lib/error";



const welcomeMailInputSchema = z.object({
    name:z.string(),
    to:z.string(),
})

type welcomeMailInputType = z.infer<typeof welcomeMailInputSchema>

export const sendWelcomeMail = TypeSafeAction<
welcomeMailInputType,
ServerActionReturnType
>(async(dataa)=>{
    const result = welcomeMailInputSchema.parse(dataa);
    const {data,error} = await resend.emails.send({
        from:'crmapp@notifications.devsuthar.live',
        to:[result.to],
        subject:"Welcome",
        react:SendingWelcomeMail({name:result.name})
    });
    if(error){
        console.log(error);
        throw new Error(error.message);
    }
    console.log(data);
    const message = "Mail Sent Maybe or not";
    return new SuccessResponse(message,200).serialize()
});

export const ResetPasswordAction = TypeSafeAction<
resetPassSchemaType,
ServerActionReturnType
>(async(dataa)=>{
    const result = resetPassSchema.parse(dataa);
    const isUserExist = await prisma.user.findUnique({
        where:{
            email:result.email
        }
    });
    if(!isUserExist){
        console.log("no found user")
        throw new Error("Cannot found User")
    };
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); //1 hour;

    await prisma.user.update({
        where:{
            email:result.email
        },
        data:{
            resetToken:token,
            resetTokenExpiry:expiresAt
        }
    });
    const resetURL = `${process.env.NEXT_PUBLIC_URL}/newpassword?token=${token}`;
    const {error,data} = await resend.emails.send({
        from:'crmapp@notifications.devsuthar.live',
        to:[isUserExist.email],
        subject:"Reset Password",
        react:ResetPassEmail({name:isUserExist.Name,resetlink:resetURL})
    });
    if(error){
        console.log(error);
        throw new Error(error.message);
    }
    console.log(data);
    const message = "Sent You a Reset Link";
    return new SuccessResponse(message,200).serialize()
});

export const SendBrodCastMail = TypeSafeAction<
sendBrodCastMailType,
ServerActionReturnType
>(async(incomingData)=>{
    const res  =  sendBrodCastMailSchema.parse(incomingData);
    const session = await getServerSession(authOptions);
    if(!session){
        throw new Error("Unauth Access")
    };
    // Checking if BrodCast service is Not Blocked 
    const checkBrordCastExpiry = await prisma.workSpace.findFirst({
        where:{
            blockExpires:{gte:new Date()}
        }
    });
    if(checkBrordCastExpiry){
        console.log("U can Only Send 1 Brodcast in 7 days span")
        throw new ErrorHandler("U can Only Send 1 Brodcast in 7 days span","CONFLICT");
    }
    const allCustomers = await prisma.people.findMany({
        where:{
            workSpaceId:session.user.workSpaceId
        },
        select:{
            email:true,
        }
    });
    const emailList:string[] = allCustomers.map(cust=>cust.email).filter(email=>email!==null);
    const {error,data} = await resend.emails.send({
        from:'crmapp@notifications.devsuthar.live',
        to:emailList,
        subject:res.subject,
        react:BrodCastMails({displayHeaderName:`${res.displayName}`,message:`${res.message}`}),
    });
    if(error){
        throw new Error("Mail Delivery Failed")
    };
    if(data){
        // Create Expiry Date as That THese will Expire After 7Days With PRISMA TXN  
       await prisma.$transaction(async (tx)=>{
            await tx.workSpace.update({
                where:{
                    id:session.user.workSpaceId
                },
                data:{
                    blockExpires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7 Days in MS
                }
            });
            await tx.brodCast.create({
                data:{
                    workSpaceId:session.user.workSpaceId,
                    mailId:data.id
                }
            });
       });
    }
    return new SuccessResponse("Mail Sent Successfully!",200).serialize();
});



// const isBlocked = await prisma.workSpace.findFirst({
//     where: {
//         id: session.user.workSpaceId,
//     },
// });

// Check the blockExpires field
// if (isBlocked) {
//     const { blockExpires } = isBlocked;

//     if (blockExpires && blockExpires > new Date()) {
//         // If blockExpires is not null and greater than now, throw an error
//         throw new Error("You are not valid for these services.");
//     } else {
//         // User is valid for the service (either blockExpires is null or in the past)
//         console.log("User is valid for these services.");
//     }
// } else {
//     // Handle case where the workspace is not found
//     throw new Error("Workspace not found.");
// }