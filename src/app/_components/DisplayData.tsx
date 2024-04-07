import React from 'react'
import { getAllApps } from '@/actions/AppsActions'
import { DataTable } from './DataTable'
export const DisplayData = async () => {
    const data = await getAllApps()
    return (
        <div>
            <DataTable data={data} />
        </div>
    )
}
