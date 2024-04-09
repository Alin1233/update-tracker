import { CreateApp } from './_components/CreateApp'
import { DisplayData } from './_components/DisplayData'
export default function Home() {
    return (
        <main className="border border-red-500">
            <p>Home</p>
            <DisplayData />
            <CreateApp />
        </main>
    )
}
