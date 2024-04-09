import React from 'react'
import { PrismaClient } from '@prisma/client'
import { AppType } from '@/schemas/AppType'
import { getLatestVersionAndChangelog } from '@/actions/GithubActions'
import AppCard from '../_components/AppCard'

const prisma = new PrismaClient()

const page = async ({ params }) => {
    const app = await prisma.apps.findUnique({
        where: {
            id: parseInt(params.appId),
        },
    })
    if (!app) {
        return <div>Loading</div>
    }
    const latest = await getLatestVersionAndChangelog(app.url)
    if (latest === 'error') {
        return <div>Error</div>
    }

    return (
        <div>
            <h2>Name: {app.name}</h2>
            <div>
                <p>Current Version: {app.usedVersion}</p>
                <p>Latest Version: {latest.version}</p>
            </div>
            <div>
                <h3>Change Log:</h3>
            </div>
            <div>
                {latest.changelog.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    )
}

export default page
