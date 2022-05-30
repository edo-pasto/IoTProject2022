var mqtt = require('mqtt');

var count = 0;

var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);

// the client subscribe some new topic
client.subscribe('IOT22');

console.log('Client started...');

// fired when new message is received
avg = 0
sum = 0
cnt = 1
client.on('message', function(topic, message) {
  console.log(count + ': ' +message.toString());
  obj = JSON.parse(message)
  sum = sum + obj["value"]
  avg = sum / cnt
  cnt++;
  console.log("Average: " + avg)
  count++;
});

