"use strict";

const weatherContainer = document.querySelector(".display-weather");
const tempDegreeEle = document.querySelector(".display-weather-temperature-f");
const tempLocationEle = document.querySelector(".display-weather-location");
const tempDescriptionEle = document.querySelector(".display-weather-description");
const tempIconEle = document.querySelector(".display-weather-icon");

const searchButton = document.querySelector(".search__btn");
const searchInput = document.querySelector(".searchInput");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const api = `https://api.weatherapi.com/v1/current.json?key=5e8ff1fa44a6410ca6603150220107&q=${latitude},${longitude}&aqi=no`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { current, location } = data;
          weatherContainer.classList.toggle("hidden");
          tempDegreeEle.textContent = current.temp_f + "° F";
          tempLocationEle.textContent = `${location.name}, ${location.region}`;
          tempDescriptionEle.textContent = current.condition.text;
          tempIconEle.innerHTML = `<img src="${current.condition.icon}">`;
          searchInput.value = "";
        });
    });
  }
});

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const query = searchInput.value;
  const api = `https://api.weatherapi.com/v1/current.json?key=5e8ff1fa44a6410ca6603150220107&q=${query}&aqi=no`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { current, location } = data;

      if (!current) {
        throw new Error("Location not found");
      }

      weatherContainer.classList.remove("hidden");
      tempDegreeEle.textContent = current.temp_f + "° F";
      tempLocationEle.textContent = `${location.name}, ${location.region}`;
      tempDescriptionEle.textContent = current.condition.text;
      tempIconEle.innerHTML = `<img src="${current.condition.icon}">`;
      searchInput.value = "";
    })
    .catch((err) => {
      alert(err);
    });
});
