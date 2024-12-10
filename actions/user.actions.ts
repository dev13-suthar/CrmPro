/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
"use server"
import { TypeSafeAction } from "@/lib/async-catch";
import { AddCustomerSchemaType, AddCustomersSchema,editUserProfileSchema,editUserProfileSchemaType,getPeopleOfWorkspaceSchema, getPeopleOfWorkspaceType, getUserStatsByIdSchema, getUserStatsByIdSchemaType, newPasswordSchema, newPasswordSchemaType, ServerActionReturnType, signUpSchema, SignUpSchemaType,updateEmailConfirmedSchema,updateEmailConfirmedType,updateEmailSchema,updateEmailSchemaType,updatePeopleSchema, updatePeopleSchemaType } from "@/types/apiTypes";
import db from "@/lib/db"
import { SuccessResponse } from "@/lib/Success";
import bcrypt from "bcryptjs"
import { adminUser, Pepoles } from "@/types/common";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { decryptEmail, encryptEmail } from "@/lib/security";
import { resend } from "@/lib/resendClient"; 
import UpdatemailEmail from "@/components/emails/UpdateMailEmail";
import { ErrorHandler } from "@/lib/error";




type UserId = {
    id:number
}

export const signupUser = TypeSafeAction<
SignUpSchemaType,
ServerActionReturnType<UserId>
>(async (data) => {
    const result = signUpSchema.parse(data);
    const {userName,password,email} = result;
    const hashedPassword = await bcrypt.hash(password,4)
    const user = await db.user.create({
        data:{
            email:email,
            Name:userName,
            password:hashedPassword,
            resetToken:null,
            resetTokenExpiry:null,
            updatemailToken:null,
            updateMailTokenExpiry:null,
            userplan:{
                create:{
                    planStatus:"Free",
                    planExpires:null
                }
            },
            WorkSpace:{
                create:{
                    name:`${userName} Workspace`,
                }
            },
            
        },include:{
            WorkSpace:true
        }
    });
    const message = "User created";
    const id = user.id
    return new SuccessResponse(message,201,{id}).serialize()
})

export const UpdatePeopleInfo = TypeSafeAction<
updatePeopleSchemaType,
ServerActionReturnType<Pepoles>
>(async (data)=>{
    const result = updatePeopleSchema.parse(data);
    const {id,name,company,email,phone,jobTitle,city} = result;
    const user = await db.people.update({
        where:{
            id:id
        },data:{
            name:name??"",
            company:company??"",
            email:email??"",
            phone,
            jobTitle,
            city
        }
    });
    const message = "Updated"
    const updatedUser = user
    return new SuccessResponse(message,200,updatedUser).serialize()
})

export const AddCustomer = TypeSafeAction<
AddCustomerSchemaType,
ServerActionReturnType<Pepoles>
>(async (data)=>{
    const server = await getServerSession(authOptions);
    if(!server){
        throw new Error("UnAuth")
    }
    const result = AddCustomersSchema.parse(data);
    const usersWorkSpace = await db.workSpace.findFirst({
        where:{
            adminId:server.user.id
        }
    });
     const customer = await db.people.create({
        data:{
            name:result.Name,
            company:result.Company ?? "",
            email:result.Email,
            phone:result.Phone,
            workSpaceId:usersWorkSpace?.id!!
        }
    });
    const message = "Customer Added"
    const peoples = customer
    return new SuccessResponse(message,201,peoples).serialize();
})

export const getPeopleOfWorkSpace = TypeSafeAction<
getPeopleOfWorkspaceType,
ServerActionReturnType<Pepoles[]>
>(async (data)=>{
    const result = getPeopleOfWorkspaceSchema.parse(data);
    const WorkSpace = await db.user.findFirst({
        where:{
            id:result.adminId
        },
        include:{
            WorkSpace:true
        }
    });
    const peoples = await db.people.findMany({
        where:{
            workSpaceId:WorkSpace?.id
        }
    });
    const message = "Return People of THis Workspace";
    const AllPeople = peoples;
    return new SuccessResponse(message,200,AllPeople).serialize()
})

