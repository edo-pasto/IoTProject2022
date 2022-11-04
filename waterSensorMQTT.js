'use strict'
const {createServer} = require('http')
const {parse} = require('url')
const url = require('url')
const weather='/home'
const headers={"Content-Type" : "application/json"}
var mqtt = require('mqtt');
 
var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
 
// the client subscribe a new topic
// client.subscribe('IOT22');
client.subscribe('/ul/4jggokgpepnvsb2uv4s40d59ov/waterSensor001/attrs')

function sendMessage(){
  let date =  new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  let salinity = Math.floor(Math.random() * (30000 - 100 + 1)) + 100
  let salinityType = ''
  let sodium = Math.floor(Math.random() * 30);
  let sodiumType = ''

  if(salinity>=100 && salinity <= 250){
      salinityType = 'Low'
    }else if(salinity >= 251 && salinity <= 750){
      salinityType = 'Medium'
    }else if(salinity >= 751 && salinity <= 2250){
      salinityType = 'High'
    }else if(salinity >= 2251 && salinity <= 30000){
      salinityType = 'Very High'
    }

  if(sodium>=0 && sodium <= 10){
    sodiumType = 'Low'
  }else if(sodium >= 11 && sodium <= 18){
    sodiumType = 'Medium'
  }else if(sodium >= 19 && sodium <= 26){
    sodiumType = 'High'
  }else if(sodium >= 27 && sodium <= 30){
    sodiumType = 'Very High'
  }


  let message = {
    "SalinityValue": salinity,
    "SalinityType": salinityType,
    "SodiumType": sodiumType,
    "SodiumValue": sodium,
    "Timestamp": date.toString()
   } 

   let mex = `s|${salinity}|st|${salinityType}|so|${sodium}|sot|${sodiumType}|t|${date.toString()}`
  // mex = JSON.stringify(message)
    console.log('Water sensor send data...');
    console.log(JSON.stringify(message));
    // the client publish a new message
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/waterSensor001/attrs', mex);
    client.publish('/db/waterSensor', JSON.stringify(message))

}

// fired when new message is received
client.on('message', function(topic, message) {
  console.log("ok");
  // console.log(message.toString());
});
let s=createServer(
  (req,res) => {
      if(req.method === 'GET'){
        if(req.url.toString() === '/waterSensor001/start?' || req.url.toString() === '/waterSensor001/start'){
          setInterval(sendMessage, 1000)
        }
        if(req.url.toString() === '/waterSensor001/stop?' || req.url.toString() === '/waterSensor001/stop'){
          console.log("Stopping Water Sensor");
          res.write('Stopping Water Sensor')
          process.exit();
        }
}

})
s.listen(8083)