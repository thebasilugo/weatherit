// html fetch
let cityName = document.querySelector("#city-input").value;
const weatherContainer = document.querySelector("#display-weather-info");
const checkboxContainer = document.querySelector("#checkbox-container");
const submitBtn = document.querySelector("#submit-btn");
const locationBtn = document.querySelector("#location-btn");
const submitBtnCustom = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=997948706e57a1379dfe78808a547951`;
// const locationBtnCustom = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=997948706e57a1379dfe78808a547951`;
// openweathermap api fetch function

const showCheckboxContainer = () => {
  checkboxContainer.classList.remove("hidden");
};

submitBtn.addEventListener("click", () => {
  if (cityName === "") {
    weatherContainer.innerHTML = "please type in a city first";
  } else {
    showCheckboxContainer();
    fetchWeatherData(
      submitBtnCustom,
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
locationBtn.addEventListener("click", function () {
  let cityName = "your location";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const locationBtnCustom = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=997948706e57a1379dfe78808a547951`;
        fetchWeatherData(locationBtnCustom, cityName);
        showCheckboxContainer();
      },
      function (error) {
        console.error("Error occurred. Code: " + error.code);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
