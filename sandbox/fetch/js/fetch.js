'use strict';

// where we are going to get 

var url = "/sandbox/fetch/js/idahoweather.json";
var sessStore = window.sessionStorage;

function getWeatherData(url) {
    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR("Net work response was ok.");
        })
        .then(function (data){
            console.log(data);
        let cityName = data.Preston.properties.relativeLocation.properties.city;
        console.log(cityName);
        
        sessStore.setItem('cityName', cityName);
        document.querySelector("#unique").innerHTML = sessStore.getItem('cityName');
        let hourURL = data.Preston.properties.forecastHourly;
        getHourly(hourURL);
        })
        .catch(function (error){
            console.log('There was a problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
        
}

getWeatherData(url);


// GET HOURLY FORECAST DATA FROM NWS API 
function getHourly(hourURL) {
    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR("Net work response was ok.");
        })
.then(function (data) {
    console.log('Data from getHourly function');
    console.log(data);

    //store 12 hours of data to session storage

    var hourData = [];
    let todayDate = new Date();
    var nowHour = todayDate.getHours();
    console.log(`nowHour is ${nowHour}`);
    for(let i = 0, x = 11; i <= x; i++) 
    if (nowHour < 24) {
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour++;
    }
    else {
        nowHour = nowHour - 12;
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        nowHour = 1;
    }
})
}
