'use server';

import { TypeSafeAction } from "@/lib/async-catch";
import {nanoid} from "nanoid";
import prisma from "@/lib/db";
import { ServerActionReturnType } from "@/types/apiTypes";
import { addNewDocSchema, addNewDocSchemaType, getAllDocsOfWorkSpaceSchema, getAllDocsOfWorkSpaceSchemaType } from "@/types/vault.types";
import { Doc } from "@/types/common";
import { SuccessResponse } from "@/lib/Success";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

export const getAllDocs = TypeSafeAction<
getAllDocsOfWorkSpaceSchemaType,
ServerActionReturnType<Doc[]>
>(async(data)=>{
    const result = getAllDocsOfWorkSpaceSchema.parse(data);
    const docs = await prisma.safeDoc.findMany({
        where:{
            workspaceId:result.workspaceId
        }
    });
    const message = 'Fetched All Docs from This workspace';
    const allDoces = docs
    return new SuccessResponse(message,200,allDoces).serialize();
});

export const addNewDoc = TypeSafeAction<
addNewDocSchemaType,
ServerActionReturnType
>(async(data)=>{
    const result = addNewDocSchema.parse(data);
    const session = await getServerSession(authOptions);
    const shareId = nanoid(10);
    if(!session || !session.user){
        throw new Error("Unauth accesss")
    }
    await prisma.safeDoc.create({
        data:{
            workspaceId:session.user.workSpaceId,
            name:result.name,
            url:result.url,
            shareId:shareId
        }
    });
    const message = 'New doc added to Safevault';
    revalidatePath("objects/vault")
    return new SuccessResponse(message,201).serialize();
})
