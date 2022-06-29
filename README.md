# INSTRUCTIONS

PASTORINO EDOARDO,

Matricola: 5169595, 

Internet Of Things
## Requirements
Download and install Docker ([https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/))
Download and install Node.js ([https://nodejs.org/it/download/](https://nodejs.org/it/download/))
Download and install DB Browser for Sqlite ([https://sqlitebrowser.org/dl/](https://sqlitebrowser.org/dl/))
```bash
npm install parcel axios mqtt http sqlite3
```
## Start the project

For starting the MQTT Broker, the Orion Context Broker and the IoT agent of Fiware we have to run the following command in the prompt in the directory of the project: 

```bash
./services start
```
if you have to first create all the services:
```bash
./services create
```
## Start the U.I.
 For starting the user interfaces we have to run in the terminal (for example in the terminal of VSCode) the command:
```bash
parcel index.html
``` 
and go the the URL: [http://localhost:1234](http://localhost:1234)


## Start the dummy devices
For starting a dummy devices we have first to run the following command using node:
```bash
node {FileName.js}
``` 
for example:
```bash
node waterSensorMQTT.js
``` 
After that, the sensor is listening for the start command that is activated by the button on the user interface. The dummy devices are  waterSensorMQTT.js, airSensorMQTT.js, TemperatureSensorMQTT.js, humiditySensorMQTT.js and the actuator IrrigatorMQTT.js
## Start the Subscribers
For showing the measures sent by the sensor we can start the subscriber of fiware with this command: 
```bash
docker run -it --rm --name mqtt-subscriber \
  --network fiware_default efrecon/mqtt-client sub -h mosquitto -t "/#"
``` 
For registering the measure in an external database (IOTProjectDB.db) we have to start another subscriber that read the published data and write them on the DB:
```bash
node SubscriberMQTT.js
``` 
## Get Data with curl
For getting the data of device we have to use curl, for example for the waterSensor:
```bash
curl -G -X GET \
  'http://localhost:1026/v2/entities/urn:ngsi-ld:waterSensor:001' \
  -d 'type=Sensor' \
  -H 'fiware-service: openiot' \
  -H 'fiware-servicepath: /'
```
## Links
#### - [Link to slides](https://docs.google.com/presentation/d/1BhPzEq-YJq3efu1GjbcVTcOQYL6FCbnO0Kj4zKJh1Hg/edit?usp=sharing)
#### - [Link to video](https://youtu.be/qKlqAGDvZIM)
