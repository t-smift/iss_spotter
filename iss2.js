const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(string, callback) {
  request(`http://ipwho.is/${string}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(error(message), null);
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
  
  request(url, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    }
    
  flyoverTimes = JSON.parse(body).response
  callback(null, flyoverTimes) 
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(errror, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};  
 
 
module.exports = { 
  nextISSTimesForMyLocation 
};