const request = require('request');
const printPassTimes = require('./index')

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(string, callback) {
  request(`http://ipwho.is/${string}`, (error, response, body) => {
    if (error) return callback(error, null);
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const coords = {
      "long" : parsedBody.longitude,
      "lat" : parsedBody.latitude
    };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let url  = `https://iss-flyover.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.long}`
  console.log(url)
  request(url, (error, response, body) =>{
  if (error) return callback(error, null);
  flyoverTimes = JSON.parse(body).response
  callback(null, flyoverTimes) 
  });
};


const nextISSTimesForMyLocation = function(error, flyoverTimes) {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(flyoverTimes);
};

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation 
};