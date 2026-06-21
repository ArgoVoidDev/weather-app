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
  } catch (error) {
    throw error;
  }
}

async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("Forecast not found");
    }

    const data = await response.json();

    const dailyForecasts = data.list.filter((item) =>
      item.dt_txt.includes("12:00:00"),
    );

    return dailyForecasts;
  } catch (error) {
    throw error;
  }
}
