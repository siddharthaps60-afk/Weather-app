function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>{weather.sys.country}</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="Weather Icon"
      />

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p>{weather.weather[0].description}</p>

      <p>🌡️ Feels Like: {Math.round(weather.main.feels_like)}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬️ Wind: {weather.wind.speed} m/s</p>
      <p>📊 Pressure: {weather.main.pressure} hPa</p>
      <p>👁️ Visibility: {(weather.visibility / 1000).toFixed(1)} km</p>
    </div>
  );
}

export default WeatherCard;