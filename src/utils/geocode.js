'use strict'

const request = require('request');
const getLocationData = function(name,succCallback,errorCallback)
{
    //making a request
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(name)}.json?types=place&access_token=pk.eyJ1IjoiaGVrY2l1IiwiYSI6ImNreGh2YmFwajRscWcyb28xbjFzMXFmYnUifQ.-vzH5M_yX6oFkdMKH5WU1Q&limit=1`;
    request(url,function(error,{body} = {})
    {
        if(error)
        {
            errorCallback("Something went wrong, couldn't access geolocation API...");
            return;
        }
        const data = JSON.parse(body).features[0];
        if(!data)
        {
            errorCallback("Something went wrong, couldn't get your location data...");
            return;
        }
        succCallback(data);
    })
}

module.exports = getLocationData;