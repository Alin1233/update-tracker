'use server'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { getLatestVersion, getLatestVersionsGraphQl } from './GithubActions'
import { AppType } from 'next/app'
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
export const getAllApps = async () => {
    const prisma = new PrismaClient()
    const apps = await prisma.apps.findMany()
    if (apps.length === 0) {
        return []
    }

    return await getLatestVersionsGraphQl(apps)

    const appWithLatestVersion = await Promise.all(
        apps.map(async (app) => {
            const latestVersion = await getLatestVersion(app.url)
            return { ...app, latestVersion: latestVersion }
        })
    )
    return appWithLatestVersion
}
