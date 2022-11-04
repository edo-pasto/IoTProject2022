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
client.subscribe('/ul/4jggokgpepnvsb2uv4s40d59ov/soilMoistureSensor001/attrs')

function sendMessage(){
let date =  new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
let soilMoisture = Math.floor(Math.random() * 10) 
let soilMoistureType = ''


if(soilMoisture>=0 && soilMoisture <= 3){
    soilMoistureType = 'Dry'
  }else if(soilMoisture >= 4 && soilMoisture <= 7){
    soilMoistureType = 'Moist'
  }else if(soilMoisture >= 8 && soilMoisture <= 10){
    soilMoistureType = 'Wet'
  }


  let message = {
    "soilMoisture": soilMoisture,
    "soilMoistureType": soilMoistureType,
    "Time": date.toString()
   } 

  
  // mex = JSON.stringify(message)
    let mex = `sm|${soilMoisture}|smt|${soilMoistureType}|t|${date.toString()}`
    console.log('Soil Moisture sensor send data...');
    console.log(JSON.stringify(message));
    // the client publish a new message
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/soilMoistureSensor001/attrs', mex);
    client.publish('/db/soilMoistureSensor', JSON.stringify(message))
}

// fired when new message is received
client.on('message', function(topic, message) {
  console.log("ok");
 // console.log(message.toString());
});

let s=createServer(
  (req,res) => {
      if(req.method === 'GET'){
        if(req.url.toString() === '/soilMoistureSensor001/start?' || req.url.toString() === '/soilMoistureSensor001/start'){
          setInterval(sendMessage, 1000)
        }
        if(req.url.toString() === '/soilMoistureSensor001/stop?' || req.url.toString() === '/soilMoistureSensor001/stop'){
          console.log("Stopping Soil Moisture Sensor");
          res.write('Stopping Soil Moisture Sensor')
          process.exit();
        }
}

})
s.listen(8084)