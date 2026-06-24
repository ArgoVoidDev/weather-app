const screens = document.querySelectorAll("main > section");

const errorName = document.getElementById("errorCity");

const defaultScreen = "empty-screen";

const logos = document.querySelectorAll(".skycast-logo");

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
    updateUI(data);

    const forecastData = await fetchForecast(cityName);
    updateForecast(forecastData);

    showScreen("weather-screen");
    errorName.textContent = "";

  } catch (error) {
    errorName.textContent = `"${cityName}" couldn't be found`;
    showScreen("error-screen");
  }
}

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