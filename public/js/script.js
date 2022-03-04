'use strict'

console.log("Client side javascript file is loaded");
const locationForm = document.querySelector(".location-form");
const locationInput = document.querySelector(".location-input");
const weatherSection = document.querySelector(".weather-section");

const displayData = function(data)
{
    const html = `<p>Current Weather</p>
    ${data.weather_descriptions[0]}<br>
    Temperature: ${data.temperature}`
    weatherSection.innerHTML = "";
    weatherSection.insertAdjacentHTML(`afterbegin`,html);
}
const displayError = function()
{
    const html = "<p>Couldn't get your data, try another search</p>";
    weatherSection.innerHTML = html;
}
///ZAJEBISTY SPOSÓB W CHUJ ŻEBY ROBIĆ FETCHING DATA Z MOJEGO LOGOWANIA 
locationForm.addEventListener("submit",(e)=>
{
    weatherSection.innerHTML = "<br/>Loading...";
    e.preventDefault();//I can use that to fetch my login/password data in chess project
    fetch(window.location.href + `weather?address=${locationInput.value}`)
    .then((response)=>response.json(),displayError)
    .then((data)=>{
        displayData(data);
        },displayError);
})