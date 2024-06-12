// html fetch
const cityInput = document.querySelector("#city-input");
let cityName = cityInput.value;
const targetIcon = document.querySelector("#target-icon");
const weatherContainer = document.querySelector("#display-weather-info");
const checkboxContainer = document.querySelector("#checkbox-container");
const humidityCheckbox = document.querySelector("#humidity-checkbox");
const windCheckbox = document.querySelector("#wind-checkbox");
// let checkboxCustom;
const searchIcon = document.querySelector(".search-icon");
const geoIcon = document.querySelector(".geo-icon");
let iconCustom;

const searchInfo = {
  // info for search
  searchIconClassName: "search icon transform translate-x-0.5 search-icon",
};

const geoInfo = {
  // info for geo
  geoIconClassName:
    "map marker alternate icon transform translate-x-0.5 geo-icon",
};

// assigning the icon classes to variables
const geoIconClassName =
  "map marker alternate icon transform translate-x-0.5 geo-icon";
const searchIconClassName = "search icon transform translate-x-0.5 search-icon";

// to make sure that even if there's something in the textbox, the icon changes
window.onload = () => {
  cityInput.value = "";
  checkIfCityInputIsEmpty(cityInput, targetIcon);
};

const checkIfCityInputIsEmpty = (input, icon) => {
  if (input.value.trim() === "") {
    icon.className = geoInfo.geoIconClassName;
    icon.id = "location-btn";
  } else {
    icon.className = searchInfo.searchIconClassName;
    icon.id = "search-btn";
  }
};

cityInput.addEventListener("input", () =>
  checkIfCityInputIsEmpty(cityInput, targetIcon)
);

// demarcation

const showCheckboxContainer = () => {
  checkboxContainer.classList.remove("hidden");
};

targetIcon.addEventListener(
  "click",
  (buttonClickFunction = () => {
    showCheckboxContainer();
    if (targetIcon.className === geoIconClassName) {
      getWeatherByGeolocation();
    } else if (targetIcon.className === searchIconClassName) {
      console.log("search icon clicked");
      searchForWeather();
    }
  })
);

// searchIcon.style.display = "none"; // hide the submit button until fixed (testing)

// searchIcon.addEventListener("click", () => {
//   showCheckboxContainer();
//   fetchWeatherData(
//     searchIconCustom,
//     document.querySelector("#city-input").value
//   );
// });

const updateCheckboxWeatherInfo = () => {
  if (document.querySelector("#humidity-checkbox").checked) {
    weatherInfo += "Humidity: " + data.main.humidity + "%<br/>";
  }

  if (document.querySelector("#wind-checkbox").checked) {
    weatherInfo += "Wind Speed: " + data.wind.speed + " m/s<br/>";
  }
};

humidityCheckbox.addEventListener("change", () => updateCheckboxWeatherInfo);
windCheckbox.addEventListener("change", () => updateCheckboxWeatherInfo);

const searchForWeather = () => {
  // Get the city name from the input field
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
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
};

const fetchWeatherData = (custom, cityName) => {
  iconCustom ==
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=997948706e57a1379dfe78808a547951`;
  fetch(iconCustom)
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

// document
//   .querySelector("#submit-btn")
//   .addEventListener("click", fetchWeatherData);

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buttonClickFunction();
  }
});

// geolocation
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
            console.log(data);
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
