var mqtt = require('mqtt')
var util = require('util')
var client = mqtt.connect('mqtt://<orgId>.messaging.internetofthings.ibmcloud.com', {
  "username": "use-token-auth",
  "password": "<DAT access code>",
  "clientId": "d:<orgId>:nodejs-client:nodejs-client-1"

})

client.on('error', function(err) {
  util.log("Error: " + err);
});

// "password": "SunriseDeviceToken",
// "clientId": "d:m60i9s:my-device-type:my-device-1"

util.log("created client");

client.on('connect', function() {
  var n = 0;
  function publish() {
    client.publish('iot-2/evt/count/fmt/json', JSON.stringify({
      count: n++
    }));
    util.log("published: " + n);
  }
  setInterval(publish, 1000);

})

util.log("publishing");
