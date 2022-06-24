

PASTORINO EDOARDO,
Matricola: 5169595, 
Internet Of Things

INSTRUCTIONS:

For starting the MQTT Broker, the Orion Context Broker and the IoT agent of Fiware we have to run the following command in the prompt: ./services start (if you have to first create all the services: ./services create)

 For starting the user interfaces we have to run in the terminal (for example in the terminal of VSCode) the command: parcel index.html and go the the URL: http://localhost:1234\

For starting a dummy devices we have first to run the following command using node: node {FileName.js}, for example: node waterSensorMQTT.js, after that the sensor is listening for the start command that is activated by the button on the user interface. The dummy devices are  waterSensorMQTT.js, airSensorMQTT.js, TemperatureSensorMQTT.js, humiditySensorMQTT.js and the actuator IrrigatorMQTT.js\

For showing the measures sent by the sensor we can start the subscriber of fiware with this command: docker run -it --rm --name mqtt-subscriber
 --network fiware_default efrecon/mqtt-client sub -h mosquitto -t "/#"


For registering the measure in an external database (IOTProjectDB.db) we have to start another subscriber that read the published data and write them on the DB: node SubscriberMQTT.js