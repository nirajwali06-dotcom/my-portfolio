const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const locationText = document.getElementById("location");
const message = document.getElementById("message");

async function getWeather(city) {
    try {
        message.textContent = "Loading...";

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!locationResponse.ok) {
            throw new Error("Location request failed");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found");
        }

        const place = locationData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather request failed");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        temperature.textContent =
            `${current.temperature_2m} °C`;

        humidity.textContent =
            `${current.relative_humidity_2m} %`;

        wind.textContent =
            `${current.wind_speed_10m} km/h`;

        locationText.textContent =
            `${place.name}, ${place.country}`;

        message.textContent = "Weather updated successfully.";

    } catch (error) {
        message.textContent =
            "Unable to get weather. Please check the city name and try again.";

        temperature.textContent = "-- °C";
        humidity.textContent = "-- %";
        wind.textContent = "-- km/h";
        locationText.textContent = "No weather data available.";
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
});
