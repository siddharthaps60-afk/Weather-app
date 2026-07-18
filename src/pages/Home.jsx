import HourlyForecast from "../components/HourlyForecast";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import Footer from "../components/Footer";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoords,
} from "../services/weatherApi";

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  // New States
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric");

  const weatherCondition = weather?.weather[0].main?.toLowerCase() || "";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);

          const { latitude, longitude } = position.coords;

          const data = await getWeatherByCoords(latitude, longitude);

          setWeather(data);

          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      },
      (error) => {
        console.log("Location permission denied", error);
      }
    );
  }, []);

  const handleSearch = async (city) => {
    try {
      setLoading(true);

      const current = await getCurrentWeather(city, unit);
      const forecastData = await getForecast(city, unit);

      setWeather(current);
      setForecast(forecastData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setWeather(null);
      setForecast(null);

      alert("City not found. Please enter a valid city.");
      console.error(error);
    }
  };

  const addFavorite = () => {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  };

  const refreshWeather = () => {
    if (weather) {
      handleSearch(weather.name);
    }
  };

  return (
    <div className={`app ${weatherCondition}`}>
      <Navbar />

      <SearchBar onSearch={handleSearch} />

      {/* Unit Toggle */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          onClick={() =>
            setUnit(unit === "metric" ? "imperial" : "metric")
          }
        >
          🌡️ Switch to {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      {/* Refresh Button */}
      {weather && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={refreshWeather}>
            🔄 Refresh Weather
          </button>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="loader"></div>
      )}

      {/* Favorite Button */}
      {weather && (
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button onClick={addFavorite}>
            ❤️ Add to Favorites
          </button>
        </div>
      )}

      {/* Favorite Cities */}
      {favorites.length > 0 && (
        <div
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "15px",
          }}
        >
          <h3>❤️ Favorite Cities</h3>

          {favorites.map((city, index) => (
            <span
              key={index}
              style={{
                margin: "10px",
                padding: "8px 15px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "20px",
                display: "inline-block",
              }}
            >
              {city}
            </span>
          ))}
        </div>
      )}

      {weather && <WeatherCard weather={weather} />}

      {forecast && <Forecast forecast={forecast} />}

      {forecast && <HourlyForecast forecast={forecast} />}

      <Footer />
    </div>
  );
}

export default Home;