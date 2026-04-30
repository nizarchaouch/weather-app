import type { CityData } from "../types/CityData";

export default function WeatherCard({city}: {city: CityData}) {
    return (
        <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h2 className="text-xl font-bold">{city.name}</h2>
            <p className="text-gray-600">{city.country}</p>
        </div>
    )

}