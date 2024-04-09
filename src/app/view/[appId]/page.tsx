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
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Name: {app.name}</h2>
            <div className="mb-4">
                <p className="text-gray-700">
                    Current Version: {app.usedVersion}
                </p>
                <p className="text-gray-700">
                    Latest Version: {latest.version}
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Change Log:</h3>
            </div>
            <div className="space-y-2">
                {latest.changelog.split('\n').map((line, index) => (
                    <p key={index} className="text-gray-600">
                        {line}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default page
