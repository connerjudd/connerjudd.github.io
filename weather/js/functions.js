'use strict';

// DOM Element Variables
var pageNav = document.querySelector('#page-nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-content');
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var locStore = window.localStorage;
var sessStore = window.sessionStorage;


//  Weather Site Javascript Functions


document.addEventListener("DOMContentLoaded", function(){
// Call the modified functions
// Use the windchill functions 
let speed = 13;
let temp = 30;
let feelTemp = document.getElementById('feelTemp');
feelTemp.innerHTML = buildWC(speed, temp); 

// background image
let current = "snow";
changeSummaryImage(current);

});

console.log('My javascript is being read.');



// current date function for the footer

const options = { day: "numeric", month:"long", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);

// the last modified function for the footer


const modOptions = {weekdays: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('lastMod').textContent = new Date(document.lastModified).toLocaleDateString('en-US', modOptions);




// LAZY LOADING FOR IMAGE OPTIMIZATION

//grab all sources with atribute data-src
let imagesToLoad = document.querySelectorAll('source[data-src]');

const loadImages = (image) => {
        //make the image load before displayed
        image.setAttribute('srcset', image.getAttribute('data-src'));
        //after it displays
        image.parentElement.lastElementChild.onload = () => {
            image.removeAttribute('data-src');
            image.parentElement.lastElementChild.className = 'clear';
        };
};

//call load images for each image

if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((source) => {
      observer.observe(source);
    });
  } else {
    imagesToLoad.forEach((source) => {
      loadImages(source);
    });
  }

  // windchill function

  function buildWC (speed, temp) {
    // let feeltemp = document.getElementById('feeltemp'); 

    // Compute the windchill

    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to an intger 

    wc = Math.floor(wc);

    // If chill is greater than temp, then return the temp 

    wc = (wc > temp) ? temp : wc;

    // Display the windchill

    console.log(wc);

    // wc = 'Feels like ' '+wc+'F';
    // feelTemp.innerHTML = wc;
    return wc;
  }


  /******************************************************
   *  Implement the Time Indicator in Weather Components
   ******************************************************/

  setInterval(setClock, 1000)

  // set the time on the temp clock

  const hourHand = document.querySelector('.hand.hour')
  const minuteHand = document.querySelector('.hand.minute')
  const secondHand = document.querySelector('.hand.second')

  // set the time on the precip clock

  const hourHand1 = document.querySelector('#hnd-hr1')
  const minuteHand1 = document.querySelector('#hnd-mn1')
  const secondHand1 = document.querySelector('#hnd-sc1')

  // set the time on the current-cond clock

  const hourHand2 = document.querySelector('#hnd-hr2')
  const minuteHand2 = document.querySelector('#hnd-mn2')
  const secondHand2 = document.querySelector('#hnd-sc2')

  // function to set get the current time and designate each hand

  function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60  
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

    // temp clock

    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)

    // precip clock

    setRotation(secondHand1, secondsRatio)
    setRotation(minuteHand1, minutesRatio)
    setRotation(hourHand1, hoursRatio)

    // current-cond clock

    setRotation(secondHand2, secondsRatio)
    setRotation(minuteHand2, minutesRatio)
    setRotation(hourHand2, hoursRatio)
  }

    // function to set the proper degree to each hand

  function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
  }

/*******************************************************************
 * Determine the current weather condition 
 *******************************************************************/

  function getCondition(conditionInput)
  {
    //make the phrase lower case
    let phrase = conditionInput.toLowerCase();
  }


/****************************************************************************
 * Display the correct image on the background of the small-container
 ****************************************************************************/

 function changeSummaryImage(current) {
   current = current.toLowerCase();
   let change = document.querySelector(".clouds");
   change.classList.add(current);
 }
/*************************************************** 
*  Series of functions to obtain data, store data,   *  and then inject data into the weather page.
****************************************************/

/****************************************************
 * Fetch Weather Data
 ***************************************************/

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

 
 


   


  

  
  