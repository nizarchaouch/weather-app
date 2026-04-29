import { useEffect, useState } from "react";
import type { CityData, CityDataAPIResponse } from "../types/CityData";

export default function SearchCity() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<CityData[]>([]);

    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            const reponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
            );

            const data: CityDataAPIResponse = await reponse.json();
            setResults(data.results ?? []);
            console.log("fetch data api", data.results);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            <input
                value={query}
                onChange={handelSearch}
                type="text"
                placeholder="Search city"
                className="border border-gray-300 rounded-md px-4 py-2 mt-3 w-full"
            />

            <div className="flex flex-col gap-2">
                {results.map((result) => (
                    <div key={result.id}>
                        {result.name}, {result.country}
                    </div>
                ))}
            </div>
        </div>
    );
}
