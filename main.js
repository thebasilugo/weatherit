document.getElementById("submit-btn").addEventListener("click", function () {
  var cityName = document.getElementById("city-input").value;
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=YOUR_API_KEY"
  )
    .then((response) => response.json())
    .then((data) => {
      var weatherContainer = document.getElementById("weather-container");
      weatherContainer.innerHTML =
        "Temperature in " +
        cityName +
        " is " +
        Math.round(data.main.temp - 273.15) +
        "°C";
    })
    .catch((error) => console.error("Error:", error));
});

// geolocation
document.getElementById("location-btn").addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log("Latitude: " + lat + ", Longitude: " + lon);
      },
      function (error) {
        console.error("Error occurred. Code: " + error.code);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
