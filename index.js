const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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
    });
  }); 
});

