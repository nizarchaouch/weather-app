
/*.ts export const weatherCodeIcon: Record<number, string> = {
        0: "☀️",

        1: "🌤️",
        2: "⛅",
        3: "☁️",

        45: "🌫️",
        48: "🌫️",

        51: "🌦️",
        53: "🌦️",
        55: "🌧️",

        56: "🌧️",
        57: "🌧️",

        61: "🌦️",
        63: "🌧️",
        65: "🌧️",

        66: "🌧️",
        67: "🌧️",

        71: "🌨️",
        73: "🌨️",
        75: "❄️",

        77: "❄️",

        80: "🌦️",
        81: "🌧️",
        82: "⛈️",

        85: "🌨️",
        86: "❄️",

        95: "⛈️",
        96: "⛈️",
        99: "⛈️",
    }; */

import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Moon, CloudSun, CloudMoon } from "lucide-react";

type Props = { code: number; isDay: boolean; className?: string };

export const WeatherIcon = ({ code, isDay, className = "h-16 w-16" }: Props) => {
  const Icon = (() => {
    if (code === 0) return isDay ? Sun : Moon;
    if (code === 1 || code === 2) return isDay ? CloudSun : CloudMoon;
    if (code === 3) return Cloud;
    if (code === 45 || code === 48) return CloudFog;
    if (code >= 51 && code <= 57) return CloudDrizzle;
    if (code >= 61 && code <= 67) return CloudRain;
    if (code >= 71 && code <= 77) return CloudSnow;
    if (code >= 80 && code <= 82) return CloudRain;
    if (code >= 95) return CloudLightning;
    return Cloud;
  })();

  const colorClass = (() => {
    if (code === 0 && isDay) return "text-[hsl(var(--sun))]";
    if (code === 0 && !isDay) return "text-[hsl(var(--cloud))]";
    if (code >= 95) return "text-[hsl(var(--accent))]";
    if (code >= 61 && code <= 82) return "text-[hsl(var(--rain))]";
    if (code >= 71 && code <= 77) return "text-white";
    return "text-[hsl(var(--cloud))]";
  })();

  return <Icon className={`${className} ${colorClass} drop-shadow-[0_0_20px_currentColor]`} strokeWidth={1.5} />;
};
