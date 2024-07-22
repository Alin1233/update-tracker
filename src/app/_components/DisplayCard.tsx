'use client'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import AppImagePlaceholder from '/public/AppImagePlaceholder.png'
import { Apps } from '@prisma/client'
import clsx from 'clsx'
import { updateAppVersion } from '@/actions/AppsActions'
import { UpdateApp } from './UpdateApp'
interface DisplayCardApps {
    app: Apps
}

export const DisplayCard = async ({ app }: DisplayCardApps) => {
    if (!app) {
        return <p>Loading</p>
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-center items-center">
                    <Image
                        src={app.logoUrl ? app.logoUrl : AppImagePlaceholder}
                        width={100}
                        height={100}
                        alt="Placeholder picture of the app"
                        unoptimized
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <CardTitle>{app.name}</CardTitle>
                    <Button onClick={() => updateAppVersion(app)}>
                        Update
                    </Button>
                </div>
                <br />
                <div className="grid grid-cols-2 gap-4">
                    <p>Current version</p>
                    <p>Latest version</p>
                    <p>{app.usedVersion}</p>
                    <p
                        className={clsx({
                            'text-red-500':
                                app.usedVersion != app.latestVersion,
                        })}
                    >
                        {app.latestVersion}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4">
                <a
                    href={app.url + '/releases'}
                    target="_blank"
                    className="underline"
                >
                    Latest changes
                </a>
                <UpdateApp app={app} />
            </CardFooter>
        </Card>
    )
}
