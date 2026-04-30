import { useEffect, useState } from "react";
import type { WeatherDataAPIResponse } from "../types/weatherData";
import type { CityData } from "../types/CityData";

export default function WeatherCard({ city }: { city: CityData }) {
    const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null);

    const weatherCodeMap: Record<number, string> = {
        0: "Clear sky",

        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Depositing rime fog",

        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",

        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",

        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",

        66: "Light freezing rain",
        67: "Heavy freezing rain",

        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",

        77: "Snow grains",

        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",

        85: "Slight snow showers",
        86: "Heavy snow showers",

        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    };


    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
            const data = await response.json();
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
            <div>
                <p className="text-2xl font-bold">{weather ? Math.round(weather.current_weather.temperature) : "N/A"}{weather?.current_weather_units.temperature}</p>
                <p>{weather ? weatherCodeMap[weather.current_weather.weathercode] ?? "Unknown" : "N/A"}</p>
            </div>
        </div>
    )

}