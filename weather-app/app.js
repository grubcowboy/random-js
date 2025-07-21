const searchBox = document.querySelector('.search-box');
const cityInput = document.querySelector('#city-input');


searchBox.addEventListener('click', () => {
    getLatLong(cityInput.value);
    cityInput.value = '';
});

searchBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        getLatLong(cityInput.value);
        cityInput.value = '';
    }
});

async function fetchWeather(name, lat, long) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=wind_speed_10m,temperature_2m,relative_humidity_2m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        const cityName = document.querySelector('#city-name');
        cityName.innerHTML = `${name}`;

        const temp = document.querySelector('#temperature');
        temp.innerHTML = `${json.current.temperature_2m}℉`;

        const humidity = document.querySelector('#humidity');
        humidity.innerHTML = `Humidity: ${json.current.relative_humidity_2m}%`;

        const wind = document.querySelector('#wind');
        wind.innerHTML = `Wind: ${json.current.wind_speed_10m}mph`;

        const weatherCard = document.querySelector('.weather-card');
        weatherCard.classList.remove('hidden');

    } catch (error) {
        console.error(error.message);
    }

};

async function getLatLong(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    try {
        const response = await fetch(geoUrl);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json.results[0]);
        fetchWeather(json.results[0].name, json.results[0].latitude, json.results[0].longitude);


    } catch (error) {
        console.error(error.message);
    }
};