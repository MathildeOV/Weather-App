let currentTime = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[currentTime.getDay()];
  let currentDate = currentTime.getDate();
  let currentMonth = months[currentTime.getMonth()];

  return `${currentDay}, ${currentMonth} ${currentDate}`;
}

let todaysDate = document.querySelector(".todaysDate");
todaysDate.innerHTML = formatDate();

function formatHour() {
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }

  return `${currentHour}:${currentMinute}`;
}
let todaysHour = document.querySelector(".todaysHour");
todaysHour.innerHTML = formatHour();

function userCity(event) {
  event.preventDefault();

  let input = document.querySelector(".form-control");

  let userCity = document.querySelector(".currentCity");

  userCity.innerHTML = `${input.value}`;
  searchCity(input.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", userCity);

//let fahrenheitTemp = document.querySelector("#fahrenheit");
//let celsiusTemp = document.querySelector("#celsius");

//function tempFahrenheit(event) {
//event.preventDefault();

// let temperature = document.querySelector(".currentTemperatureValue");
// temperature.innerHTML = 66;

// fahrenheitTemp.innerHTML = "°F".bold();
// celsiusTemp.innerHTML = "°C";
//}

//fahrenheitTemp.addEventListener("click", tempFahrenheit);

//function tempCelsius(event) {
//event.preventDefault();

//let temperature = document.querySelector(".currentTemperatureValue");
//temperature.innerHTML = 20;

//celsiusTemp.innerHTML = "°C".bold();
//fahrenheitTemp.innerHTML = "°F";
//}
//celsiusTemp.addEventListener("click", tempCelsius);

function showTemperature(response) {
  document.querySelector(".currentCity").innerHTML = response.data.name;
  document.querySelector(".currentTemperatureValue").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "e8ba6230c4a31fe5709104ac193c78bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Toronto");

// Bonus Point

function retrievePosition(position) {
  let apiKey = "e8ba6230c4a31fe5709104ac193c78bf";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);
