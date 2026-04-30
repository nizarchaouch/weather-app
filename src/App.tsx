import { useEffect, useState } from "react"
import Header from "./components/Header"
import type { WeatherDataAPIResponse } from "./types/weatherData";
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";
// import type { CityDataAPIResponse } from "./types/CityData";


function App() {
  const [cities, setCities] = useState<CityData[]>([]);

  const handelAddCity = (city: CityData) => {
    setCities((prev) => [...prev, city]);
  }


  return (
    <div className="px-6 py-8">
      <Header />
      <SearchCity handleAddCity={handelAddCity} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div key={city.id}>
            <WeatherCard city={city} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
