import {z} from 'zod';

export const messageSchema = z.object({
    text: z.string().min(1, {
        message: 'Some content is required',
    }),
})

export type MessageSchema = z.infer<typeof messageSchema>;