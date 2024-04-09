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
import { AppType } from '@/schemas/AppType'
import Link from 'next/link'
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
                {props.data.map((data: AppType) => (
                    <TableRow key={data.id}>
                        <TableCell>
                            <Link href={`/view/${data.id}`}>{data.name}</Link>
                        </TableCell>
                        <TableCell>{data.usedVersion}</TableCell>
                        <TableCell>{data.latestVersion}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
