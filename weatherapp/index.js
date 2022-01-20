// Function to get current location of user
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        document.getElementById('error').innerHTML = "Geolocation is not supported by this browser."
    }
}

// Function to request weather from API and update page with information
const getWeather = (position) => {
    const data = async () => {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`, {
            method: 'GET'
        })
        const payload = await response.json()
        let location = payload.name
        let weather = payload.weather[0].main
        let temp = payload.main.temp
        let image = payload.weather[0].icon
        document.getElementById('location').innerHTML += location
        document.getElementById('weather').innerHTML += weather
        document.getElementById('temp').innerHTML += temp + ' C'
        document.getElementById('image').src = image
    }

    data()
}

// Function to convert temperature from Celcius to Fahrenheit and back
let clicked = false
const convertTemp = () => {
    let current = parseFloat(document.getElementById('temp').innerHTML)
    if (!clicked) {
        let fahr = (current * 9/5) + 32
        document.getElementById('temp').innerHTML = fahr.toFixed(2) + ' F'
        return clicked = true 
    } else {
        let celc = (current - 32) * 5/9
        document.getElementById('temp').innerHTML = celc.toFixed(2) + ' C'
        return clicked = false
    }
    
}