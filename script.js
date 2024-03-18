const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide')

search.addEventListener('click', () => {
    
    const APIkey = '1806141e40656dba4c4f2362c5ec3f2e';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {
            console.log(json);
            if (json.cod == '404'){
                cityHide.textContent = city;
                container.style.height = '450px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity .info-humidity span');
            const wind = document.querySelector('.weather-details .wind .info-wind span');
            
            if (cityHide.textContent == city) {
                return;
            }
            else {
                cityHide.textContent = city;

                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active')

                setTimeout(() => {
                    container.classList.remove('active')
                }, 2500);

                switch (json.weather[0].main) {
                    
                    case 'Clear':
                        image.src = "source/clear.png";
                        break;
                    case 'Rain':
                        image.src = "source/rain.png";
                        break;
                    case 'Snow':
                        image.src = "source/snow.png";
                        break;
                    case 'Clouds':
                        image.src = "source/clouds.png";
                        break;
                    case 'Mist':
                        image.src = "source/mist.png";
                        break;
                    case 'Haze':
                        image.src = "source/mist.png";
                        break;
                    default:
                        image.src = "source/clouds.png";
                }
    
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const CloningInfoWeather = infoWeather.cloneNode(true);
                const CloningInfoHumidity = infoHumidity.cloneNode(true);
                const CloningInfoWind = infoWind.cloneNode(true);

                CloningInfoWeather.id = 'clone-info-weather';
                CloningInfoWeather.classList.add('active-clone');

                CloningInfoHumidity.id = 'clone-info-humidity';
                CloningInfoHumidity.classList.add('active-clone');

                CloningInfoWind.id = 'clone-info-wind';
                CloningInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement('afterend', CloningInfoWeather);
                    infoHumidity.insertAdjacentElement('afterend', CloningInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", CloningInfoWind);
                }, 2200);

                const cloneinfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const totalCloneInfoWeather = cloneinfoWeather.length;
                const cloneInfoWeatherFirst = cloneinfoWeather[0];

                const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoHumidityFirst = cloneInfoHumidity[0];

                const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                const cloneInfoWindFirst = cloneInfoWind[0];

                if (totalCloneInfoWeather > 0) {
                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove();
                        cloneInfoHumidityFirst.remove();
                        cloneInfoWindFirst.remove();
                    }, 2200);
                }
            }
        });
});
