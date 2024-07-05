"use strict";

// Selecting elements from the DOM
const cityInput = document.querySelector("#city-input");
const mainBtn = document.querySelector("#main-btn");
const targetIcon = document.querySelector("#target-icon");
const searchIcon = document.querySelector(".search-icon");
const geoIcon = document.querySelector(".geo-icon");
const hintEl = document.querySelector(".hint");
const datalist = document.querySelector("#cities");
const checkboxContainer = document.querySelector("#checkbox-container");
const humidityCheckbox = document.querySelector("#humidity-checkbox");
const windCheckbox = document.querySelector("#wind-checkbox");
const btnMore = document.querySelector(".btn-more");
const weatherContainer = document.querySelector("#display-weather-info");

// Icon class names for different states
const searchInfo = {
  searchIconClassName: "search icon transform translate-x-0.5 search-icon",
};
const geoInfo = {
  geoIconClassName:
    "map marker alternate icon transform translate-x-0.5 geo-icon",
};
const geoIconClassName = geoInfo.geoIconClassName;
const searchIconClassName = searchInfo.searchIconClassName;

// Clear city input on page load
window.onload = () => {
  if (cityInput) {
    cityInput.value = "";
    checkIfCityInputIsEmpty();
  }
};

// Check if the city input is empty and update UI accordingly
const checkIfCityInputIsEmpty = () => {
  if (cityInput.value.trim() === "") {
    targetIcon.className = geoIconClassName;
    targetIcon.id = "location-btn";
    btnMore.innerHTML = "location";
    hintEl.classList.remove("hidden");
  } else {
    targetIcon.className = searchIconClassName;
    targetIcon.id = "search-btn";
    btnMore.innerHTML = "search";
    hintEl.classList.add("hidden");
  }
};

// Populate city names in datalist for autocomplete
const cityNames = [
  /* city names array */
];
cityNames.forEach((city) => {
  let option = document.createElement("option");
  option.value = city;
  if (datalist) datalist.appendChild(option);
});

// Event listener for city input changes
cityInput.addEventListener("input", checkIfCityInputIsEmpty);

// Show checkbox container
const showCheckboxContainer = () => {
  checkboxContainer.classList.remove("hidden");
};

// Determine action based on icon state and show weather info
const iconCheckFn = () => {
  showCheckboxContainer();
  if (targetIcon.className === geoIconClassName) {
    hintEl.classList.add("hidden");
    getWeatherByGeolocation();
  } else if (targetIcon.className === searchIconClassName) {
    searchForWeather();
  }
};

// Event listeners for icon and button clicks
targetIcon.addEventListener("click", iconCheckFn);
mainBtn.addEventListener("click", iconCheckFn);

// Update weather info based on selected checkboxes
const updateCheckboxWeatherInfo = (data) => {
  let weatherInfo = "";
  if (data && humidityCheckbox.checked) {
    weatherInfo += "Humidity: " + data.main.humidity + "%<br/>";
  }
  if (data && windCheckbox.checked) {
    weatherInfo += "Wind Speed: " + data.wind.speed + " m/s<br/>";
  }
  return weatherInfo;
};

// Event listeners for checkbox changes
humidityCheckbox.addEventListener("change", fetchAndUpdateWeatherInfo);
windCheckbox.addEventListener("change", fetchAndUpdateWeatherInfo);

// Fetch and update weather info based on current icon state
const fetchAndUpdateWeatherInfo = () => {
  if (targetIcon.className === geoIconClassName) {
    getWeatherByGeolocation();
  } else if (targetIcon.className === searchIconClassName) {
    searchForWeather();
  }
};

// Search for weather using city name
const searchForWeather = () => {
  const cityName = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        weatherContainer.innerHTML =
          `In <em class="weather-info"> ${cityName} </em>, <br/> Temperature is ${Math.round(
            data.main.temp - 273.15
          )}°C.<br/>` + updateCheckboxWeatherInfo(data);
      } else {
        console.error("No data received from API");
      }
    })
    .catch((error) => console.error("Error:", error));
};

// Event listener for pressing Enter in city input
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    showCheckboxContainer();
    searchForWeather();
  }
});

// Get weather by geolocation
const getWeatherByGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              weatherContainer.innerHTML =
                `In <em class="weather-info">your location</em>, <br/> Temperature is ${Math.round(
                  data.main.temp - 273.15
                )}°C.<br/>` + updateCheckboxWeatherInfo(data);
            } else {
              console.error("No data received from API");
            }
          })
          .catch((error) => console.error("Error:", error));
      },
      (error) => {
        console.error("Error occurred. Code: " + error.code);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
