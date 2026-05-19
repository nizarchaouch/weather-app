import { useEffect, useState } from "react";
import { Droplets, MapPin, Thermometer, Wind, X } from "lucide-react";
import type { WeatherDataAPIResponse } from "../types/weatherData";
import type { CityData } from "../types/CityData";
import { WeatherIcon } from "../utlis/getWeatherCodeIcon";
import { weatherGradient, describeWeather } from "../utlis/weatherGradient";
import { Stat } from "./Status";

type Props = {
    city: CityData;
    handelDeltCity: (id: number) => void;
}

export default function WeatherCard({ city, handelDeltCity }: Props) {
    const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Too many requests. Please wait a bit.");
                }

                throw new Error(`Weather request failed: ${response.status}`);
            }

            const data: WeatherDataAPIResponse = await response.json();
            console.log("fetch weather data", city.name, data);
            setWeather(data);
            setError(null);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError(error instanceof Error ? error.message : "Error fetching weather data");
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [city.latitude, city.longitude, city.updatedAt]);

    return (
        <div className="relative border border-gray-700 rounded-3xl p-4 mt-4" style={{
            backgroundImage: weather ? weatherGradient(weather.current.weather_code, !!weather.current.is_day) : undefined,
        }} >
            <div className="absolute z-0 inset-0 bg-[hsl(var(--background))]/40 rounded-3xl" />
            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-white/70 text-sm font-medium flex items-center gap-1"> <MapPin className="h-3.5 w-3.5" /> {city.country}</span>
                        <h1 className="text-white font-bold text-2xl pl-1">{city.name}</h1>
                    </div>
                    <div onClick={() => handelDeltCity(city.id)} className="cursor-pointer hover:bg-gray-200 rounded"> <X className="h-4 w-4" /></div>
                </div>
                <div className="flex items-center gap-4 mt-2 justify-between">
                    <div className="pl-2">
                        <p className="text-5xl font-thin text-white">{weather ? Math.round(weather.current.apparent_temperature) : "N/A"}{weather?.current_units.apparent_temperature}</p>
                        <p className="text-white/70 mt-1 text-">{describeWeather(weather?.current.weather_code ?? 0)}</p>
                    </div>
                    <p className={'text-white ' + (weather?.current.is_day && weather?.current.weather_code === 0 ? "animate-spin-slow" : "animate-float")}>{weather ? <WeatherIcon className="h-20 w-20" code={weather.current.weather_code} isDay={!!weather.current.is_day} /> : "N/A"}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-800">
                    <Stat icon={<Thermometer className="h-3.5 w-3.5" />} label="Feels" value={`${Math.round(weather?.current.apparent_temperature ?? 0)}°`} />
                    <Stat icon={<Droplets className="h-3.5 w-3.5" />} label="Humidity" value={`${weather?.current.relative_humidity_2m}%`} />
                    <Stat icon={<Wind className="h-3.5 w-3.5" />} label="Wind" value={`${Math.round(weather?.current.wind_speed_10m ?? 0)} ${weather?.current_units.wind_speed_10m}`} />
                </div>
            </div>

        </div>
    )

}