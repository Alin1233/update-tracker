import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export const DataTable = (props: any) => {
    return (
        <Table>
            <TableCaption>A list of your tracked apps.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Current Version</TableHead>
                    <TableHead>Latest Version</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.data.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.usedVersion}</TableCell>
                        <TableCell>{data.latestVersion}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
