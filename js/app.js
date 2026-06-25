const screens = document.querySelectorAll("main > section");

const errorName = document.getElementById("errorCity");

const defaultScreen = "empty-screen";

const logos = document.querySelectorAll(".skycast-logo");

let currentWeatherData = null;

function showScreen(screenName) {
  screens.forEach((screen) => screen.classList.add("hidden"));

  const activeScreen = document.querySelector("." + screenName);

  activeScreen.classList.remove("hidden");

  activeScreen.classList.remove("fade-in");

  void activeScreen.offsetWidth;

  activeScreen.classList.add("fade-in");
}

// Display the default screen when the page loads
showScreen(defaultScreen);

async function searchCity(cityName) {
  if (!cityName) return;

  showScreen("loading-screen");

  try {
    const data = await fetchWeather(cityName);
    currentWeatherData = data;
    updateUI(data);
    isCelsius = true;
    updateTemperature();

    const forecastData = await fetchForecast(cityName);
    updateForecast(forecastData);

    showScreen("weather-screen");
    errorName.textContent = "";
  } catch (error) {
    errorName.textContent = `"${cityName}" couldn't be found`;
    showScreen("error-screen");
  }
}

logos.forEach((logo) => {
  logo.addEventListener("click", () => {
    showScreen("empty-screen");
    document.body.className = "";
  });
});

const searchInputs = document.querySelectorAll(".search-Input");

searchInputs.forEach((input) => {
  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const cityName = input.value.trim();
      await searchCity(cityName);
      input.value = "";
    }
  });
});

const suggestionButtons = document.querySelectorAll(".btn-box .btn");

suggestionButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const cityName = button.textContent;
    await searchCity(cityName);
  });
});

function toF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

let isCelsius = true;

const toggleButtons = document.querySelectorAll(".chenga-toggle button");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "°F" && isCelsius) {
      isCelsius = false;
      updateTemperature();
    }

    if (button.textContent === "°C" && !isCelsius) {
      isCelsius = true;
      updateTemperature();
    }
  });
});

function updateTemperature() {
  const originalTemp = currentWeatherData.main.temp;

  const displayTemp = isCelsius ? Math.round(originalTemp) : toF(originalTemp);

  document.getElementById("temperature").textContent = `${displayTemp}°`;

  const originalFeelsLike = currentWeatherData.main.feels_like;

  const displayFeelsLike = isCelsius
    ? Math.round(originalFeelsLike)
    : toF(originalFeelsLike);

  document.getElementById("feelsLike").textContent =
    `Feels Like ${displayFeelsLike}°`;

  const tempElements = document.querySelectorAll("[data-temp]");

  tempElements.forEach((el) => {
    const original = parseFloat(el.dataset.temp);
    const display = isCelsius ? Math.round(original) : toF(original);
    el.textContent = `${display}°`;
  });
}

const locationButtons = document.querySelectorAll(".location-btn-trigger");

locationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        showScreen("loading-screen");

        try {
          const data = await fetchWeatherByCoords(lat, lon);
          currentWeatherData = data;
          updateUI(data);

          const forecastData = await fetchForecastByCoords(lat, lon);
          currentForecastData = forecastData;
          updateForecast(forecastData);

          showScreen("weather-screen");
          errorName.textContent = "";
        } catch (error) {
          showScreen("error-screen");
          errorName.textContent = "Couldn't get your location weather";
        }
      },

      () => {
        alert("Please allow location access to use this feature");
      },
    );
  });
});

function getLocalTime(timezoneOffset) {
  const now = new Date();

  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  const localTime = new Date(utc + timezoneOffset * 1000);

  return localTime.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
