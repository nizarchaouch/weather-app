import { useEffect, useState } from "react";
import type { CityData, CityDataAPIResponse } from "../types/CityData";

type Props = {
    handleAddCity: (city: CityData) => void;
}

export default function SearchCity({ handleAddCity }: Props) {
    const [results, setResults] = useState<CityData[]>([]);
    const [query, setQuery] = useState("");

    const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleAddCityClick=(city: CityData)=>{
        handleAddCity({...city, updatedAt: new Date()});
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
        <div>
            <input
                value={query}
                onChange={handelSearch}
                type="text"
                placeholder="Search city"
                className="border border-gray-300 rounded-md px-4 py-2 mt-3 w-full"
            />

            {results.length > 0 && <div className="flex flex-col gap-2 border border-gray-300 rounded-md mt-2 p-4">
                {results.map((result) => (
                    <div className="hover:bg-gray-100 cursor-pointer p-1" key={result.id} onClick={() => handleAddCityClick(result)}>
                        {result.name}, {result.country}
                    </div>
                ))}
            </div>}
        </div>
    );
}
