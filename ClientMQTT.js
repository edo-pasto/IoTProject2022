var mqtt = require('mqtt');
 
var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);
 
// the client subscribe a new topic
// client.subscribe('IOT22');
client.subscribe('/ul/4jggokgpepnvsb2uv4s40d59ov/temperatureSensors003/attrs')

function sendMessage(){
  studentArray = [5169595, 4974567, 523789, 476098, 519887, 123456, 789012, 987654, 321098, 135790, 246801]
  message = {
    "StudentID": studentArray[Math.floor(Math.random() * studentArray.length)],
    "value": Math.random()*40
   } 

  
  mex = JSON.stringify(message)
    console.log('Client publishing...');
    // the client publish a new message
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/temperatureSensors003/attrs', mex);
    // client.publish('IOT22')
}

// fired when new message is received
client.on('message', function(topic, message) {
  console.log("ok");
 // console.log(message.toString());
});

setInterval(sendMessage, 1000)