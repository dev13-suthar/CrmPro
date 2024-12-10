import { z } from "zod";

export const getAllDocsOfWorkSpaceSchema = z.object({
    workspaceId:z.number()
});

export const addNewDocSchema = z.object({
    url:z.string(),
    name:z.string(),
});









export type getAllDocsOfWorkSpaceSchemaType = z.infer<typeof getAllDocsOfWorkSpaceSchema>;
export type addNewDocSchemaType = z.infer<typeof addNewDocSchema>;
