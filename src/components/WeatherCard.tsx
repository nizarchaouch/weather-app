import { useEffect, useState } from "react";
import type { WeatherDataAPIResponse } from "../types/weatherData";
import type { CityData } from "../types/CityData";
import { getWeatherCodeDesc } from "../utlis/getWeatherCodeDesc";
import { WeatherIcon } from "../utlis/getWeatherCodeIcon";
import { weatherGradient } from "../utlis/weatherGradient";
import { MapPin, X } from "lucide-react";

type Props = {
    city: CityData;
    handelDeltCity: (id: number) => void;
}

export default function WeatherCard({ city, handelDeltCity }: Props) {
    const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`);
            const data: WeatherDataAPIResponse = await response.json();
            console.log("fetch weather data", city.name, data);
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [city]);

    return (
        <div className="border border-gray-300 rounded-md p-4 mt-4" style={{
            backgroundImage: weather ? weatherGradient(weather.current.weather_code, !!weather.current.is_day) : undefined,
        }} >
            <div className="flex items-center justify-between ">
                <div>
                    <span className="text-white/70 text-sm font-medium flex items-center gap-1"> <MapPin className="h-3.5 w-3.5" /> {city.country}</span>
                    <h1 className="text-white font-bold text-3xl">{city.name}</h1>
                </div>
                <div onClick={() => handelDeltCity(city.id)} className="cursor-pointer hover:bg-gray-200 ro unded"> <X className="h-4 w-4" /></div>
            </div>
            <div className="flex items-center gap-4 mt-2 justify-between">
                <p className="text-3xl font-bold">{weather ? Math.round(weather.current.apparent_temperature) : "N/A"}{weather?.current_units.apparent_temperature}</p>
                <p className={'text-white ' + (weather?.current.is_day && weather?.current.weather_code === 0 ? "animate-spin-slow" : "animate-float")}>{weather ? <WeatherIcon code={weather.current.weather_code} isDay={!!weather.current.is_day} /> : "N/A"}</p>
            </div>
            <div>
                <p className="text-sm">Wind: {weather ? Math.round(weather.current.wind_speed_10m) : "N/A"} {weather?.current_units.wind_speed_10m}</p>
                <p className="text-xs text-gray-500">Updated At: {city.updatedAt.toLocaleString()}</p>
            </div>
        </div>
    )

}