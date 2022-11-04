'use strict'

const { default: axios } = require("axios");
const { write } = require("fs");
const { send } = require("process");
// var express = require('express')
// const app = express()
// const cors = require('cors')
// app.use(cors());


// ----------------- AIR SENSOR ------------------
let airsensor = document.querySelector('#airSensor')
let airsensorStop = document.querySelector('#airSensorStop')
let respAirStart = document.getElementById('respAir')
airsensor.onclick = e => {
    axios.get("http://localhost:8082/airSensor002/start")
    .then(response =>{
        console.log('Starting Air Sensor')

    })
    .catch(error => {
        console.error(error)
        respAirStart.innerText = 'Air Sensor Sensor is inactive'
    })
    respAirStart.innerText = "Air Sensor succesfully started";
    resAirStop.innerText = "";

};

let resAirStop = document.getElementById('respAirStop')
airsensorStop.onclick = e => {
    axios.get("http://localhost:8082/airSensor002/stop")
    .then(response =>{
        console.log('Stopping Air Sensor')
       
    })
    .catch(error => {
        console.error(error)
        resAirStop.innerText = 'Air Sensor Sensor is inactive'
    })
    resAirStop.innerText = "Air Sensor succesfully stopped";
    respAirStart.innerText = "";
};

// ------------------ TEMPERATURE SENSOR --------------------
let tempSensor = document.querySelector('#tempSensor')
let tempSensorStop = document.querySelector('#tempSensorStop')
let respTempStart = document.getElementById('respTemp')

tempSensor.onclick = e => {
    axios.get("http://localhost:8081/temperatureSensor004/start")
    .then(response =>{
        console.log('Starting Temperature Sensor')
    })
    .catch(error => {
        console.error(error)
        respTempStart.innerText = 'Soil Moisture Sensor is inactive'
    })
    respTempStart.innerText = "Temperature Sensor succesfully started";
    resTempStop.innerText = "";
};

let resTempStop = document.getElementById('respTempStop')
tempSensorStop.onclick = e => {
    axios.get("http://localhost:8081/temperatureSensor004/stop")
    .then(response =>{
        console.log('Stopping Temperature Sensor')
    })
    .catch(error => {
        console.error(error)
        resTempStop.innerText = 'Temperature Sensor is inactive'
    })
    resTempStop.innerText = "Temperature Sensor succesfully stopped";
    respTempStart.innerText = "";
};


// ----------------- WATER SENSOR -----------------
let waterSensor = document.querySelector('#waterSensor')
let waterSensorStop = document.querySelector('#waterSensorStop')
let respWaterStart = document.getElementById('respWater')
waterSensor.onclick = e => {
    axios.get("http://localhost:8083/waterSensor001/start")
    .then(response =>{
        console.log('Starting Water Sensor')
    })
    .catch(error => {
        console.error(error)
        respWaterStart.innerText = 'Soil Moisture Sensor is inactive'
    })
    respWaterStart.innerText = "Water Sensor succesfully started";
    resWaterStop.innerText = "";
};

let resWaterStop = document.getElementById('respWaterStop')
waterSensorStop.onclick = e => {
    axios.get("http://localhost:8083/waterSensor001/stop")
    .then(response =>{
        console.log('Stopping Water Sensor')
        
    })
    .catch(error => {
        console.error(error)
        resWaterStop.innerText = 'Soil Moisture Sensor is inactive'
    })
    resWaterStop.innerText = "Water Sensor succesfully stopped";
    respWaterStart.innerText = "";
};


// -------------- SOIL MOISTURE SENSOR --------------
let soilMoistureSensor = document.querySelector('#soilMoistureSensor')
let soilMoistureSensorStop = document.querySelector('#soilMoistureSensorStop')

let resSoilMoistureStart = document.getElementById('respSoilMoisture')
soilMoistureSensor.onclick = e => {
    axios.get("http://localhost:8084/soilMoistureSensor001/start")
    .then(response =>{
        console.log('Starting Soil Moisture Sensor')
    })
    .catch(error => {
        console.error(error)
        resSoilMoistureStart.innerText = 'Soil Moisture Sensor is inactive'
    })
    resSoilMoistureStart.innerText = "Soil Moisture Sensor succesfully started";
    resSoilMoistureStop.innerText = "";
};

