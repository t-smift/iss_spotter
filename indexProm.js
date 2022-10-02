const { nextISSTimesForMyLocation } = require('./iss_promised');


const printPassTimes = function(flyoverTimes) {
  for (const pass of flyoverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("it didn't work: ", error.message);
  });