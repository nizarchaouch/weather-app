export default function Header() {
    return (
        <header className="flex justify-between items-center">
            <div className="flex items-center gap-2" >
                <div className="text-3xl">🌥️</div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Weather App Dashbord</h1>
                    <h3 className="text-sm text-gray-500">Real-time weather updates every 15 seconds for your favorite cities</h3>
                </div>
            </div>
            <div className=" text-md bg-gray-100 font-medium rounded-full px-2 py-1 " >
                🔴 Live
            </div>
        </header>
    )
}