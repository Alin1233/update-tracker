import React from 'react'
import { getAllApps } from '@/actions/AppsActions'
import { DataTable } from './DataTable'
import { DisplayCard } from './DisplayCard'
export const DisplayData = async () => {
    const data = await getAllApps()
    return (
        <div>
            <DataTable data={data} />
            <div className="flex mb-4">
                {data.map((app) => (
                    <DisplayCard key={app.id} app={app} />
                ))}
            </div>
        </div>
    )
}
