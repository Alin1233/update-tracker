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
                <Image
                    src={AppImagePlaceholder}
                    width={200}
                    height={200}
                    alt="Placeholder picture of the app"
                />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <CardTitle>{app.name}</CardTitle>
                    <Button>Update</Button>
                </div>
                <br />
                <div className="grid grid-cols-2 gap-4">
                    <p>Current version</p>
                    <p>Latest version</p>
                    <p>{app.usedVersion}</p>
                    <p>{app.latestVersion}</p>
                </div>
            </CardContent>
            <CardFooter>
                <a
                    href={app.url + '/releases'}
                    target="_blank"
                    className="underline"
                >
                    Latest changes
                </a>
            </CardFooter>
        </Card>
    )
}
