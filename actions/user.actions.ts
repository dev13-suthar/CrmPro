/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
"use server"
import { TypeSafeAction } from "@/lib/async-catch";
import { AddCustomerSchemaType, AddCustomersSchema,editUserProfileSchema,editUserProfileSchemaType,getPeopleOfWorkspaceSchema, getPeopleOfWorkspaceType, ServerActionReturnType, signUpSchema, SignUpSchemaType,updatePeopleSchema, updatePeopleSchemaType } from "@/types/apiTypes";
import db from "@/lib/db"
import { SuccessResponse } from "@/lib/Success";
import bcrypt from "bcryptjs"
import { Pepoles } from "@/types/common";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";



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
            WorkSpace:{
                create:{
                    name:`${userName} Workspace`,
                }
            }
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