// Selecting HTML elements
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

const weatherContainer = document.querySelector("#display-weather-info");

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
    hintEl.classList.remove("hidden");
  } else {
    icon.className = searchInfo.searchIconClassName;
    icon.id = "search-btn";
    hintEl.classList.add("hidden");
  }
};

// List of names of popular cities to aid users
const cityNames = [
  "Tokyo",
  "Delhi",
  "Shanghai",
  "Sao Paulo",
  "Mumbai",
  "Beijing",
  "Cairo",
  "Dhaka",
  "Mexico City",
  "Osaka",
  "Karachi",
  "Chongqing",
  "Istanbul",
  "Buenos Aires",
  "Kolkata",
  "Lagos",
  "Rio de Janeiro",
  "Tianjin",
  "Kinshasa",
  "Guangzhou",
  "Los Angeles",
  "Moscow",
  "Shenzhen",
  "Lahore",
  "Bangalore",
  "Jakarta",
  "Chennai",
  "Lima",
  "New York",
  "Bangkok",
  "Hyderabad",
  "Chengdu",
  "Nanjing",
  "Wuhan",
  "Ho Chi Minh City",
  "Hangzhou",
  "Hong Kong",
  "Ahmedabad",
  "Kuala Lumpur",
  "Pune",
  "Riyadh",
  "Santiago",
  "Alexandria",
  "Singapore",
  "Johannesburg",
  "Shijiazhuang",
  "Seoul",
  "Hanoi",
  "Baghdad",
  "Ankara",
  "Toronto",
  "Yangon",
  "Qingdao",
  "Rome",
  "Houston",
  "Bogota",
  "Bangladesh",
  "Changsha",
  "Rangoon",
  "Phoenix",
  "Philadelphia",
  "Nairobi",
  "Hefei",
  "Suzhou",
  "Harbin",
  "Dar es Salaam",
  "Shantou",
  "Dalian",
  "Zhengzhou",
  "Yangzhou",
  "Jinan",
  "Algiers",
  "Chengde",
  "Kabul",
  "Havana",
  "Casablanca",
  "Athens",
  "Cape Town",
  "Kunming",
  "Taibei",
  "Jeddah",
  "Shenyang",
  "Surat",
  "Abidjan",
  "Jaipur",
  "Guadalajara",
  "Incheon",
  "Baku",
  "Pune",
  "Sapporo",
  "Tashkent",
  "Izmir",
  "Xiamen",
  "Rawalpindi",
  "Durban",
  "Hyderabad",
  "Kanpur",
  "Nanjing",
  "Addis Ababa",
  "Nanning",
  "Lucknow",
  "Patna",
  "Guayaquil",
  "Salvador",
  "Vadodara",
  "Manila",
  "Johor Bahru",
  "San Antonio",
  "Indore",
  "Guatemala City",
];

cityNames.forEach((city) => {
  let option = document.createElement("option");
  option.value = city;
  datalist.appendChild(option);
});

// Event listener to check if city input is empty on input
cityInput.addEventListener("input", () =>
  checkIfCityInputIsEmpty(cityInput, targetIcon)
);

// Function to show checkbox container
const showCheckboxContainer = () => {
  checkboxContainer.classList.remove("hidden");
};

// Event listener for click on target icon
targetIcon.addEventListener(
  "click",
  (iconCheckFn = () => {
    showCheckboxContainer();
    if (targetIcon.className === geoIconClassName) {
      hintEl.classList.add("hidden");
      getWeatherByGeolocation();
    } else if (targetIcon.className === searchIconClassName) {
      searchForWeather();
    }
  })
);

mainBtn.addEventListener("click", iconCheckFn);

// Function to update weather info based on checkbox selection
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

// Event listeners for change in checkbox selection
humidityCheckbox.addEventListener("change", () => fetchAndUpdateWeatherInfo());
windCheckbox.addEventListener("change", () => fetchAndUpdateWeatherInfo());

// Function to fetch weather data and update weather info
const fetchAndUpdateWeatherInfo = () => {
  if (targetIcon.className === geoIconClassName) {
    getWeatherByGeolocation();
  } else if (targetIcon.className === searchIconClassName) {
    searchForWeather();
  }
};

// Event listeners for change in checkbox selection
humidityCheckbox.addEventListener("change", updateCheckboxWeatherInfo);
windCheckbox.addEventListener("change", updateCheckboxWeatherInfo);

// Function to search for weather of a city
const searchForWeather = () => {
  const cityName = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=997948706e57a1379dfe78808a547951`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        weatherContainer.innerHTML = `In <em class="weather-info"> ${cityName} </em>, <br/> Temperature is ${Math.round(
          data.main.temp - 273.15
        )}°C.<br/>`;
        weatherContainer.innerHTML += updateCheckboxWeatherInfo(data);
      } else {
        console.error("No data received from API");
      }
    })
    .catch((error) => console.error("Error:", error));
};

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    showCheckboxContainer();
    searchForWeather();
  }
});

// Function to get weather by geolocation
const getWeatherByGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=997948706e57a1379dfe78808a547951`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              weatherContainer.innerHTML = `In <em class="weather-info">your location</em>, <br/> Temperature is ${Math.round(
                data.main.temp - 273.15
              )}°C.<br/>`;
              weatherContainer.innerHTML += updateCheckboxWeatherInfo(data);
            } else {
              console.error("No data received from API");
            }
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
