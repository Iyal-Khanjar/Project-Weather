const btnSearch = document.querySelector('.search'),
    barSearch = document.querySelector('.searchBar'),
    errorMessage = document.querySelector('.error'),
    itIsThere = document.querySelector('.alreadySearched'),
    city = document.querySelector('.searchedCity'),
    nameOfCity = document.querySelector('.cityName'),
    currentWeather = document.querySelector('.weather'),
    rise = document.querySelector('.sunrise'),
    set = document.querySelector('.sunset')


let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
async function success(pos) {
    let crd = pos.coords;
    console.log(crd);
    console.log(crd.latitude);
    console.log(crd.longitude);
    let currentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=51b66d1c18112050011a7e4248fdc8f6`
    let info = (await (await fetch(currentLocation)).json());
    let name = info.name

    let currentLocationCelsius = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=51b66d1c18112050011a7e4248fdc8f6`
    let Celsius = (await (await fetch(currentLocationCelsius)).json());

    let temp = Celsius.main.temp

    const milliseconds = info.sys.sunrise * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleTimeString()

    const milliseconds2 = info.sys.sunset * 1000
    const dateObject2 = new Date(milliseconds2)
    const humanDateFormat2 = dateObject2.toLocaleTimeString()

    nameOfCity.innerHTML = name
    currentWeather.innerHTML = temp
    rise.innerHTML = humanDateFormat
    set.innerHTML = humanDateFormat2

}
function error() {
    itIsThere.innerHTML = "You Didn't give permission"
    itIsThere.style.color = 'red'
}
navigator.geolocation.getCurrentPosition(success, error, options);

let arr = []
btnSearch.addEventListener('click', async () => {
    let cityBarSearch = barSearch.value.toLowerCase()
    itIsThere.innerHTML = ''
    try {
        if (cityBarSearch.length == 0) {
            itIsThere.innerHTML = 'You need to search a city'
            itIsThere.style.color = 'red'
        }
        else {
            if (arr.includes(cityBarSearch)) {
                itIsThere.innerHTML = 'You already searched this city'
                itIsThere.style.color = 'red'
            }
            else {
                let citySearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityBarSearch}&units=metric&appid=51b66d1c18112050011a7e4248fdc8f6`;
                let info = (await (await fetch(citySearch)).json());
                itIsThere.innerHTML = ''
                let temp = info.main.temp
                city.innerHTML += `<div class='red'>${cityBarSearch}: ${temp} &#176C</div>`
                arr.push(cityBarSearch)
                console.log(arr);
            }
        }
    } catch (err) {
        itIsThere.innerHTML = 'No such city'
        itIsThere.style.color = 'red'
    }
})
