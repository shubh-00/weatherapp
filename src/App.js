import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const apiKey = "9305b6dfc6eaa2200123de9dce261c1d";
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const weatherIconUrl = "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png";

  const fetchWeatherData = async (cityName) => {
    try {
      if (!cityName) return;
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const response = await axios.get(apiURL);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(inputCity);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 shadow-lg mt-5">
          <div className="weatherBg">
            <h1 className="heading">Weather App</h1>
            <div className="d-grid gap-3 col-4 mt-4">
              <input
                type="text"
                placeholder="Enter City Name"
                className="form-control"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
              />
              <button className="btn btn-primary mb-5" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          {weatherData && (
            <div className="col-md-12 text-center mt-5">
              <div className="shadow-lg rounded weatherResultBox mb-5">
                <img className="weatherIcon" src={weatherIconUrl} alt="Weather Icon" />
                <h5 className="weatherCity">{weatherData.name}</h5>
                <h6 className="weatherTemp">
                  {(weatherData.main.temp - 273.15).toFixed(2)}°C
                </h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
