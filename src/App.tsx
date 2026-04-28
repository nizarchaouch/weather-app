import { useEffect } from "react"
import Header from "./components/Header"
import type { WeatherDataAPIResponse } from "./types/weatherData";
// import type { CityDataAPIResponse } from "./types/CityData";


function App() {
  useEffect(() => {
    const fetchCityData = async () => {
      // const reponse = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=Riyadh");
      const reponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=51.50853&longitude=-0.12574&current_weather=true");
      // const data: CityDataAPIResponse[] = await reponse.json();
      const data: WeatherDataAPIResponse[] = await reponse.json();
      console.log("fetch data api", data)
    }
    fetchCityData();
  }, [])

  return (
    <div className="px-6 py-8">
      <Header />
    </div>
  )
}

export default App
