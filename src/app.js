'use strict'
const path = require("path")
const express = require("express");
const hbs = require("hbs");
const getLocationData = require(path.join(__dirname,"utils/geocode.js"));
const getWeather = require(path.join(__dirname,"utils/get_weather.js"));


//node provides that
// console.log(__dirname);//directiry the current script lives in
// console.log(__filename);//path to the current file
//chuj
//define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public");
// const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
const viewsPath = path.join(__dirname,"../templates/views");

//getting express object
const app = express();



//it defines what app should do when someone enters the specific URL
//it get's the partial URL as argument
//for example "nothing", /help, /credits, /about, etc.
// app.get("",function(req,res) //this one is never going to run
// {
//     res.send("<h1>Welcome here</h1>")
// })
    
// app.get("/help",function(req,res)
// {
//    res.send("<h1>Help Page</h1><br><a href = 'http://localhost:3000/'>Home Page</a>")
// })
    
// app.get("/about",function(req,res)
// {
//    res.send()
// })
    
//we use app.use to customize our web server
//setting the main folder that is used for linking static files
//app.use(exp..) needs to go first becouse express will look there at first
app.use(express.static(publicDirectoryPath))


//HANDLEBARS
//app.set is used to set a lot of different things
app.set("view engine","hbs");//that's how we get handlebars to our application
//we need handlebars to have "dynamic" web page
//or to have for example the same footer in 4 pages

//setting the views directory
app.set("views",viewsPath)

//starting working with partials(for ex. footers that are the same for every page)
hbs.registerPartials(partialsPath)
//static values
const name = "Jakub Lasecki";
const mail = "jakublasecki321@gmail.com"
app.get("",function(req,res)
{
    res.render("index.hbs",{
        title: "Weather",
        name
    })//it automatically navigates to the views folder
})


//setting 404 pages
const renderError = function(res,errorMessage)
{
    res.render("error",{
        title:"404 Error",
        name,
        errorMessage
    })
}
app.get("/weather",function(req,res)
{
    if(!req.query.address)
    {
        res.send("no address provided");
        return;
    }
    getLocationData(req.query.address,(data)=>{
        const location = data.center;
        getWeather(location,(weatherData)=>{
            console.log(weatherData);
            res.send(weatherData)
        },()=>renderError(res,"Couldn't get your data"))
    },()=>renderError(res,"Couldn't get your data"));
})

app.get("/about",function(req,res)
{
    res.render("about",{
        title: "About me",
        name
    })
})
app.get("/help",function(req,res)
{
    res.render("help",{
        message: "If you need help contact me via email: ",
        mail,
        title:"Help",
        name
    })
})

//test for fun
app.get("/products",function(req,res)
{
    console.log(req.query);
    if(!req?.query.search) 
    {
        console.log("search not provided");
        res.send("search not provided");
        return;
    }
    res.send({
        products: []
    })
})

app.get("/help/*",function(req,res)
{
    renderError(res,"help subpage didn't find");
})
//this .get() needs to be the last
app.get("*",function(req,res)
{
    renderError(res,"page didn't find");
})
app.listen(3000,function()
{
    console.log("Server is up at port 3000");
})