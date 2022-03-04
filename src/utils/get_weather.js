'use strict'

const request = require("request");

const getWeather = function([lng,lat] = [],succCallback,errorCallback)
{
    const url = `http://api.weatherstack.com/current?access_key=d0accf743f50b69ea6246938934b0240&query=${lat},${lng}&units=m`;
    request(url,function(error,{body} = {})
    {
        if(error)
        {
            errorCallback("Something went wrong, couldn't access weather API...");
            return;
        }
        const data = JSON.parse(body).current;
        if(!data)
        {
            errorCallback("Something went wrong, couldn't get your weather data...");
            return;
        }
        succCallback(data);
    })
}

module.exports = getWeather;