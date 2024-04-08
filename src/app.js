const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const getWeather = require('./utils/weather')

// define paths for express configs
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: `Deep Choudhury`,
  });
});


app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Deep Choudhury",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Deep Choudhury",
  });
});

app.get('/weather',(req,res)=>{

  if(!req.query.address){
    return res.send({error:'No address given'})
  }

  getWeather(req.query.address, (error, data) => {
    if (error) {
      res.send({error});
    } else {
      res.send({
        city: data.address,
        address: data.resolvedAddress,
        weatherDescription: data.description,
        currentDate: data.days[0].datetime,
        currentDateTimeEpoch: data.currentConditions.datetimeEpoch,
        currentTime: data.currentConditions.datetime,
        currentTemp: data.currentConditions.temp,
        feelsLike: data.currentConditions.feelslike,
        todayAvgTemp: data.days[0].temp,
        maxtemp: data.days[0].tempmax,
        mintemp: data.days[0].tempmin,
        alert: data.alerts,
        condition: data.currentConditions.conditions,
        icon: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${data.currentConditions.icon}.png`,
        sunrise: data.currentConditions.sunrise,
        sunriseEpoch: data.days[0].sunriseEpoch,
        sunset: data.currentConditions.sunset,
        sunsetEpoch: data.days[0].sunsetEpoch,
        visibility: data.currentConditions.visibility,
        humidity: data.currentConditions.humidity,
        precip: data.currentConditions.precip,
        windSpeed: data.currentConditions.windspeed,
        futureDayFourcast: data.days,
      });
    }
  });


})


app.get('/products',(req,res)=>{

  if(!req.query.search){
    return res.send({error:'you must provide a search term'})
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get("*", (req, res) => {
  res.render('error',{
      message:'404 server error',
      title:'404',
      name:'Deep Choudhury'
  })
});

// app.get("/weather", (req, res) => {
//   res.send([
//     {
//       name: "web-server",
//       version: "1.0.0",
//       description: "",
//       main: "index.js",
//       scripts: {
//         test: 'echo "Error: no test specified" && exit 1',
//       },
//       author: "",
//       license: "ISC",
//       dependencies: {
//         express: "^4.19.2",
//       },
//     },
//   ]);
// });


app.listen(3000, () => {
  console.log("server is up on port 3000 and url : http://localhost:3000/");
});
