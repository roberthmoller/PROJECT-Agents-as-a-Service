import {z} from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(8).max(50).email(),
    message: z.string().min(5),
});
export type FormSchema = typeof formSchema;