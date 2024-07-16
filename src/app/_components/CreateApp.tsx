import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { CreateAppForm } from './CreateAppForm'
export const CreateApp = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>Add</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add an app to keep track of updates
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <CreateAppForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}
