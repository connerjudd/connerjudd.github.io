// current date function for the footer

const options = { day: "numeric", month:"long", year: "numeric"};
document.getElementById("currentdate").textContent = new Date().toLocaleDateString("en-US", options);

// the last modified function for the footer


const modOptions = {weekdays: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('lastMod').textContent = new Date(document.lastModified).toLocaleDateString('en-US', modOptions);
