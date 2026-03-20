document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfoDisplay = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const errorMessage = document.getElementById('error-message');

  const API_KEY = '47499319a9fe758ca1385b2dff731476';

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const cityData = await fetchWeatherData(city);
      displayWeatherData(cityData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
    );
    const response = await weatherData.json();
    if (!weatherData.ok) {
      throw new Error('City Not Found');
    }
    return response;
  }
  function displayWeatherData(weatherData) {
    errorMessage.classList.add('hidden');
    weatherInfoDisplay.classList.remove('hidden');
    cityNameDisplay.textContent = `${weatherData.name}`;
    temperature.textContent = `Temperature: ${weatherData.main.temp} °C`;
    description.textContent = `Weather: ${weatherData.weather[0].description}`;
  }
  function showError() {
    weatherInfoDisplay.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
});
