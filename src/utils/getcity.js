const request = require("postman-request");

const getCity = (lat, lon, callback) => {
  const url2 = `https://api.geoapify.com/v1/geocode/reverse?lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lon)}&apiKey=ac140b08f7064e2da56aac9fa8346757`;
  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback(
        "Unable to connect with weather service.  reason: " +
          response.body.message,
        undefined
      );
    } else {

      const data = response.body;

      if (data["features"][0]["properties"]["city"] === undefined) {
        callback("No city found",undefined);
      } else {
        callback(undefined, data);
      }
    }
  });
};


module.exports = getCity;
