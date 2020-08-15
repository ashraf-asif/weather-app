// select elements
const weatherImg = document.querySelector("#weather-img");
const locationElement = document.querySelector("#location");
const temperatureValue = document.querySelector("#temperature-value");
const feelsLike = document.querySelector("#feels-like");
const weatherDescription = document.querySelector("#weather-description");

// API key
const key = "fb0f4f8c5e465acc875b422007b6928e";

// display weather on click
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", function () {
	let api = `https://api.openweathermap.org/data/2.5/weather?q=${getLocation()}&appid=${key}`;

	fetch(api)
		.then((res) => res.json())
		.then((data) => {
			// weather image
			let getImageId = data.weather[0].icon;
			weatherImg.src = `../images/icons/weather-icons/${getImageId}.png`;
			// location
			const getSearchedLocation = `${data.name}, ${data.sys.country}`;
			locationElement.innerText = getSearchedLocation;
			// temperature value
			const getTemperature = Math.floor(data.main.temp - 273);
			window.getTemperature = getTemperature;
			temperatureValue.innerText = `${getTemperature}°C`;
			// temperature feels like
			const getFeelsLike = Math.floor(data.main.feels_like - 273);
			window.getFeelsLike = getFeelsLike;
			feelsLike.innerText = `Feels like ${getFeelsLike}°C`;

			// weather description
			const getWeatherDescription = data.weather[0].description;
			weatherDescription.innerText = getWeatherDescription;
		});
});

// search location
function getLocation() {
	const inputLocation = document.querySelector("#input-location");
	const cityName = inputLocation.value;

	return cityName;
}

// click to convert
const changeUnitBtn = document.querySelector("#change-unit");
changeUnitBtn.addEventListener("click", () => {
	const unit = document.querySelector("#unit");
	if (unit.innerText === "C") {
		unit.innerText = "F";

		let fahrenheit = celsiusToFahrenheit(getTemperature);
		fahrenheit = Math.floor(fahrenheit);
		temperatureValue.innerText = `${fahrenheit}°F`;

		fahrenheit = celsiusToFahrenheit(getFeelsLike);
		fahrenheit = Math.floor(fahrenheit);
		feelsLike.innerText = `Feels like ${fahrenheit}°F`;
	} else {
		unit.innerText = "C";

		temperatureValue.innerText = `${getTemperature}°C`;
		feelsLike.innerText = `Feels like ${getFeelsLike}°C`;
	}
});

// fahrenheit vs celsius converters
const celsiusToFahrenheit = (celsiusValue) => {
	return (9 * celsiusValue + 32 * 5) / 5;
};
