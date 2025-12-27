import { z } from 'zod';

export const memorySchema = z.object({
    caption: z.string().min(1, 'Kenangan butuh sepatah kata (caption)').max(500, 'Kapan-kapan aja caption panjangnya, ini max 500 ya'),
    image: z.any().refine((file) => file instanceof File, 'Sertakan foto kenanganmu'),
});

export type MemoryFormValues = z.infer<typeof memorySchema>;
