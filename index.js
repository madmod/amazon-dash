'use strict'

var config = require('./config')

var _ = require('lodash')

var debug = require('debug')('amazon-dash')

var macvendor = require('macvendor')

var lookupVendor = _.memoize(macvendor)

var arpListener = require('arp-listener')

var plugins = {}

_.each(config.plugins, function (plugin) {
  plugins[plugin.name] = require('./plugins/' + plugin.name)
})

var dashes = _.pluck(config.buttons, 'mac')


debug('Listening for Amazon Dash buttons')


function parseIp(ip) {
  return _.values(ip).join('.')
}


function isDashButton(mac, callback) {
  lookupVendor(mac, function (err, vendor) {
    debug('found vendor', mac, vendor)

    if (err) {
      console.error('Error looking up vendor for', mac, err)
      callback(err)
    }

    callback(null, /amazon/i.test(vendor))
  })
}


function runAction(mac) {
  var button = _.where(config.buttons, { 'mac': mac })[0]
  var action = _.where(config.actions, { 'name': button.action })[0]
  var plugin = plugins[action.plugin]
  var pluginConfig = _.where(config.plugins, { name: action.plugin })[0]
  return plugin(action.options, pluginConfig, { button: button, action: action })
}


arpListener(config.network_interface, function(arp) {
  debug('arp', arp)


  if (arp.operation == 1 && parseIp(arp.sender_pa) == '0.0.0.0' && arp.target_ha == '00:00:00:00:00:00') {
    debug(arp)

    var id = arp.sender_ha

    if (_.includes(dashes, id)) {
      console.log(Date.now().toLocaleString(), 'Dash button pushed with id', id)

      runAction(id);
    } else {
      // Lookup the MAC address vendor to see if it is a new Dash button
      isDashButton(id, function (err, isDash) {
        if (isDash) {
          console.log('Found new Amazon device that might be a new Dash button!', id)
        }
      })
    }
  }
})


