const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(flyoverTimes) {
  for (const pass of flyoverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work', error);
    return;
  }
  console.log("It worked! IP:", ip);
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log('Invalid IP Address', error);
      return;
    }
    console.log("It worked! Coordinates are:", coords);
    fetchISSFlyOverTimes(coords, (error, flyoverTimes) => {
      if (error) {
        console.log('You fucked up', error);
        return;
      }
      console.log("It worked! Flyover times are:", flyoverTimes);
      nextISSTimesForMyLocation((error, flyoverTimes) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        printPassTimes(flyoverTimes);
      });
    });
  }); 
});

module.exports = printPassTimes;
