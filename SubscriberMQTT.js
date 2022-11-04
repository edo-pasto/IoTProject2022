const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('IOTProjectDB.db');

var mqtt = require('mqtt');

var count = 0;

var settings = {
	port: 1883
};

var client = mqtt.connect('mqtt://127.0.0.1', settings);

// the client subscribe some new topic, the one realtive to tthe Database
client.subscribe('/db/#');

console.log('Subscriber started...');

// fired when new message is received
client.on('message', function(topic, message) {

if(topic === '/db/waterSensor'){
    let jsonObj = JSON.parse(message)

    db.run(`INSERT INTO WaterSensor(SalinityValue, SalinityType, SodiumType, SodiumValue, Time ) VALUES(?,?,?,?,?)`, jsonObj['SalinityValue'], jsonObj['SalinityType'],jsonObj['SodiumType'],jsonObj['SodiumValue'],jsonObj['Timestamp'], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

}else if(topic === '/db/airSensor'){
  let jsonObj = JSON.parse(message)
  db.run(`INSERT INTO AirSensor(AQI, Time, Condition ) VALUES(?,?,?)`, jsonObj['AQI'], jsonObj['Timestamp'],jsonObj['Condition'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}
else if(topic === '/db/tempSensor'){
  let jsonObj = JSON.parse(message)
  db.run(`INSERT INTO TemperatureSensor(Temperature, Date, Hour ) VALUES(?,?,?)`, jsonObj['Temperature'], jsonObj['Date'],jsonObj['Hour'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}
else if(topic === '/db/soilMoistureSensor'){
  let jsonObj = JSON.parse(message)
  db.run(`INSERT INTO SoilMoistureSensor(SoilMoisture, SoilMoistureType, Time ) VALUES(?,?,?)`, jsonObj['soilMoisture'], jsonObj['soilMoistureType'],jsonObj['Time'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}
else if(topic === '/db/irrigator'){
  let jsonObj = JSON.parse(message)
  db.run(`INSERT INTO Irrigator(State, Pressure ) VALUES(?,?)`, jsonObj['state'], jsonObj['pressure'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}

});

