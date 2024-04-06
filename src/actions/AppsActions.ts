'use server'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { getLatestVersion } from './GithubActions'

export const createAppAction = async (
    values: z.infer<typeof CreateAppFormSchema>
) => {
    const prisma = new PrismaClient()
    try {
        CreateAppFormSchema.parse(values)
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
export const getAllApps = async () => {
    const prisma = new PrismaClient()
    const apps = await prisma.apps.findMany()
    const appWithLatestVersion = await Promise.all(
        apps.map(async (app) => {
            const latestVersion = await getLatestVersion(app.url)
            return { ...app, latestVersion: latestVersion }
        })
    )
    return appWithLatestVersion
}
