import { CreateApp } from './_components/CreateApp'
import { DisplayData } from './_components/DisplayData'
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-center w-full">Home</h1>
                <div className="bg-black text-white rounded-full px-4 py-2">
                    <CreateApp />
                </div>
            </div>
            <DisplayData />
        </main>
    )
}
