
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss')
const { nextISSTimesForMyLocation } = require('./iss')

function callback(Error, data) {
  if (Error) {
    console.log("It didn't work!" , Error);
  } else {
    console.log("Data", data);
  }
}

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coordinates)=>{
    if(error){
      console.error("Error fetching coordinates:", error)
      return
    }
    console.log('coordinates:', coordinates);

    fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
      if (error) {
        console.error("Error fetching ISS fly over times:", error);
        return;
      }

      console.log('Fly Over Times:', flyOverTimes);
    });
  })


  const ipAddress = '99.241.191.115';
  fetchCoordsByIP(ipAddress, callback);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});




module.exports = { fetchMyIP };