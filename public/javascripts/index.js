fetchWeatherData('/weatherdata', manageResults);

function fetchWeatherData(url, manageResults) {
    fetch(url)
        .then(function (result) {
            result.json()
                .then(function (data) {
                    manageResults(data)
                })
        })
}

function manageResults(wData) {
    var weatherRow = document.querySelector('#weather-row')
    for (i = 0; i < wData.list.length; i++){
        var weatherBox = document.createElement('div')
        weatherBox.classList.add('info-weather')

        var cityName = document.createElement('div')
        cityName.textContent = wData.list[i].name
        weatherBox.appendChild(cityName)

        var weatherIcon = document.createElement('img')
        weatherIcon.src = `https://openweathermap.org/img/wn/${wData.list[i].weather[0].icon}@2x.png`
        weatherIcon.classList.add('weather-icon')
        weatherBox.appendChild(weatherIcon)

        var weatherDesc = document.createElement('div')
        weatherDesc.textContent = wData.list[i].weather[0].description
        weatherDesc.classList.add('weather-desc')
        weatherBox.appendChild(weatherDesc)

        var weatherTemperature = document.createElement('div')
        weatherTemperature.textContent = `${wData.list[i].main.temp.toFixed()} °C`
        weatherBox.appendChild(weatherTemperature)

        weatherRow.appendChild(weatherBox)
    }
        
    
    // console.log(wData)
    // document.querySelector('.city-name').textContent = wData.list[1].name
    // var iconDiv = document.querySelector('.weather-icon')
    // iconDiv.innerHTML = `<img src='https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png' class='u-max-full-width'>`
    // document.querySelector('.temperature-value').textContent = `${wData.main.temp.toFixed()}°C`
    // document.querySelector('.weather-desc').textContent = wData.weather[0].description
}

