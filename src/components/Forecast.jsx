function Forecast({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>

      <div className="forecast-cards">
        {forecast.list.slice(0, 5).map((item, index) => (
          <div className="forecast-card" key={index}>
            <h4>{item.dt_txt}</h4>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="icon"
            />

            <p>{Math.round(item.main.temp)}°C</p>

            <p>{item.weather[0].main}</p>
            <p>🌧️ Rain: {Math.round(item.pop * 100)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;