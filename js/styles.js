/*let daynames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December"
];

let d = new Date();
let dayName = daynames[d.getDay()];
let monthName = months[d.getMonth()];
let fulldate = dayName + ", " + monthName + " " + d.getDate() +", " + year;
d.getFullYear();

document.getElementById("currentYear").textContent = d.getFullYear;
document.getElementById("currentdate").textContent = fulldate;*/

document.getElementById('copyrightdate').textContent = new Date();
document.getElementById('lastmodified').textContent = new Date(document.lastModified);

