fetchWeatherData('/weatherdata', manageResults);
function fetchWeatherData(url, manageResults) {
    fetch(url)
        .then(function(result){
            result.json()
        .then(function(data){
            manageResults(data)
        })
        })
}

function manageResults(wData) {
    var iconDiv = document.querySelector('.weather-icon')
    iconDiv.innerHTML = `<img src='https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png' class='u-max-full-width'>`
    document.querySelector('.temperature-value').textContent = `${wData.main.temp.toFixed()}°C`
    document.querySelector('.weather-desc').textContent = wData.weather[0].description
}

