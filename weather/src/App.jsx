import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "68cf64a2be754f2738e53b6e0ad05ab9";

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found.");
        setWeatherData(null);
        return;
      }

      setWeatherData({
        name: data.name,
        temp: Math.floor(data.main.temp - 273.15),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        description: data.weather[0].description,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
      });

      setError("");
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeatherData(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Weather App
        </h1>

        <form onSubmit={getWeather} className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            list="citySuggestions"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        <datalist id="citySuggestions">
          <option value="Srinagar" />
          <option value="London" />
          <option value="New York" />
          <option value="Tokyo" />
          <option value="Paris" />
        </datalist>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {weatherData && (
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {weatherData.name}
            </h2>
            <p className="text-gray-600 capitalize">{weatherData.description}</p>

            <div className="flex justify-center mt-2">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
                className="w-20 h-20"
              />
            </div>

            <p className="text-5xl font-bold mt-2 text-gray-800">
              {weatherData.temp}°C
            </p>

            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <p>Humidity: <span className="font-medium">{weatherData.humidity}%</span></p>
              <p>Wind: <span className="font-medium">{weatherData.wind} m/s</span></p>
            </div>

            {/* Example Conditions */}
            <div className="mt-6 text-sm text-gray-500">
              <p>Example icons:</p>
              <div className="flex justify-around mt-2">
                {weatherData.main === "Clear" && (
                  <div className="flex flex-col items-center">
                    <img
                      src="https://openweathermap.org/img/wn/01d@2x.png"
                      alt="Clear"
                      className="w-12 h-12"
                    />
                    <span>Clear</span>
                  </div>
                )}
                {weatherData.main === "Haze" && (
                  <div className="flex flex-col items-center">
                    <img
                      src="https://openweathermap.org/img/wn/50d@2x.png"
                      alt="Haze"
                      className="w-12 h-12"
                    />
                    <span>Haze</span>
                  </div>
                )}
                {weatherData.main === "Clouds" && (
                  <div className="flex flex-col items-center">
                    <img
                      src="https://openweathermap.org/img/wn/03d@2x.png"
                      alt="Clouds"
                      className="w-12 h-12"
                    />
                    <span>Clouds</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
