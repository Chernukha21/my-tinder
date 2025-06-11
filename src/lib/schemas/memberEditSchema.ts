import {z} from 'zod';

export const memberEditSchema = z.object({
    name: z.string().min(1, {
        message: "Name is a required",
    }),
    description: z.string().min(1, {
        message: "Description is a required",
    }),
    city: z.string().min(1, {
        message: "City is a required",
    }),
    country: z.string().min(1, {
        message: "Country is a required",
    })
})

export type MemberEditSchema = z.infer<typeof memberEditSchema>;