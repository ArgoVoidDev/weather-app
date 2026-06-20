const screens = document.querySelectorAll("main > section"); // All screen sections

const navButtons = document.querySelectorAll("nav button"); // Navigation buttons

const errorName = document.getElementById("errorCity");

const defaultScreen = "empty-screen"; // Screen shown when the page loads

function showScreen(screenName) {
  // Hide all screens
  screens.forEach((screen) => screen.classList.add("hidden"));

  // Remove active state from all buttons
  navButtons.forEach((btn) => btn.classList.remove("active"));

  // Show the selected screen
  document.querySelector("." + screenName).classList.remove("hidden");

  // Highlight the button of the current screen
  document
    .querySelector(`[data-screen="${screenName}"]`)
    .classList.add("active");
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the target screen from the clicked button
    const screenName = button.dataset.screen;

    if (screenName === "empty-screen") {
      document.body.className = "";
    }

    // Switch to the selected screen
    showScreen(screenName);
  });
});

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

        const condition = data.weather[0].main;
        if (
          condition === "Rain" ||
          condition === "Drizzle" ||
          condition === "Thunderstorm"
        ) {
          showScreen("rainy-screen");
        } else {
          showScreen("clear-screen");
        }
        errorName.textContent = "";
      } catch (error) {
        errorName.textContent = `"${cityName}" couldn't be found`;
        showScreen("error-screen");
      }
    input.value = ''

    }
  });
});
