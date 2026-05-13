type current_units = {
  apparent_temperature: string;
  interval: string;
  is_day: string; 
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_direction_10m: string;
  wind_speed_10m: string;
};
type current = {
  apparent_temperature: number;
  interval: number;
  is_day: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_direction_10m: number;
  wind_speed_10m: number;
};

export type WeatherDataAPIResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: current_units;
  current: current;
};
/* temperature: number;
  apparent: number;
  humidity: number;
  wind: number;
  windDir: number;
  code: number;
  isDay: boolean;
  time: string; */