let resSoilMoistureStop = document.getElementById('respSoilMoistureStop')
soilMoistureSensorStop.onclick = e => {
   
    axios.get("http://localhost:8084/soilMoistureSensor001/stop")
    .then(response =>{
       
    })
    .catch(error => {
        console.error(error)
        resSoilMoistureStop.innerText = 'Soil Moisture Sensor is inactive'
        resSoilMoistureStart.innerText = "";
    })
    resSoilMoistureStop.innerText = "Soil Moisture Sensor succesfully stopped";
    
};

// ----------------- IRRIGATOR -----------------
let irrigatorStart = document.querySelector('#irrigatorStart')
let irrigatorSlow = document.querySelector('#irrigatorSlow')
let irrigatorFast = document.querySelector('#irrigatorFast')
let irrigatorStop = document.querySelector('#irrigatorStop')
let devicesGet = document.querySelector('#devicesGet')

let respStart = document.getElementById('respStart')
irrigatorStart.onclick = e => {
    axios.get("http://localhost:8080/irrigator002/start")
    .then(response =>{
        console.log(response)
        
    })
    .catch(error => {
        console.error(error)
        respStart.innerText = 'Irrigator is inactive'
    })
    respStart.innerText = 'Irrigator succesfully started'
    
};
let respSlow = document.getElementById('respSlow')
irrigatorSlow.onclick = e => {
    axios.get("http://localhost:8080/irrigator002/slow")
    .then(response =>{
        console.log('Irrigator works Slow')
       
    })
    .catch(error => {
        console.error(error)
        respSlow.innerText = 'Irrigator is inactive'
    })
    respSlow.innerText = 'Irrigator succesfully works slow'
};
let respFast = document.getElementById('respFast')
irrigatorFast.onclick = e => {
    axios.get("http://localhost:8080/irrigator002/fast")
    .then(response =>{
        console.log('Irrigator works Fast ')
       
    })
    .catch(error => {
        console.error(error)
        respFast.innerText = 'Irrigator is inactive'
    })
    respFast.innerText = 'Irrigator succesfully works fast'
};
let respStop = document.getElementById('respStop')
irrigatorStop.onclick = e => {
    axios.get("http://localhost:8080/irrigator002/stop")
    .then(response =>{
        console.log('Stopping Irrigator')
        
    })
    .catch(error => {
        console.error(error)
        respStop.innerText = 'Irrigator is inactive'
    })
    respStop.innerText = 'Irrigator succesfully stopped'
};


// ---------- LIST OF DEVICES -----------
let respGet = document.getElementById('respGet')
let devicesList = document.getElementById('devicesList')
devicesGet.onclick = e => {

    // var request = require('request');
    // var headers = {
    //     'Fiware-service': 'openiot',
    //     'Fiware-servicepath': '/'
    // };
    // var options = {
    //     method: "GET",
    //     url: 'http://localhost:1026/v2/entities/urn:ngsi-ld:TemperatureSensor:004',
    //     qs: { options: "keyValues" },
    //     headers: headers
    // };
    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body);
    //     }
    // }  
    // request(options, callback);
    
    // axios.get('http://localhost:1026/v2/entities/urn:ngsi-ld:TemperatureSensor:004', {params:{type: "Sensor", options: "keyValues"}}, {headers:{'Fiware-service': 'openiot', 'Fiware-servicepath': '/'}})
    axios.get('http://localhost:4041/iot/devices', {headers:{'Fiware-service': 'openiot', 'Fiware-servicepath': '/'}})
     .then(response => {
        console.log(response.data.devices)
        devicesList.innerHTML = ''
        for (let j in response.data.devices){
            devicesList.innerHTML += "ID: " + response.data.devices[j].device_id.toString() +'\n' + "Type: " + response.data.devices[j].entity_type.toString() + '\n' +  "Name: " + response.data.devices[j].entity_name.toString() + '\n' + "Attributes: "
                for(let i in response.data.devices[j].attributes){
                    devicesList.innerHTML += response.data.devices[j].attributes[i].name.toString() + "  "+ response.data.devices[j].attributes[i].type.toString()+ " | "
                }
            
            devicesList.innerHTML += '\n\n'
            
        }
     }) 
     .catch(err => {
        console.log(err);
     });
    respGet.innerText = 'List of Devices'
    
};