import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "../icons/sunny.svg",
  "01n": "../icons/night.svg",
  "02d": "../icons/day.svg",
  "02n": "../icons/cloudy-night.svg",
  "03d": "../icons/cloudy.svg",
  "03n": "../icons/cloudy.svg",
  "04d": "../icons/perfect-day.svg",
  "04n": "../icons/cloudy-night.svg",
  "09d": "../icons/rain.svg",
  "09n": "../icons/rain-night.svg",
  "10d": "../icons/rain.svg",
  "10n": "../icons/rain-night.svg",
  "11d": "../icons/storm.svg",
  "11n": "../icons/storm.svg",
};

const Container5 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding-top:100px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;

function WeatherConfig() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87a5076f013373370e5b265967e697e3`,
    );
    updateWeather(response.data);
  };
  return (
    <Container5>
      <AppLabel>Kingo's Weather App</AppLabel>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container5>
  );
}

export default WeatherConfig;
