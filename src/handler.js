'use strict';

const fs = require('fs');
const Mqtt = require('mqtt-async-requests');

module.exports.do = async event => {
  const client = new Mqtt.MqttRequest({
    host: process.env.AWS_IOT_HOST,
    ca: fs.readFileSync('./certs/AmazonRootCA1.pem'),
    cert: fs.readFileSync('./certs/certificate.pem.crt'),
    key: fs.readFileSync('./certs/private.pem.key'),
    port: 8883,
    protocol: 'mqtts'
  });

  const response = await client.do('hoge', true, 'response', 'hogepay', 1, 3000);
  const responseJson = JSON.parse(response.toString());


  return {
    statusCode: 200,
    body: JSON.stringify(responseJson)
  };
};

module.exports.doMany = async event => {
  const client = new Mqtt.MqttRequest({
    host: process.env.AWS_IOT_HOST,
    ca: fs.readFileSync('./certs/AmazonRootCA1.pem'),
    cert: fs.readFileSync('./certs/certificate.pem.crt'),
    key: fs.readFileSync('./certs/private.pem.key'),
    port: 8883,
    protocol: 'mqtts'
  });

  const responses = await client.doMany(['hoge', 'fuga', 'piyo'], true, 'response', ['hogepay', 'fugapay', 'piyopay'], 1, 3000);
  const responsesArray = responses.map(response => JSON.parse(response.toString()));

  return {
    statusCode: 200,
    body: JSON.stringify(responsesArray)
  };
};
