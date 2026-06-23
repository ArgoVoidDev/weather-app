const screens = document.querySelectorAll("main > section"); // All screen sections

const errorName = document.getElementById("errorCity");

const defaultScreen = "empty-screen"; // Screen shown when the page loads

function showScreen(screenName) {
  // Hide all screens
  screens.forEach((screen) => screen.classList.add("hidden"));

  // Show the selected screen
  document.querySelector("." + screenName).classList.remove("hidden");
}

// Display the default screen when the page loads
showScreen(defaultScreen);

const searchInputs = document.querySelectorAll(".search-Input");

searchInputs.forEach((input) => {
  input.addEventListener("keydown", async (event) => {
    
    if (event.key === "Enter") {

      const cityName = input.value.trim();

      if (!cityName) return;

      showScreen("loading-screen");

      try {
        const data = await fetchWeather(cityName);

        updateUI(data);

        const forecastData = await fetchForecast(cityName);

        updateForecast(forecastData);

        input.value = "";

        const condition = data.weather[0].main;

        showScreen("weather-screen");

        errorName.textContent = "";

      } catch (error) {
        errorName.textContent = `"${cityName}" couldn't be found`;

        showScreen("error-screen");
      }

      input.value = "";
    }
  });
});