export const editAdminProfile = TypeSafeAction<
editUserProfileSchemaType,
ServerActionReturnType
>(async(data)=>{
    const result = editUserProfileSchema.parse(data);
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        throw new Error("No Session Found")
    };
    await db.user.update({
        where:{
            id:session.user.id
        },
        data:{
            Name:result.username,
        }
    });
    const message = "Updated Admin Name";
    return new SuccessResponse(message,200).serialize();
})

export const changeToNewPassword = TypeSafeAction<
newPasswordSchemaType,
ServerActionReturnType
>(async(data)=>{
    const result = newPasswordSchema.parse(data);
    const findUser = await db.user.findFirst({
        where:{
            resetToken:result.token,
            resetTokenExpiry:{gte:new Date()}
        }
    });
    if(!findUser){
        console.log("invalid or Expired TOken")
        throw new Error("invalid or Expired TOken")
    }
    const hashedPassword = await bcrypt.hash(result.newpassowrd,6);
    await db.user.update({
        where:{
            id:findUser.id
        },
        data:{
            password:hashedPassword
        }
    });
    const message = "PassWord Changed";
    return new SuccessResponse(message,200).serialize();
});

export const generateAndSendUpdateEmailToken = TypeSafeAction<
updateEmailSchemaType,
ServerActionReturnType
>(async(incomingData)=>{
    const result = updateEmailSchema.parse(incomingData);
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        throw new Error("Unauth Access")
    }
    // Generate Token From Input Email;
    const token = encryptEmail(result.email);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    const findUser =  await db.user.update({
        where:{
            id:session.user.id
        },
        data:{
            updatemailToken:token,
            updateMailTokenExpiry:expiresAt
        }
    });
    const url = `${process.env.NEXT_PUBLIC_URL}/changeemail?token=${token}`;
    const {data,error} = await resend.emails.send({
        from:'crmapp@notifications.devsuthar.live',
        to:findUser.email,
        subject:"Verify New Email",
        react:UpdatemailEmail({name:findUser.Name,resetlink:url})
    });
    if(error){
        throw new Error("Failed to Send Email");
    }
    if(data){
        console.log(data);
    };
    return new SuccessResponse("We have Sent u the Verification Email!",200).serialize();
});

export const updateToNewEmail = TypeSafeAction<
updateEmailConfirmedType,
ServerActionReturnType
>(async(incomingData)=>{
    const result = updateEmailConfirmedSchema.parse(incomingData);
    const plainEmail = decryptEmail(result.token);
    const VerifyToken = await db.user.findFirst({
        where:{
            updatemailToken:result.token,
            updateMailTokenExpiry:{gte:new Date()}
        }
    });
    if(!VerifyToken){
        throw new ErrorHandler("Invalid or Expired Token", "BAD_REQUEST");
    };
    await db.user.update({
        where:{
            id:VerifyToken.id
        },
        data:{
            email:plainEmail
        }
    });
    const message = "Your Email Has Been Changed";
    return new SuccessResponse(message,200).serialize();
})

export const getUserwithId = TypeSafeAction<
  getUserStatsByIdSchemaType,
  ServerActionReturnType<adminUser>
>(async (data) => {
  const result = getUserStatsByIdSchema.parse(data);
  const { id } = result;

  const userStatas = await db.user.findFirst({
    where: {
      id: id
    },
    select: {
      Name: true,
      userplan: {
        select: {
          planStatus: true
        }
      }
    }
  });

  if (!userStatas) {
    return new ErrorHandler("User not found","CONFLICT")
  }

  const user: adminUser = {
    Name: userStatas.Name,
    userplan: userStatas.userplan ? { planStatus: userStatas.userplan.planStatus } : undefined,
  };

  return new SuccessResponse("Find", 200, user).serialize();
});
