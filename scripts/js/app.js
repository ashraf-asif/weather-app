// select elements
const notification = document.querySelector(".notification");
const weatherIcon = document.querySelector(".weather-icon");
const temperatureValue = document.querySelector(".temperature-value p");
const temperatureDescription = document.querySelector(
	".temperature-description p"
);
const locationElement = document.querySelector(".location p");

// weather object
const weather = {};

weather.temperature = {
	unit: "celsius",
};

// kelvin value
const KELVIN = 273;
// API key
const key = "fb0f4f8c5e465acc875b422007b6928e";

// check browser support
if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	notification.style.display = "block";
	notification.innerHTML = `<p>Browser doesn't Support Geolocation</p>`;
}

// set user's position
function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	getWeather(latitude, longitude);
}

// show error
function showError(error) {
	notification.style.display = "block";
	notification.innerHTML = `<p> ${error.message} </p>`;
}

// get weather from api 
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  console.log(api);

  fetch(api)
  .then(function(response) {
    let data = response.json();
    return data;
  })
  .then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function() {
    displayWeather();
  })
}

//display weather
function displayWeather() {
  weatherIcon.innerHTML = `<img src="../../images/icons/weather-icons/${weather.iconId}.png">`;
  temperatureValue.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
  temperatureDescription.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// click to convert
temperatureValue.addEventListener("click", () => {
  if (weather.temperature.value === undefined) {
    return;
  }
	if (weather.temperature.unit === "celsius") {
		let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
		fahrenheit = Math.floor(fahrenheit);

		temperatureValue.innerHTML = `${fahrenheit} ° <span>F</span>`;
		weather.temperature.unit = "fahrenheit";
	} else {
		temperatureValue.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
		weather.temperature.unit = "celsius";
	}
});

// fahrenheit vs celsius converters
const celsiusToFahrenheit = (temperature) => {
	return (9 * temperature + 32 * 5) / 5;
};
