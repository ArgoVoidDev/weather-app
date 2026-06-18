const screens = document.querySelectorAll("main > section");

const navButtons = document.querySelectorAll("nav button");

const defaultScreen = "empty-screen";

function showScreen(screenName) {
  screens.forEach((screen) => screen.classList.add("hidden"));

  navButtons.forEach((btn) => btn.classList.remove("active"));

  document.querySelector("." + screenName).classList.remove("hidden");

  document.querySelector(`[data-screen ="${screenName}"]`).classList.add('active')
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const screenName = button.dataset.screen;

    showScreen(screenName);
  });
});
showScreen(defaultScreen);
