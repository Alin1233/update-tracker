import React from 'react'
import { getAllApps } from '@/actions/AppsActions'
import { DisplayCard } from './DisplayCard'
import { Apps } from '@prisma/client'
export const DisplayData = async () => {
    const data: Apps[] = await getAllApps()
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                {data.map((app) => (
                    <DisplayCard key={app.id} app={app} />
                ))}
            </div>
        </div>
    )
}
