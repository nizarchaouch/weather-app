import { useEffect, useState } from "react";
import type { CityData, CityDataAPIResponse } from "../types/CityData";
import { Plus, Search } from "lucide-react";

type Props = {
    handleAddCity: (city: CityData) => void;
    cities: CityData[];
}

export default function SearchCity({ handleAddCity, cities }: Props) {
    const [results, setResults] = useState<CityData[]>([]);
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);


    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleAddCityClick = (city: CityData) => {
        handleAddCity({ ...city, updatedAt: new Date() });
        setResults([]);
        setQuery("");
    }

    // Debounce the API call to avoid making a request on every keystroke
    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                const reponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${query}`,
                    { signal: controller.signal }
                );

                const data: CityDataAPIResponse = await reponse.json();
                setResults(data.results ?? []);
                console.log("fetch data api", data.results);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                console.error("Failed to fetch cities", error);
            }
        }, 500);

        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [query]);


    return (
        <div className="relative flex flex-col items-center mb-8">
            <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    value={query}
                    onChange={handelSearch}
                    type="text"
                    placeholder="Add a city..."
                    className="h-12 w-full rounded-full border border-gray-700 bg-[linear-gradient(135deg,_hsl(220_40%_14%_/_0.6)_0%,_hsl(220_40%_10%_/_0.4)_100%)] pl-10 pr-4 text-lg text-white/80 shadow-xl placeholder:text-white/50 focus:border-sky-400 focus:outline-none"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>

            <div
                className={`absolute mt-13 w-full max-w-md rounded-xl border border-gray-700
             bg-[linear-gradient(135deg,_hsl(220_40%_14%_/_0.6)_0%,_hsl(220_40%_10%_/_0.4)_100%)]
             shadow-lg z-10 backdrop-blur-sm transition-all duration-300 ease-out
             ${isFocused && results.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
            >
                {results.map((result) => {
                    const alreadyExists = cities.some((city: CityData) => city.id === result.id);
                    return (<div
                        className={`flex items-center justify-between hover:bg-gray-700 text-white py-2 px-4 ${alreadyExists ? "cursor-not-allowed" : "cursor-pointer"}`}
                        key={result.id}
                        onMouseDown={() => {
                            if (alreadyExists) return;
                            handleAddCityClick(result);
                        }}>
                        <div className={` ${alreadyExists ? "text-gray-600" : "text-white"}`} >
                            <p className="font-bold">{result.name}</p>
                            <p className={`text-sm ${alreadyExists ? "text-gray-600" : "text-gray-400"}`}>{result.admin1}, {result.country}</p>
                        </div>
                        <div>
                            <Plus className={`w-5 h-5 ${alreadyExists ? "text-gray-600" : "text-sky-400"}`} />
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}
