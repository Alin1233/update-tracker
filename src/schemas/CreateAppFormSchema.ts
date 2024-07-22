import { z } from 'zod'
export const CreateAppFormSchema = z.object({
    name: z.string().min(2).max(50),
    url: z.string().min(2).max(50),
    version: z.string().min(2).max(50),
    currentVersion: z.string().min(2).max(50),
    logoUrl: z.string().min(2),
})
