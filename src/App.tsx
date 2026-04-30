import { useEffect, useState } from "react"
import Header from "./components/Header"
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";
// import type { CityDataAPIResponse } from "./types/CityData";


function App() {
  const [cities, setCities] = useState<CityData[]>([]);

  const handelAddCity = (city: CityData) => {
    setCities((prev) => [...prev, city]);
  }

  //Touch the updatedAT for each city to trigger fresh data in the weather card
  const touchCities = () => {
    let citiesCopy = [...cities];
    citiesCopy = citiesCopy.map(city => ({ ...city, updatedAt: new Date() }));
    setCities(citiesCopy);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      touchCities();
    }, 5000);
    return () => clearInterval(interval);
  }, [cities])


  return (
    <div className="px-6 py-8">
      <Header />
      <SearchCity handleAddCity={handelAddCity} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div>
            <WeatherCard key={city.id} city={city} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
