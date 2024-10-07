/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server"
import { TypeSafeAction } from "@/lib/async-catch";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db"
import { SuccessResponse } from "@/lib/Success";
import { AddTaskSchema, AddTaskSchemaType, getAllTaskSchema, getAllTaskSchemaType, getOrDeleteTaskByIdSchema, getOrDeleteTaskByIdSchemaType, ServerActionReturnType, updateTaskStatusSchema, updateTaskStatusSchemaType } from "@/types/apiTypes";
import { assginee } from "@/types/common";
import { getServerSession } from "next-auth";

export type additonalType = {
    id: number;
    title: string;
    dueDate: Date | null;
    assigneeId: number;
    workSpaceId: number;
    staus:  "InProgress" | "Completed" | "Todo",
    assginee:assginee
}

export const createNewTask = TypeSafeAction<
AddTaskSchemaType,
ServerActionReturnType<additonalType>
>(async(data)=>{
    const server = await getServerSession(authOptions);
    if(!server){
        throw new Error("unAuth access")
    }
    const result = AddTaskSchema.parse(data);
    const admin = await db.user.findFirst({
        where:{
            id:server.user.id
        },
        include:{
            WorkSpace:true
        }
    });
    if(!admin || !admin?.id){
        throw new Error("unAuth access")
    }
   const tasks =  await db.task.create({
        data:{
            title:result.title,
            staus:result.status,
            // @ts-ignore
            workSpaceId:admin.WorkSpace.id!,
            assigneeId:Number(result.assignee),
        },
        include:{
            assginee:true
        }
    });
    const message = "Task Created";
    return new SuccessResponse(message,201,tasks).serialize();
})

export const getAllTasks = TypeSafeAction<
getAllTaskSchemaType,
ServerActionReturnType<additonalType[]>
>(async(data)=>{
    const result = getAllTaskSchema.parse(data);
    const allTask = await db.task.findMany({
        where:{
            workSpaceId:result.workSpaceId
        },
        include:{
            assginee:true
        }
    });
    const message = "Fetched all Tasks";
    return new SuccessResponse(message,201,allTask).serialize()
})

export const updateTaskStatus = TypeSafeAction<
updateTaskStatusSchemaType,
ServerActionReturnType<additonalType>
>(async(data)=>{
    const result = updateTaskStatusSchema.parse(data);
    const updatedTask = await db.task.update({
        where:{
            id:result.taskId
        },
        data:{
            staus:result.status
        },
        include:{
            assginee:true
        }
    });
    const message = `${updatedTask.id} status updated to ${updatedTask.staus}`;
    return new SuccessResponse(message,200,updatedTask).serialize()
})

export const deleteTaskById = TypeSafeAction<
getOrDeleteTaskByIdSchemaType,
ServerActionReturnType
>(async(data)=>{
    const result = getOrDeleteTaskByIdSchema.parse(data);
    await db.task.delete({
        where:{
            id:result.id
        }
    });
    const message = 'Job Deleted Successfully';
    return new SuccessResponse(message,200).serialize();
});