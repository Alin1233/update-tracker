import React from 'react'
import { PrismaClient } from '@prisma/client'
import { AppType } from '@/schemas/AppType'

const page = async ({ params }) => {
    const prisma = new PrismaClient()
    const app = await prisma.apps.findUnique({
        where: {
            id: params.appId,
        },
    })
    return <div>App: {app.name}</div>
}

export default page
