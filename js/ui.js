const temperatureEl = document.getElementById("temperature");
const cityNameEl = document.getElementById("cityName");
const countryEl = document.getElementById("country");
const dateTimeEl = document.getElementById("dateTime");
const descriptionEl = document.getElementById("description");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const visibilityEl = document.getElementById("visibility");
const uvIndexEl = document.getElementById("uvIndex");

function updateUI(data) {
  temperatureEl.textContent = `${data.main.temp}°`;
  cityNameEl.textContent = `${data.name}`;
  countryEl.textContent = `${data.sys.country}`;
  dateTimeEl.textContent = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  descriptionEl.textContent = `${data.weather[0].description}`;
  feelsLikeEl.textContent = `Feels Like ${data.main.feels_like}°`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} KM/HW`;
  visibilityEl.textContent = `${data.visibility} KM`;
  uvIndexEl.textContent = `N/A`;
}

