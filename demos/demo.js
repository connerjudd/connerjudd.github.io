/* CLASS DEMO */
 'use strict';

 /*****************************************************
  * A collection of functions for the weather site
  *****************************************************/

  /*****************************************************
  * Waits for the DOM to load, then starts Javascript Execution
  *****************************************************/
document.addEventListener("DOMContentLoaded", function() {
// Call the modified date function
buildModDate();
// Work with the small screen menu
let menuButton = document.getElementById("#menuBtn");
menuButton.addEventListener("click, mobileMenu");

// Call the Wind Chill Function 
let speed = 4.8;
let temp = 51;
document.getElementById(' //variable for windchill// ').innerHTML = buildWC(speed, temp);
});

/***********************************************
 * Calculate the Wind Chill
 ************************************************/
 // Compute the windchill

 // Round the answer down to integer

 // if chill is greater than temp, return temp

 // Display the windchill

 //
 
  
