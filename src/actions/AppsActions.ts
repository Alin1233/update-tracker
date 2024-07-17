'use server'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { z } from 'zod'
import { PrismaClient, Apps } from '@prisma/client'
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
                logoUrl: values.logoUrl,
            },
        })
        console.log(createApp)
    } catch (error) {
        console.error('Error creating app:', error)
    }
    prisma.$disconnect()
}
//gets all tracked apps from the DB and query Github for the latest version
export const getAllApps = async (): Promise<Apps[]> => {
    const prisma = new PrismaClient()
    const apps = await prisma.apps.findMany()
    if (apps.length === 0) {
        return []
    }
    prisma.$disconnect()
    return await getLatestVersionsGraphQl(apps)
}
