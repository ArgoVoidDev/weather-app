function saveLastCity(cityName) {
  localStorage.setItem("lastCity", cityName);
}

function getLastCity() {
  return localStorage.getItem("lastCity");
}
