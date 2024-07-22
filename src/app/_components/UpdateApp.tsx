import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Apps } from '@prisma/client'
import { UpdateAppForm } from './UpdateAppForm'
import { Button } from '@/components/ui/button'
interface DisplayCardApps {
    app: Apps
}
export const UpdateApp = ({ app }: DisplayCardApps) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger className=" hover:bg-gray-100">
                    Modify App!
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add an app to keep track of updates
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <UpdateAppForm app={app} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
