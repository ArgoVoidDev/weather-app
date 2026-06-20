const API_KEY = CONFIG.API_KEY;

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("City Not Find");
    }
    const data = await response.json();

    return data;

  } catch (error) {}
}
