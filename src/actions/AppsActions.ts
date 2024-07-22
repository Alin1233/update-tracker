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
//updates the app version to the latest version
export const updateAppVersion = async (app: Apps) => {
    const prisma = new PrismaClient()
    try {
        const updatedApp = await prisma.apps.update({
            where: {
                id: app.id,
            },
            data: {
                usedVersion: `${app.latestVersion}`,
            },
        })
        console.log(updatedApp)
    } catch (error) {
        console.error('Error updating app version:', error)
    }
    prisma.$disconnect()
}
//modifies the app
export const updateApp = async (
    app: Apps,
    values: z.infer<typeof CreateAppFormSchema>
) => {
    const prisma = new PrismaClient()
    try {
        const updatedApp = await prisma.apps.update({
            where: {
                id: app.id,
            },
            data: {
                name: values.name,
                url: values.url,
                usedVersion: values.version,
                logoUrl: values.logoUrl,
            },
        })
        console.log(updatedApp)
    } catch (error) {
        console.error('Error updating app:', error)
    }
    prisma.$disconnect()
}
export const deleteApp = async (app: Apps) => {
    const prisma = new PrismaClient()
    try {
        const deletedApp = await prisma.apps.delete({
            where: {
                id: app.id,
            },
        })
        console.log(deletedApp)
    } catch (error) {
        console.error('Error updating app version:', error)
    }
    prisma.$disconnect()
}
