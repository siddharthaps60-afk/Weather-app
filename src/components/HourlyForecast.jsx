function HourlyForecast({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="hourly-forecast">
      <h2>Hourly Forecast</h2>

      <div
  className="hourly-list"
  style={{
    display: "flex",
    gap: "20px",
    overflowX: "auto",
  }}
>
        {forecast.list.slice(0, 8).map((item, index) => (
          <div key={index} className="hour-card">
            <p>{item.dt_txt.split(" ")[1].slice(0, 5)}</p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather"
            />

            <h3>{Math.round(item.main.temp)}°C</h3>
            <p>🌧️ {Math.round(item.pop * 100)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;