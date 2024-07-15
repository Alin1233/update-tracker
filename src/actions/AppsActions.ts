'use server'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { getLatestVersionsGraphQl } from './GithubActions'

//adds a new tracked app to the db
export const createAppAction = async (
    values: z.infer<typeof CreateAppFormSchema>
) => {
    const prisma = new PrismaClient()
    try {
        CreateAppFormSchema.parse(values)
        const createApp = await prisma.apps.create({
            data: {
                name: values.name,
                url: values.url,
                usedVersion: values.version,
            },
        })
        console.log(createApp)
    } catch (error) {
        console.error('Error creating app:', error)
    }
}
//gets all tracked apps from the DB
export const getAllApps = async () => {
    const prisma = new PrismaClient()
    const apps = await prisma.apps.findMany()
    if (apps.length === 0) {
        return []
    }
    return await getLatestVersionsGraphQl(apps)
}
