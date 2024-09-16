import { SuccessResponseType } from "@/lib/Success";
import {z} from "zod"
export type ServerActionReturnType<T = unknown> =
  | SuccessResponseType<T>
  | string;
 
export const signUpSchema = z.object({
    password:z.string(),
    email:z.string(),
    userName:z.string()
});
export type SignUpSchemaType = z.infer<typeof signUpSchema>

export const updatePeopleSchema = z.object({
  id:z.number({message:"Id is Required"}),
  name:z.string().or(z.null()).optional(),
  email:z.string().or(z.null()).optional(),
  phone:z.string().or(z.null()).optional(),
  company:z.string() .or(z.null()).optional(),
  city:z.string() .or(z.null()).optional(),
  jobTitle:z.string() .or(z.null()).optional(),
  workSpaceId:z.number().or(z.null()).optional()
});
export type updatePeopleSchemaType = z.infer<typeof updatePeopleSchema>

export const AddCustomersSchema = z.object({
  Name:z.string(),
  Email:z.string().email({message:"Enter Valid Email"}),
  Phone:z.string(),
  Company:z.string().or(z.null()).optional()
});
export type AddCustomerSchemaType = z.infer<typeof AddCustomersSchema>

export const getPeopleOfWorkspaceSchema = z.object({
  adminId:z.number()
});
export type getPeopleOfWorkspaceType = z.infer<typeof getPeopleOfWorkspaceSchema>