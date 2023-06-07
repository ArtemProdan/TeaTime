import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css'

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'e18593023985009f7137418ec12c53ad';
  const city = 'Kryvyi+Rih';
  // const city = 'Manila';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [apiUrl]);

  if (!weatherData) return <div>Loading...</div>;

  let imageUrl = "http://openweathermap.org/img/wn/01d@2x.png";
  let weather = weatherData.weather[0].description

  switch (weather) {
    case "clear sky": imageUrl = 'http://openweathermap.org/img/wn/01d@2x.png';
      break
    case "few clouds": imageUrl = 'http://openweathermap.org/img/wn/02d@2x.png';
      break
    case "scattered clouds":
      imageUrl = 'http://openweathermap.org/img/wn/03n@2x.png';
      break;
    case "overcast clouds":
      imageUrl = 'http://openweathermap.org/img/wn/04n@2x.png';
      break;

    case "broken clouds":
      imageUrl = 'http://openweathermap.org/img/wn/04d@2x.png';
      break;
    case "shower rain":
      imageUrl = "http://openweathermap.org/img/wn/09d@2x.png";
      break;
    case "Rain":
      imageUrl = "http://openweathermap.org/img/wn/10d@2x.png";
      break;
    case "moderate rain":
      imageUrl = "http://openweathermap.org/img/wn/10d@2x.png";
      break;
    case "light rain":
      imageUrl = "http://openweathermap.org/img/wn/10d@2x.png";
      break;
    case "thunderstorm":
      imageUrl = "http://openweathermap.org/img/wn/11d@2x.png";
      break;
    case "snow":
      imageUrl = "http://openweathermap.org/img/wn/13d@2x.png";
      break;
    case "mist":
      imageUrl = "http://openweathermap.org/img/wn/50d@2x.png";
      break;
    default:
      imageUrl = "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png";
      break;
  }
  // console.log(weatherData) 

  return (
    <div className="weather-widget">
      <h2 className="weather-widget__city">{weatherData.name}</h2>
      <img className="weather-widget__image" src={imageUrl} alt="weather condition" />
      <p className="weather-widget__temperature">{Math.round(weatherData.main.temp)}°C</p>
      <p className="weather-widget__weather">{weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherWidget;
