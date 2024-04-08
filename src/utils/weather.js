const request = require("postman-request");


const getWeather = (city='Delhi', callback) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    city
  )}?unitGroup=metric&key=PPUB49ZRSCFK9SLZLKUPH8T69&contentType=json#`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (!response.body.address) {
      callback(response.body, undefined);
    } else {
      const data = response.body;
      callback(undefined, data);
    }
  });
};



module.exports = getWeather
