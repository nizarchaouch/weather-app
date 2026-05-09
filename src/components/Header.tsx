import { CloudSun } from "lucide-react";

export default function Header() {
    return (
        <header className="flex flex-col justify-between items-center my-5">
            <div className="flex items-center gap-1 shadow-xl text-sm text-gray-500 py-1 px-3 border border-gray-700 rounded-full mb-4 bg-[linear-gradient(135deg,_hsl(220_40%_14%_/_0.6)_0%,_hsl(220_40%_10%_/_0.4)_100%)]">
                <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                </span>
                <p className="text-sm text-white/60">Live · refreshing in 15s</p>
            </div>
            <div className="flex items-center gap-2" >
                <CloudSun className="h-12 w-12 md:h-16 md:w-16 text-yellow-400 animate-float" strokeWidth={1.5} />
                <div>
                    <h1 className="text-7xl font-bold text-gradient">Skycast</h1>
                </div>
            </div>
            <h3 className="text-lg text-gray-400 mt-6">Real-time weather for your favorite cities, refreshed every 15 seconds.</h3>
        </header>
    )
}