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

async function fetchWeather(city, lat, long) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=weather_code,temperature_2m,is_day,wind_speed_10m,relative_humidity_2m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        setDisplay(city, json);


    } catch (error) {
        console.error(error.message);
    }

}

async function setDisplay(name, weather) {
    try {
        const codes = `./weather-code-images.json`;
        const res = await fetch(codes);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        const codeMap = await res.json();

        let dayNight;
        if (weather.current.is_day) {
            dayNight = 'day';
        } else {
            dayNight = 'night';
        }

        const code = weather.current.weather_code;

        const icon = document.querySelector(`#weather-icon`);
        icon.src = `${codeMap[code][dayNight][`image`]}`;

    } catch (error) {
        console.error(error.message);
    };

    const cityName = document.querySelector('#city-name');
    cityName.innerHTML = `${name}`;

    const temp = document.querySelector('#temperature');
    temp.innerHTML = `${weather.current.temperature_2m}℉`;

    const humidity = document.querySelector('#humidity');
    humidity.innerHTML = `Humidity: ${weather.current.relative_humidity_2m}%`;

    const wind = document.querySelector('#wind');
    wind.innerHTML = `Wind: ${weather.current.wind_speed_10m}mph`;

    const weatherCard = document.querySelector('.weather-card');
    weatherCard.classList.remove('hidden');
}

async function getLatLong(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    try {
        const response = await fetch(geoUrl);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const geo = await response.json();
        fetchWeather(geo.results[0].name, geo.results[0].latitude, geo.results[0].longitude);


    } catch (error) {
        console.error(error.message);
    }
}