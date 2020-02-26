'use strict';


//  Weather Site Javascript Functions 
document.addEventListener("DOMContentLoaded", function(){
    // Call the modified functions

});

console.log('My javascript is being read.');



// current date function for the footer

function setDate(){
  document.getElementById('date').innerHTML=Date();
}

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