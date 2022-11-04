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

let s=createServer(
    (req,res) => {
        if(req.method === 'GET'){
            
            if(req.url.toString() === '/irrigator002/start?' || req.url.toString() === '/irrigator002/start'){
            
                let state = 'start'
                let pressure = 35   
                let message = {
                        "state": state,
                        "pressure": pressure
                    }
                let mex = `s|${state}|p|${pressure}`
                console.log('Irrigator send state and pressure...');
                // the client publish a new message
                console.log(JSON.stringify(message))
                client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/attrs', mex);
                client.publish('/db/irrigator', JSON.stringify(message))               
                setTimeout(stopping, 30000)
                
                
            }

            if(req.url.toString() === '/irrigator002/slow?' || req.url.toString() === '/irrigator002/slow'){
            
                let state = 'slow'
                let pressure = 20   
                let message = {
                        "state": state,
                        "pressure": pressure
                    }
                let mex = `s|${state}|p|${pressure}`
                console.log('Irrigator send state and pressure...');
                // the client publish a new message
                console.log(JSON.stringify(message))
                client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/attrs', mex);
                client.publish('/db/irrigator', JSON.stringify(message))
                setTimeout(stopping, 45000)
                
            }
            if(req.url.toString() === '/irrigator002/fast?' || req.url.toString() === '/irrigator002/fast'){
            
                let state = 'fast'
                let pressure = 45   
                let message = {
                        "state": state,
                        "pressure": pressure
                    }
                let mex = `s|${state}|p|${pressure}`
                console.log('Irrigator send state and pressure...');
                // the client publish a new message
                console.log(JSON.stringify(message))
                client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/attrs', mex);
                client.publish('/db/irrigator', JSON.stringify(message))
                setTimeout(stopping, 15000)
                
            }
            if(req.url.toString() === '/irrigator002/stop?' || req.url.toString() === '/irrigator002/stop'){
            
                let state = 'stop'
                let pressure = 0   
                let message = {
                        "state": state,
                        "pressure": pressure
                    }
                let mex = `s|${state}|p|${pressure}`
                console.log('Irrigator send state and pressure...');
                // the client publish a new message
                client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/attrs', mex);
                client.publish('/db/irrigator', JSON.stringify(message))
                console.log(JSON.stringify(message))
                console.log("Stopping Irrigator");
                setTimeout(stop, 3000)
            }
        }

    })
s.listen(8080)
var client = mqtt.connect('mqtt://127.0.0.1', settings);

// the client subscribe some new topic
client.subscribe('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/message');

console.log('Irrigator listen for a command...');

// fired when new message is received


function stopping(){
    let state = 'stop'
    let pressure = 0
    let message = {
        "state": state,
        "pressure": pressure
    }
    let mex = `s|${state}|p|${pressure}`
    console.log(JSON.stringify(message))
    // client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/message', info);
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/attrs', mex);

    console.log("Stopping Irrigator");
    setTimeout(stop, 1000)
    
}
function stop(){
    process.exit()
}
client.on('message', function(topic, message) {
    //console.log(JSON.parse(message.toString()))
    let obj = message.toString().split('|');
    let state = obj[1]
    let pressure = 0
    if(state === 'start'){
        pressure = 35
    }else if (state === 'slow'){
        pressure = 20
    }else if (state === 'fast'){
        pressure = 45
    }else if(state === 'stop'){
        pressure = 0
    }
    message = {
        "state": state,
        "pressure": pressure
    }
    let mex = `s|${state}|p|${pressure}`
    console.log('Irrigator send state and pressure...');
    // the client publish a new message
    console.log(JSON.stringify(message))
    client.publish('/ul/4jggokgpepnvsb2uv4s40d59ov/irrigator002/attrs', mex);

    
});



