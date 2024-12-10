import { z } from "zod";

export const sendBrodCastMailSchema = z.object({
    subject:z.string().min(1,"Subject Lenght should be greater than 1"),
    displayName:z.string().min(1,"Length should be Greater than 1"),
    message:z.string().min(10,"Message Should be long Enough, At Least 10 Characters"),
});

export type sendBrodCastMailType = z.infer<typeof sendBrodCastMailSchema>