'use client'
import React, { useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CreateAppFormSchema } from '@/schemas/CreateAppFormSchema'
import { createAppAction } from '@/actions/AppsActions'
import { getAppVersions } from '@/actions/GithubActions'

export const CreateAppForm = () => {
    const [versions, setVersions] = useState([])
    const form = useForm<z.infer<typeof CreateAppFormSchema>>({
        resolver: zodResolver(CreateAppFormSchema),
        defaultValues: {
            name: '',
            url: '',
            version: '',
        },
    })
    const onSubmit = async (values: z.infer<typeof CreateAppFormSchema>) => {
        await createAppAction(values)
    }
    const handleFetchClick = async () => {
        const githubUrl = form.getValues().url
        const versions = await getAppVersions(githubUrl)
        setVersions(versions)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
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
                                        <SelectValue placeholder="Select a version that you use" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {versions.length > 0 &&
                                        versions.map((version) => (
                                            <SelectItem
                                                value={version}
                                                key={version}
                                            >
                                                {version}
                                            </SelectItem>
                                        ))}

                                    {versions.length === 0 && (
                                        <p>Please fetch versions...</p>
                                    )}
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
            <Button onClick={handleFetchClick}>Fetch Version</Button>
        </Form>
    )
}
