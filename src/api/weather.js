import axios from "axios";
// Create API in https://openweathermap.org/api
const API_KEY = "d9a09f101b68e24ca60a42c3cb19de48"; // thay bằng key của bạn

export const getWeatherByCity = async (city) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
  );
};

export const getForecast = async (city) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
  );
};