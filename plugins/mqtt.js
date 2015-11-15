'use strict'

var mqtt = require('mqtt');

var debug = require('debug')('dash-button-mqtt')

module.exports = function mqttPlugin(options, config, context) {
  debug('Connecting to MQTT broker', config.broker)

  var client  = mqtt.connect('mqtt://' + config.broker);

  client.on('connect', function () {
    debug('Connected to MQTT broker', config.broker);
    debug('Publishing to MQTT topic', config.topic, context.action.name);

    client.publish(config.topic, JSON.stringify({
      button: context.button.name,
      action: context.action.name,
      mac: context.button.mac
    }));
  });
}


