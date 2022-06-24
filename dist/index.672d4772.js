"use strict";
let airsensor = document.querySelector("#airSensor");
airsensor.onclick = (e)=>{
    axios.get("http://localhost:8082/airSensor002/start").then((response)=>{
        console.log("Starting Air Sensor");
    }).catch((error)=>console.error(error));
};

//# sourceMappingURL=index.672d4772.js.map
