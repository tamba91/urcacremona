fetchWeatherData('https://api.openweathermap.org/data/2.5/weather?q=Cremona&units=metric&lang=it&appid=b734a115782cc2c4b428f09c5d0a6d63', manageResults);
function fetchWeatherData(url, manageResults) {
    fetch(url)
        .then(response => response.json())
        .then(data => manageResults(data));
}

function manageResults(wData) {
    var iconDiv = document.querySelector('.weather-icon')
    iconDiv.innerHTML = `<img src='https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png' class='u-max-full-width'>`
    document.querySelector('.temperature-value').textContent = `${wData.main.temp.toFixed()}°C`
    document.querySelector('.weather-desc').textContent = wData.weather[0].description
}

