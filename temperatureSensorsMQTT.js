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
client.subscribe('/ul/4jggokgpepnvsb2uv4s40d59ov/temperatureSensor004/attrs')

function sendMessage(){
let hour =  new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
let date = new Date()
let day =  String(date.getDate()).padStart(2, '0');
let month =  String(date.getMonth() + 1).padStart(2, '0')
let year = date.getFullYear()
let dateString = `${day}-${month}-${year}`
let temp = 0

if( month === '01' || month === '02' || month === '12' || month === '11'  ){
   temp=  Math.floor(Math.random() * (12-5+1)  ) - 5
  }else if(month === '03' || month === '04' ){
    temp=  Math.floor(Math.random() * (22-8+1)) +8 
  }else if(month === '05'){
    temp=  Math.floor(Math.random() * (26-16+1)) +16 
  }else if(month === '06' || month === '07' || month === '08'){
    temp=  Math.floor(Math.random() * (38-24 +1)) +24
  }else if(month === '09' || month === '10' ){
    temp=  Math.floor(Math.random() * (22-10+1)) +10
  }


  let message = {
    "Temperature": temp,
    "Date": dateString,
    "Hour": hour.toString()
   } 

  
  // mex = JSON.stringify(message)
  let mex = `t|${temp}|d|${dateString}|h|${hour.toString()}`
    console.log('Temperature sensor send data...');
    console.log(JSON.stringify(message));
    // the client publish a new message
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/temperatureSensor004/attrs', mex);
    client.publish('/db/tempSensor', JSON.stringify(message))
}

// fired when new message is received
client.on('message', function(topic, message) {
  console.log("ok");
 // console.log(message.toString());
});

let s=createServer(
  (req,res) => {
      if(req.method === 'GET'){
        if(req.url.toString() === '/temperatureSensor004/start?' || req.url.toString() === '/temperatureSensor004/start'){
          setInterval(sendMessage, 1000)
        }
        if(req.url.toString() === '/temperatureSensor004/stop?' || req.url.toString() === '/temperatureSensor004/stop'){
          console.log("Stopping Temperature Sensor");
          res.write('Stopping Temperature Sensor')
          process.exit()
          
        }

}

})
s.listen(8081)