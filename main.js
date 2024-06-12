// Selecting HTML elements
const cityInput = document.querySelector("#city-input");
const targetIcon = document.querySelector("#target-icon");
const weatherContainer = document.querySelector("#display-weather-info");
const checkboxContainer = document.querySelector("#checkbox-container");
const humidityCheckbox = document.querySelector("#humidity-checkbox");
const windCheckbox = document.querySelector("#wind-checkbox");
const searchIcon = document.querySelector(".search-icon");
const geoIcon = document.querySelector(".geo-icon");

// Icon class names
const searchInfo = {
  searchIconClassName: "search icon transform translate-x-0.5 search-icon",
};
const geoInfo = {
  geoIconClassName:
    "map marker alternate icon transform translate-x-0.5 geo-icon",
};
const geoIconClassName = geoInfo.geoIconClassName;
const searchIconClassName = searchInfo.searchIconClassName;

// On window load, clear city input and check if it's empty
window.onload = () => {
  cityInput.value = "";
  checkIfCityInputIsEmpty(cityInput, targetIcon);
};

// Function to check if city input is empty and change icon accordingly
const checkIfCityInputIsEmpty = (input, icon) => {
  if (input.value.trim() === "") {
    icon.className = geoInfo.geoIconClassName;
    icon.id = "location-btn";
  } else {
    icon.className = searchInfo.searchIconClassName;
    icon.id = "search-btn";
  }
};

// Event listener to check if city input is empty on input
cityInput.addEventListener("input", () =>
  checkIfCityInputIsEmpty(cityInput, targetIcon)
);

// Function to show checkbox container
const showCheckboxContainer = () => {
  checkboxContainer.classList.remove("hidden");
};

// Event listener for click on target icon
targetIcon.addEventListener("click", () => {
  showCheckboxContainer();
  if (targetIcon.className === geoIconClassName) {
    getWeatherByGeolocation();
  } else if (targetIcon.className === searchIconClassName) {
    searchForWeather();
  }
});

// Function to update weather info based on checkbox selection
const updateCheckboxWeatherInfo = () => {
  if (humidityCheckbox.checked) {
    weatherInfo += "Humidity: " + data.main.humidity + "%<br/>";
  }
  if (windCheckbox.checked) {
    weatherInfo += "Wind Speed: " + data.wind.speed + " m/s<br/>";
  }
};

// Event listeners for change in checkbox selection
humidityCheckbox.addEventListener("change", updateCheckboxWeatherInfo);
windCheckbox.addEventListener("change", updateCheckboxWeatherInfo);

// Function to search for weather of a city
const searchForWeather = () => {
  const cityName = cityInput.value;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=997948706e57a1379dfe78808a547951`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherContainer.innerHTML = `In <em> ${cityName} </em>, <br/> Temperature is ${Math.round(
        data.main.temp - 273.15
      )}°C.<br/>`;
      let weatherInfo = weatherContainer.innerHTML;
      updateCheckboxWeatherInfo();
      weatherContainer.innerHTML = weatherInfo;
    })
    .catch((error) => console.error("Error:", error));
};

// Function to fetch weather data
const fetchWeatherData = (custom, cityName) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=997948706e57a1379dfe78808a547951`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherContainer.innerHTML = `In <em> ${cityName} </em>, <br/> Temperature is ${Math.round(
        data.main.temp - 273.15
      )}°C.<br/>`;
      let weatherInfo = weatherContainer.innerHTML;
      if (humidityCheckbox.checked) {
        weatherInfo += "Humidity: " + data.main.humidity + "%<br/>";
      }
      if (windCheckbox.checked) {
        weatherInfo += "Wind Speed: " + data.wind.speed + " m/s<br/>";
      }
      weatherContainer.innerHTML = weatherInfo;
    })
    .catch((error) => console.error("Error:", error));
};

// Event listener for Enter key press in city input
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buttonClickFunction();
  }
});

// Function to get weather by geolocation
const getWeatherByGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=997948706e57a1379dfe78808a547951`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            weatherContainer.innerHTML = `In <em>your location</em>, <br/> Temperature is ${Math.round(
              data.main.temp - 273.15
            )}°C.<br/>`;
          })
          .catch((error) => console.error("Error:", error));
      },
      function (error) {
        console.error("Error occurred. Code: " + error.code);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
