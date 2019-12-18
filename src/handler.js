'use strict';

const fs = require('fs');
const Mqtt = require('mqtt-async-requests');

module.exports.hello = async event => {
  const client = new Mqtt.MqttRequest({
    host: process.env.AWS_IOT_HOST,
    ca: fs.readFileSync('./certs/AmazonRootCA1.pem'),
    cert: fs.readFileSync('./certs/certificate.pem.crt'),
    key: fs.readFileSync('./certs/private.pem.key'),
    port: 8883,
    protocol: 'mqtts'
  });

  const response = await client.do('hogefuga', true, 'response', 'hogefuga', 1, 3000);

  return {
    statusCode: 200,
    body: response.toString()
  };
};
