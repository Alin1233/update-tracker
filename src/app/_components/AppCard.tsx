import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { AppType } from '@/schemas/AppType'
import Link from 'next/link'
interface AppCardProps {
    app: AppType
}
const AppCard: React.FC<AppCardProps> = ({ app }) => {
    return (
        <Card className="border border-red-500 h-166 w-64 border-2">
            <CardHeader>
                <CardTitle>
                    <Link href={`/view/${app.id}`}>{app.name}</Link>
                </CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <p>Current Version: {app.usedVersion}</p>
                <p>Latest Version: {app.latestVersion}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p>Update!</p>
            </CardFooter>
        </Card>
    )
}

export default AppCard
