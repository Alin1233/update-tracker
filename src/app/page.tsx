import { CreateApp } from './_components/CreateApp'
import { DisplayData } from './_components/DisplayData'
import { DisplayCard } from './_components/DisplayCard'
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Home</p>
            <DisplayData />
            <CreateApp />
            <DisplayCard />
        </main>
    )
}
