import { useEffect, useState } from "react";
import type { WeatherDataAPIResponse } from "../types/weatherData";
import type { CityData } from "../types/CityData";
import { getWeatherCodeDesc } from "../utlis/getWeatherCodeDesc";
import { weatherCodeIcon } from "../utlis/getWeatherCodeIcon";

export default function WeatherCard({ city }: { city: CityData }) {
    const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null);

    


    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
            const data = await response.json();
            console.log("fetch weather data", data);
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [city])

    return (
        <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h1>{city.name}, {city.country}</h1>
            <div className="flex items-center gap-4 mt-2 justify-between">
                <p className="text-3xl font-bold">{weather ? Math.round(weather.current_weather.temperature) : "N/A"}{weather?.current_weather_units.temperature}</p>
                <p className="text-sm gap-5">{weather ? weatherCodeIcon[weather.current_weather.weathercode] ?? "Unknown" : "N/A"}{weather ? getWeatherCodeDesc[weather.current_weather.weathercode] ?? "Unknown" : "N/A"}</p>
            </div>
            <div>
                <p className="text-sm">Wind: {weather ? Math.round(weather.current_weather.windspeed) : "N/A"} {weather?.current_weather_units.windspeed}</p>
            </div>
        </div>
    )

}