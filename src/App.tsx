import { useEffect, useState } from "react"
import Header from "./components/Header"
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";
import "./index.css";
// import type { CityDataAPIResponse } from "./types/CityData";


function App() {
  const [refreshIn, setRefreshIn] = useState<number>(15);
  const [cities, setCities] = useState<CityData[]>([]);

  const handelAddCity = (city: CityData) => {
    setCities((prev) => [...prev, city]);
  }

  const handelDeltCity = (id: number) => {
    setCities((prev) => prev.filter(city => city.id !== id));
  }

  //Touch the updatedAT for each city to trigger fresh data in the weather card
   const touchCities = () => {
     let citiesCopy = [...cities];
     citiesCopy = citiesCopy.map(city => ({ ...city, updatedAt: new Date() }));
     setCities(citiesCopy);
   };

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((prev) => {
        if (prev <= 1) {
          setCities((prevCities) =>
            prevCities.map((city) => ({
              ...city,
              updatedAt: new Date(),
            }))
          );

          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 py-8">
      <Header refreshIn={refreshIn} />
      <SearchCity handleAddCity={handelAddCity} cities={cities} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div key={city.id}>
            <WeatherCard city={city} handelDeltCity={handelDeltCity} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
