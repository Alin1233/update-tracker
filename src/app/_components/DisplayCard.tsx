import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import AppImagePlaceholder from '/public/AppImagePlaceholder.png'

export const DisplayCard = async ({ app }) => {
    if (!app) {
        return <p>Loading</p>
    }
    return (
        <Card>
            <CardHeader>
                <Image
                    src={AppImagePlaceholder}
                    width={250}
                    height={250}
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
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}
