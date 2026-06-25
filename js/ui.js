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

const weatherIconEl = document.getElementById("weatherIcon");

function updateUI(data) {
  temperatureEl.textContent = `${data.main.temp}°`;
  cityNameEl.textContent = `${data.name} ,`;
  countryEl.textContent = `${data.sys.country}`;
  dateTimeEl.textContent = getLocalTime(data.timezone);

  descriptionEl.textContent = `${data.weather[0].description}`;
  feelsLikeEl.textContent = `Feels Like ${data.main.feels_like}°`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} KM/H`;
  visibilityEl.textContent = `${data.visibility} KM`;
  uvIndexEl.textContent = `N/A`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIconEl.src = iconUrl;

  updateBackground(data.weather[0].main, data.weather[0].icon);
}

function updateForecast(forecasts) {
  const container = document.getElementById("forecastCards");

  container.innerHTML = "";

  forecasts.forEach((item) => {
    const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    const maxTemp = Math.round(item.main.temp_max);
    const minTemp = Math.round(item.main.temp_min);

    const cardHTML = `
    <div class="card">
      <h4>${day}</h4>
      <img src="${iconUrl}" alt="${item.weather[0].description}" width="48" height="48"/>
      <span data-temp="${item.main.temp_max}">${Math.round(item.main.temp_max)}°</span>
      <p data-temp="${item.main.temp_min}">${Math.round(item.main.temp_min)}°</p>
    </div>
  `;
    container.innerHTML += cardHTML;
  });
}

function updateBackground(condition, icon) {
  document.body.classList = "";

  const isNight = icon.endsWith("n");

  if (isNight) {
    document.body.classList.add("weather-night");
    return;
  }

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
