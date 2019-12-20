'use strict';

const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
  keyPath: './certs/private.pem.key',
  certPath: './certs/certificate.pem.crt',
  caPath: './certs/AmazonRootCA1.pem',
  clientId: 'fugafuga',
  host: process.env.AWS_IOT_HOST
});

device.on('connect', function() {
  console.log('connect');
  device.subscribe(['hoge/+', 'fuga/+', 'piyo/+']);
});

device.on('message', function(topic, payload) {
  console.log(`topic: ${topic}`);
  console.log(`payload: ${payload.toString()}`);

  device.publish(`${topic}/response`, JSON.stringify({ data: `${payload.toString()} response`}));
});
