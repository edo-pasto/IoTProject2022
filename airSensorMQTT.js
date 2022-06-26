'use strict'
const {createServer} = require('http')
const {parse} = require('url')
const url = require('url')
const headers={"Content-Type" : "application/json"}
var mqtt = require('mqtt');
 
var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
 
// the client subscribe a new topic
// client.subscribe('IOT22');
client.subscribe('/ul/4jggokgpepnvsb2uv4s40d59ov/airSensor002/attrs')

function sendMessage(){
 let aqi = Math.floor(Math.random() * 200);
 let date =  new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
 let condition='';
 if(aqi>=0 && aqi < 51){
   condition = 'Good'
 }else if(aqi >= 51 && aqi< 101){
   condition = 'Moderate'
 }else if(aqi >= 101 && aqi < 151){
   condition = 'Unhealty for sensitive groups'
 }else if(aqi >= 151 && aqi < 201){
   condition = 'Unealthy'
 }
  let message = {
    "AQI": aqi,
    "Timestamp": date.toString(),
    "Condition": condition
   } 

  let mex = `a|${aqi}|c|${condition}|t|${date.toString()}`
  // mex = JSON.stringify(message)
    console.log('Air sensor send data...');
    // the client publish a new message
    console.log(JSON.stringify(message));
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/airSensor002/attrs', mex);
    client.publish('/db/airSensor', JSON.stringify(message))
    // client.publish('IOT22')
}

// fired when new message is received
client.on('message', function(topic, message) {
  console.log("ok");
  // console.log(message.toString());
});

let s=createServer(
  (req,res) => {
      if(req.method === 'GET'){
        if(req.url.toString() === '/airSensor002/start?' || req.url.toString() === '/airSensor002/start'){
          setInterval(sendMessage, 1000)
        }
        if(req.url.toString() === '/airSensor002/stop?' || req.url.toString() === '/airSensor002/stop'){
          console.log("Stopping Air Sensor");
          res.write('Stopping Air Sensor')
          process.exit();

        }
}

})
s.listen(8082)
