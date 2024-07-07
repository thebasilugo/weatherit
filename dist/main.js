"use strict";
const form = document.querySelector("form");
const cityInput = document.querySelector("input");
const datalist = document.querySelector("#cities");
const mainBtn = document.querySelector("#main-btn");
const targetIcon = document.querySelector("#target-icon");
const geoIcon = document.querySelector(".geo-icon");
const searchIcon = document.querySelector(".search-icon");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");
const apiKey = "997948706e57a1379dfe78808a547951";
const searchInfo = {
    searchIconClassName: "search icon transform translate-x-0.5 search-icon",
};
const geoInfo = {
    geoIconClassName: "search icon transform translate-x-0.5 search-icon",
};
const geoIconClassName = geoInfo.geoIconClassName;
const searchIconClassName = searchInfo.searchIconClassName;
window.onload = () => {
    if (cityInput) {
        cityInput.value = "";
        checkIfCityInputIsEmpty(cityInput, targetIcon);
    }
};
const checkIfCityInputIsEmpty = (cityInput, icon) => {
    if (cityInput.value.trim() === "") {
        icon.className = geoInfo.geoIconClassName;
    }
    else {
        icon.className = searchInfo.searchIconClassName;
    }
};
const hideErrorMsg = () => {
    setTimeout(() => {
        msg.classList.add("hidden");
    }, 3000);
};
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
    datalist === null || datalist === void 0 ? void 0 : datalist.appendChild(option);
});
cityInput === null || cityInput === void 0 ? void 0 : cityInput.addEventListener("input", () => checkIfCityInputIsEmpty(cityInput, targetIcon));
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    cityInput === null || cityInput === void 0 ? void 0 : cityInput.focus();
});
const searchForWeather = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log(`Temperature: ${data.temperature}, Description: ${data.description}`);
    })
        .catch(() => {
        msg === null || msg === void 0 ? void 0 : msg.classList.remove("hidden");
        msg.innerHTML = `<em>${cityName}</em> is not a valid city.`;
        hideErrorMsg();
    });
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    var _a, _b;
    e.preventDefault();
    let inputVal = cityInput.value;
    const listItems = list === null || list === void 0 ? void 0 : list.querySelectorAll(".city");
    if (listItems) {
        const listItemsArray = Array.from(listItems);
        if (listItemsArray.length > 0) {
            const filteredArray = listItemsArray.filter((el) => {
                var _a, _b, _c, _d;
                let content = "";
                if (inputVal.includes(",")) {
                    if (inputVal.split(",")[1].length > 2) {
                        inputVal = inputVal.split(",")[0];
                        content = (_b = (_a = el
                            .querySelector(".city-name span")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                    }
                    else {
                        content = (_d = (_c = el
                            .querySelector(".city-name")) === null || _c === void 0 ? void 0 : _c.dataset.name) === null || _d === void 0 ? void 0 : _d.toLowerCase();
                    }
                }
                else {
                    content = el === null || el === void 0 ? void 0 : el.querySelector(".city-name span").textContent.toLowerCase();
                }
                return content == inputVal.toLowerCase();
            });
            if (filteredArray.length > 0) {
                msg === null || msg === void 0 ? void 0 : msg.classList.remove("hidden");
                msg.innerHTML = `<em>${(_b = (_a = filteredArray[0]) === null || _a === void 0 ? void 0 : _a.querySelector(".city-name span")) === null || _b === void 0 ? void 0 : _b.textContent}</em> already exists in the list below.`;
                hideErrorMsg();
                form.reset();
                cityInput === null || cityInput === void 0 ? void 0 : cityInput.focus();
                return;
            }
        }
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        const li = document.createElement("li");
        li.classList.add("city", "border-2", "border-gray-700", "py-4", "m-1", "rounded-xl", "cities-container", "hover:bg-gray-200");
        const markup = `
        <div class="relative">
          <button class="del-city-btn" onclick="deleteCity(this)">
            <i class="x icon"></i>
          </button>
          <h2 class="city-name" 
          data-name="${name},${sys.country}">
            <span>${name}, ${sys.country}</span>
          </h2>
          <div class="city-temp font-extrabold text-4xl pt-4">
            ${Math.round(main.temp)}
            <sup>°C</sup>
          </div>
          <figure class="flex flex-col items-center justify-center text-center">
            <img class="city-icon" 
            src="${icon}" 
            alt="${weather[0]["description"]}">
            <figcaption>
              ${weather[0]["description"]}
            </figcaption>
          </figure>
        </div>
      `;
        li.innerHTML = markup;
        list === null || list === void 0 ? void 0 : list.appendChild(li);
    })
        .catch(() => {
        msg === null || msg === void 0 ? void 0 : msg.classList.remove("hidden");
        msg.innerHTML = `<em>${inputVal}</em> is not a valid city.`;
        hideErrorMsg();
    });
    msg.textContent = "";
    form.reset();
    checkIfCityInputIsEmpty(cityInput, targetIcon);
});
function deleteCity(button) {
    const cityItem = button.closest(".city");
    cityItem === null || cityItem === void 0 ? void 0 : cityItem.remove();
}
