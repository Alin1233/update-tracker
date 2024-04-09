import React from 'react'
import { getAllApps } from '@/actions/AppsActions'
import { DataTable } from './DataTable'
import { AppType } from '@/schemas/AppType'
import AppCard from './AppCard'
export const DisplayData = async () => {
    const apps = await getAllApps()
    if (!apps) {
        return <div>Loading</div>
    }
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-16">
                {apps.map((app: AppType) => (
                    <AppCard key={app.id} app={app} />
                ))}
            </div>
        </div>
    )
}
