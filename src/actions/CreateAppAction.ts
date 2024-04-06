'use server'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

export const createAppAction = async (
    values: z.infer<typeof CreateAppFormSchema>
) => {
    try {
        CreateAppFormSchema.parse(values)
        const prisma = new PrismaClient()
        const createApp = await prisma.apps.create({
            data: {
                name: values.username,
                url: values.url,
                used_version: values.version,
            },
        })
        console.log(createApp)
    } catch (error) {
        console.error('Error creating app:', error)
    }
}
