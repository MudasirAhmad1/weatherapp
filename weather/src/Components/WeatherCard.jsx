const WeatherCard = ({ weather }) => {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-bold">{weather.name}</h2>
        <p className="text-gray-700">{weather.weather[0].description}</p>
        <p className="text-3xl font-semibold">{Math.round(weather.main.temp)}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    );
  };
  
  export default WeatherCard;
  