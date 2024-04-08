console.log("client side js file loaded");
const WeatherForm = document.querySelector("form");

const loading = function () {

  document.getElementById("btn").disabled = true;
  var img = document.createElement("img");
  img.src = "../img/loading.gif";
  var src = document.getElementById("header");
  src.appendChild(img);

  // document.querySelector(".card-img").src = '../img/loading.gif';
  // msg1.textContent = "loading.....";
  // msg2.textContent = "";
  // document.querySelector(".date").textContent = "Date: " + "loading....";
  // document.querySelector(".temp").textContent = "Temp: " + "loading....";
  // document.querySelector(".tmax").textContent = "Temp Max: " + "loading....";
  // document.querySelector(".tmin").textContent = "Temp Min: " + "loading....";
  // document.querySelector(".flike").textContent = "Feels like: " + "loading....";
  // document.querySelector(".condition").textContent =
  //   "Condition: " + "loading....";
  // document.querySelector(".description").textContent =
  //   "DesCription: " + "loading....";
};

const loaded = function (data) {
  let imgpath = `${data.icon}`;

  var src = document.getElementById("header");
  src.removeChild(document.querySelector('img'))
  document.getElementById("body-content").style.display = "block";
  document.getElementById("d1").style.display = "block";
  document.getElementById("d2").style.display = "block";
  document.getElementById("btn").disabled = false;


const tempDivInfo = document.getElementById("temp-div");
const weatherInfoDiv = document.getElementById("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const hourlyForecastDiv = document.getElementById("hourly-forecast");

weatherInfoDiv.innerHTML = "";
hourlyForecastDiv.innerHTML = "";
tempDivInfo.innerHTML = "";

            let options = { timeStyle: "short", hour12: true };
            let suns = new Date(data.sunsetEpoch * 1000);
            let sunr = new Date(data.sunriseEpoch*1000);
            const cityName = data.city;
            const date = data.futureDayFourcast[0].datetime;
            const temperature = data.futureDayFourcast[0].temp;
            const tmax =  data.futureDayFourcast[0].tempmax
            const tmin = data.futureDayFourcast[0].tempmin
            const flike= data.futureDayFourcast[0].feelslike
            const condition=data.futureDayFourcast[0].conditions
            const description = data.futureDayFourcast[0].description;
             sunr = sunr.toLocaleTimeString(
              "en-US",
              options
            );
             suns = suns.toLocaleTimeString("en-US", options);
            const iconUrl = data.icon;
            const precip = data.precip;
            const humidity = data.humidity;
            const visibility = data.visibility;
            const windSpeed = data.windSpeed;


            const temperatureHTML = `<p>${temperature}°C</p>`;
            const weatherHtml = `
            <p>Feels like ${flike}°C</p>
            <p>Min: ${tmin}°C/ Max:${tmax}°C</p>
            <p>Sun-Rise: ${sunr} / Sun-Set: ${suns}</p>
            <p>Precip: ${precip===null?0:precip} mm</p>
            <p>Humidity: ${humidity}%</p>
            <p>Visibility: ${visibility} km</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
            <p>${cityName}</p>
            <p>${description}</p>`;


            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;


            document.getElementById("btn").disabled = false;

            showImage();
            displayDailyForecast(data);

};

function displayHourlyForecast(data,no) {
  document.getElementById("hourly-forecast").innerHTML="";
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  const next24Hours = data.futureDayFourcast[no].hours;
  let options = { timeStyle: "short", hour12: true };
  next24Hours.forEach((item) => {
    console.log()
    const dateTime = new Date(item.datetimeEpoch*1000);
    const time = dateTime.toLocaleTimeString('en-US', options);
    const temperature = item.temp;
    const iconCode = item.icon;
    const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${iconCode}.png`;
    const conditionss = item.conditions;
    const feelslike = item.feelslike;
    const precip = item.precip;
    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${time}</span>
                <span>${conditionss}</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>Temp: ${temperature}°C</span>
                <span>Feels Like: ${feelslike}°C</span>
                <span>Precip: ${precip} mm</span>
            </div>
        `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function displayDailyForecast(data) {
  document.getElementById("daily-forecast").innerHTML = "";
  const dailyForecastDiv = document.getElementById("daily-forecast");

  const next15Days = data.futureDayFourcast; 
  let arr = [];
  next15Days.forEach((item) => {
    console.log();
    const dateTime = new Date(item.datetimeEpoch * 1000);
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = dateTime.getDate();
    const day = weekday[dateTime.getDay()];
    const month = months[dateTime.getMonth()];
    const feellike = item.feelslike;
    const temperature = item.temp;
    const iconCode = item.icon;
    const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${iconCode}.png`;
    const tmax = item.tempmax;
    const tmin = item.tempmin;
    const conditions = item.conditions;
    const humidity = item.humidity;
    const visibility = item.visibility;
    const dailyItemHtml = `
            <div class="daily-item">
                <span>${day}</span>
                <span>${date} ${month}</span>
                <span>${conditions}</span>
                <img src="${iconUrl}" alt="Daily Weather Icon">
                <span>temp: ${temperature}°C</span>
                <span>feels: ${feellike}°C</span>
                <span>${tmin}°C / ${tmax}°C</span>
                <span>H: ${humidity}% / V: ${visibility} km</span>
            </div>
        `;

    dailyForecastDiv.innerHTML += dailyItemHtml;
    
  });


  document.getElementById("daily-forecast").children[0].onclick = function () {
    displayHourlyForecast(data, 0);
  };
  document.getElementById("daily-forecast").children[1].onclick = function () {
    displayHourlyForecast(data, 1);
  };
  document.getElementById("daily-forecast").children[2].onclick = function () {
    displayHourlyForecast(data, 2);
  };
  document.getElementById("daily-forecast").children[3].onclick = function () {
    displayHourlyForecast(data, 3);
  };
  document.getElementById("daily-forecast").children[4].onclick = function () {
    displayHourlyForecast(data, 4);
  };
  document.getElementById("daily-forecast").children[5].onclick = function () {
    displayHourlyForecast(data, 5);
  };
  document.getElementById("daily-forecast").children[6].onclick = function () {
    displayHourlyForecast(data, 6);
  };
  document.getElementById("daily-forecast").children[7].onclick = function () {
    displayHourlyForecast(data, 7);
  };
  document.getElementById("daily-forecast").children[8].onclick = function () {
    displayHourlyForecast(data, 8);
  };
  document.getElementById("daily-forecast").children[9].onclick = function () {
    displayHourlyForecast(data, 9);
  };
  document.getElementById("daily-forecast").children[10].onclick = function () {
    displayHourlyForecast(data, 10);
  };
  document.getElementById("daily-forecast").children[11].onclick = function () {
    displayHourlyForecast(data, 11);
  };
  document.getElementById("daily-forecast").children[12].onclick = function () {
    displayHourlyForecast(data, 12);
  };
  document.getElementById("daily-forecast").children[13].onclick = function () {
    displayHourlyForecast(data, 13);
  };
  document.getElementById("daily-forecast").children[14].onclick = function () {
    displayHourlyForecast(data, 14);
  };
  
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}



const err = function(error){


  var src = document.getElementById("header");
  src.removeChild(document.querySelector("img"));
  document.getElementById("body-content").style.display = "block";

  document.getElementById("d1").style.display="none"
  document.getElementById("d2").style.display="none"
  document.getElementById("btn").disabled = false;



  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";


  weatherInfoDiv.innerHTML = `<p>${error}</p>`;
}





loading()

fetch(`/weather?address=Delhi`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      err(data.error)
    } else {
      loaded(data);
    }
  });
});

WeatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loading();

  document.getElementById("body-content").style.display="none";


  const city = document.querySelector("input").value;
  console.log(city);
  fetch(`/weather?address=${city}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        err(data.error);
      } else {
        loaded(data)
      }
    });
  });
});




