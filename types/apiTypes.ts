import { ErrorResponseType } from "@/lib/error";
import { SuccessResponseType } from "@/lib/Success";
import { z } from "zod";

// Server Action Response Type
export type ServerActionReturnType<T = unknown> =
  | SuccessResponseType<T>
  | ErrorResponseType;



  
// # Authentication:
export const signUpSchema = z.object({
  password: z.string().min(5),
  email: z.string().email(),
  userName: z.string(),
});
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const resetPassSchema = z.object({
  email: z.string().email({ message: "Give Valid Email" }),
});
export type resetPassSchemaType = z.infer<typeof resetPassSchema>;


// # User Profile:
export const editUserProfileSchema = z.object({
  email: z.string().email().optional(),
  username: z.string(),
});
export type editUserProfileSchemaType = z.infer<typeof editUserProfileSchema>;

export const updateEmailSchema = z.object({
  email: z.string().email(),
});
export type updateEmailSchemaType = z.infer<typeof updateEmailSchema>;

export const updateEmailConfirmedSchema = z.object({
  token: z.string(),
});
export type updateEmailConfirmedType = z.infer<typeof updateEmailConfirmedSchema>;

export const getUserStatsByIdSchema = z.object({
   id:z.number()
});
export type getUserStatsByIdSchemaType = z.infer<typeof getUserStatsByIdSchema>



// # Password Management:
export const newPasswordSchema = z.object({
  token: z.string().optional(),
  newpassowrd: z.string().min(7, { message: "Password should contain minimum 7 Chars" }),
  confirmnewpassowrd: z.string().min(7, { message: "Password should contain minimum 7 Chars" }),
}).superRefine(({ newpassowrd, confirmnewpassowrd }, ctx) => {
  if (confirmnewpassowrd !== newpassowrd) {
    ctx.addIssue({
      code: "custom",
      message: "Password did not match",
      path: ['confirmPassword'],
    });
  }
});
export type newPasswordSchemaType = z.infer<typeof newPasswordSchema>;



// # People/Workspace:
export const updatePeopleSchema = z.object({
  id: z.number({ message: "Id is Required" }),
  name: z.string().or(z.null()).optional(),
  email: z.string().or(z.null()).optional(),
  phone: z.string().or(z.null()).optional(),
  company: z.string().or(z.null()).optional(),
  city: z.string().or(z.null()).optional(),
  jobTitle: z.string().or(z.null()).optional(),
  workSpaceId: z.number().or(z.null()).optional(),
});
export type updatePeopleSchemaType = z.infer<typeof updatePeopleSchema>;

export const getPeopleOfWorkspaceSchema = z.object({
  adminId: z.number(),
});
export type getPeopleOfWorkspaceType = z.infer<typeof getPeopleOfWorkspaceSchema>;




// # Customers:
export const AddCustomersSchema = z.object({
  Name: z.string().min(2,{message:"Name Length should be Greater than 2"}),
  Email: z.string().email({ message: "Enter Valid Email" }),
  Phone: z.string().min(8,{message:"Enter Valid Phone"}),
  Company: z.string().or(z.null()).optional(),
});
export type AddCustomerSchemaType = z.infer<typeof AddCustomersSchema>;




// # Tasks:
export const AddTaskSchema = z.object({
  assignee: z.string(),
  title: z.string().min(2,{message:"Task Title Should be Greater than Two Chars"}),
  dueDate: z.date().optional(),
  status: z.enum(["InProgress", "Completed", "Todo"]),
});
export type AddTaskSchemaType = z.infer<typeof AddTaskSchema>;

export const getAllTaskSchema = z.object({
  workSpaceId: z.number(),
});
export type getAllTaskSchemaType = z.infer<typeof getAllTaskSchema>;

export const updateTaskStatusSchema = z.object({
  taskId: z.number(),
  status: z.enum(["InProgress", "Completed", "Todo"]),
});
export type updateTaskStatusSchemaType = z.infer<typeof updateTaskStatusSchema>;

export const getOrDeleteTaskByIdSchema = z.object({
  id: z.number(),
});
export type getOrDeleteTaskByIdSchemaType = z.infer<typeof getOrDeleteTaskByIdSchema>;
