// html fetch
const cityInput = document.querySelector("#city-input");
let cityName = cityInput.value;
const geoIcon = document.querySelector(".geo-icon");
const searchIcon = document.querySelector(".search-icon");
const targetIcon = document.querySelector("#target-icon");
const weatherContainer = document.querySelector("#display-weather-info");
const checkboxContainer = document.querySelector("#checkbox-container");
// const searchIcon = document.querySelector("#submit-btn");
// const geoIcon = document.querySelector("#location-btn");
const searchIconCustom = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=997948706e57a1379dfe78808a547951`;
// const geoIconCustom = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=997948706e57a1379dfe78808a547951`;
// openweathermap api fetch function

// assigning the icon classes to variables
const geoIconClassName =
  "map marker alternate icon transform translate-x-0.5 geo-icon";
const searchIconClassName = "search icon transform translate-x-0.5 search-icon";

const checkIfCityInputIsEmpty = (input, icon) => {
  if (input.value.trim() === "") {
    icon.className = geoIconClassName;
  } else {
    icon.className = searchIconClassName;
  }
};

cityInput.addEventListener("input", () =>
  checkIfCityInputIsEmpty(cityInput, targetIcon)
);

// demarcation

const showCheckboxContainer = () => {
  checkboxContainer.classList.remove("hidden");
};

searchIcon.style.display = "none"; // hide the submit button until fixed (testing)

searchIcon.addEventListener("click", () => {
  if (cityName === "") {
    // geolocation();
  } else {
    showCheckboxContainer();
    fetchWeatherData(
      searchIconCustom,
      document.querySelector("#city-input").value
    );
  }
});

const fetchWeatherData = (custom, cityName) => {
  fetch(custom)
    .then((response) => response.json())
    .then((data) => {
      weatherContainer.innerHTML = `In <em> ${cityName} </em>, <br/> Temperature is ${Math.round(
        data.main.temp - 273.15
      )}°C.<br/>`;
      let weatherInfo = weatherContainer.innerHTML;

      if (document.querySelector("#humidity-checkbox").checked) {
        weatherInfo += "Humidity: " + data.main.humidity + "%<br/>";
      }

      if (document.querySelector("#wind-checkbox").checked) {
        weatherInfo += "Wind Speed: " + data.wind.speed + " m/s<br/>";
      }

      weatherContainer.innerHTML = weatherInfo;
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
};

document
  .querySelector("#submit-btn")
  .addEventListener("click", fetchWeatherData);

document
  .getElementById("city-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // Call the function that fetches the weather data
      fetchWeatherData();
    }
  });

// geolocation
geoIcon.addEventListener(
  "click",
  (geolocation = () => {
    let cityName = "your location";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          const geoIconCustom = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=997948706e57a1379dfe78808a547951`;
          fetchWeatherData(geoIconCustom, cityName);
          showCheckboxContainer();
        },
        function (error) {
          console.error("Error occurred. Code: " + error.code);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  })
);
