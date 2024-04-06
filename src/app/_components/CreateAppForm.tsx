'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { url } from 'inspector'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { createAppAction } from '@/actions/CreateAppAction'

export const CreateAppForm = () => {
    const form = useForm<z.infer<typeof CreateAppFormSchema>>({
        resolver: zodResolver(CreateAppFormSchema),
        defaultValues: {
            username: '',
            url: '',
            version: '',
        },
    })
    const onSubmit = async (values: z.infer<typeof CreateAppFormSchema>) => {
        await createAppAction(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="app name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of the app you want to track
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url</FormLabel>
                            <FormControl>
                                <Input placeholder="github url" {...field} />
                            </FormControl>
                            <FormDescription>
                                This the github url of the app you want to track
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Version</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can select the current used version of your
                                app.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
