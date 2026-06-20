const temperatureEl = document.getElementById("temperature");
const temperature_RainyEl = document.getElementById("temperature-rainy");
const cityNameEl = document.getElementById("cityName");
const cityName_RainyEl = document.getElementById("cityName-rainy");
const countryEl = document.getElementById("country");
const country_RainyEl = document.getElementById("country-rainy");
const dateTimeEl = document.getElementById("dateTime");
const dateTime_RainyEl = document.getElementById("dateTime-rainy");
const descriptionEl = document.getElementById("description");
const description_RainyEl = document.getElementById("description-rainy");
const feelsLikeEl = document.getElementById("feelsLike");
const feelsLike_RainyEl = document.getElementById("feelsLike-rainy");
const humidityEl = document.getElementById("humidity");
const humidity_RainyEl = document.getElementById("humidity-rainy");
const windEl = document.getElementById("wind");
const wind_RainyEl = document.getElementById("wind-rainy");
const visibilityEl = document.getElementById("visibility");
const visibility_RainyEl = document.getElementById("visibility-rainy");
const uvIndexEl = document.getElementById("uvIndex");
const uvIndex_RainyEl = document.getElementById("uvIndex-rainy");

function updateUI(data) {
  temperatureEl.textContent = `${data.main.temp}°`;
  temperature_RainyEl.textContent = `${data.main.temp}°`;
  cityNameEl.textContent = `${data.name}`;
  cityName_RainyEl.textContent = `${data.name}`;
  countryEl.textContent = `${data.sys.country}`;
  country_RainyEl.textContent = `${data.sys.country}`;
  dateTimeEl.textContent = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  dateTime_RainyEl.textContent = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  descriptionEl.textContent = `${data.weather[0].description}`;
  description_RainyEl.textContent = `${data.weather[0].description}`;
  feelsLikeEl.textContent = `Feels Like ${data.main.feels_like}°`;
  feelsLike_RainyEl.textContent = `Feels Like ${data.main.feels_like}°`;
  humidityEl.textContent = `${data.main.humidity}%`;
  humidity_RainyEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} KM/H`;
  wind_RainyEl.textContent = `${data.wind.speed} KM/H`;
  visibilityEl.textContent = `${data.visibility} KM`;
  visibility_RainyEl.textContent = `${data.visibility} KM`;
  uvIndexEl.textContent = `N/A`;
  uvIndex_RainyEl.textContent = `N/A`;
  updateBackground(data.weather[0].main);
}
function updateBackground(condition) {
  document.body.classList = "";

  if (condition === "Clear") {
    document.body.classList.add("weather-clear");
  } else if (
    condition === "Rain" ||
    condition === "Drizzle" ||
    condition === "Thunderstorm"
  ) {
    document.body.classList.add("weather-rainy");
  } else {
    document.body.classList.add("weather-cloudy");
  }
}
