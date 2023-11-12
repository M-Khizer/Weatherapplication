const API_KEY = '529b251bd9fda19727269be9c0475594';

const cityName = document.getElementById('city-name')
const btn = document.getElementById('btn')
const weatherForm = document.getElementById('weather-form')

const getValue = ()=>{
    const inputCityName = cityName.value.trim();

    if (inputCityName === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter city name",
            footer: '<a href="#">Why do I have this issue?</a>'
          });    } else {
        console.log(inputCityName);
        getWeather(inputCityName);
    }}

const getWeather = async(cityName) =>{
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    const res = await fetch(url);
    const data = await res.json()
    console.log(data)
    displayWeather(data)
}

const displayWeather = (data)=>{

    const display = document.getElementById('display')

    const card = document.getElementById('card')

    if(data.cod === '404' ){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "City not found!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
    else{
        card.style.display='block'
        if (data.weather[0].description.includes('smoke') 
        || data.weather[0].description.includes('mist') 
        || data.weather[0].description.includes('haze'))
        {
        display.style.backgroundImage = 'url("./images/mist.jpg")'
    }
    else if (data.weather[0].description.includes('sky')){
        display.style.backgroundImage = 'url("./images/clearsky.jpg")'
    }
    else if(data.weather[0].description.includes('thunder')){
        display.style.backgroundImage = 'url("./images/thunder.jpg")'
    }
    else if(data.weather[0].description.includes('clouds'))
           
    {
        display.style.backgroundImage = 'url("./images/cloud.jpg")'
    }

    else if(data.weather[0].description.includes('rain')){
        display.style.backgroundImage = 'url("./images/rain.jpg")'
    }
    else if(data.weather[0].description.includes('snow')){
        display.style.backgroundImage = 'url("./images/snow.jpg")'
    }

    else{
        display.style.backgroundImage = 'url("./images/green.jpg")';
    }

    card.innerHTML = 
    `   
        <div>
            <div class = 'heading'>
                <h1>${data.name}, ${data.sys.country}</h1>
            </div>
        </div>

        <div class='weather-container'>

            <div class= 'weather-details '>
                <img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                
                <div class = 'temp-details'>
                    <h1>${data.main.temp}&deg;C </h1>
                    <span>${data.weather[0].description}</span>
                </div>
            
            </div>


            <div class = 'other-details'>

                <div>
                    <p>${data.main.feels_like}&deg;</p>
                    <span>Feels Like</span>
                </div>
                
                <div>
                    <p>${data.main.temp_max}&deg;</p>
                    <span>High</span>
                </div>
                
                <div>
                    <p>${data.main.temp_min}&deg;</p>
                    <span>Low</span>
                </div>
                
                <div>
                    <p>${data.wind.speed} m/s</p>
                    <span>Wind</span>
                </div>
                
                <div>
                    <p>${data.visibility} m </p>
                    <span>Visibility</span>
                </div>
                
              
            </div>


        </div>
    `
    }


}

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault(); // Prevent the default form submission behavior

    getValue()
})  