'use strict'

var request = require('request')

var debug = require('debug')('dash-button-ifttt')

module.exports = function iftttPlugin(options, config, context) {
  var iftttUrl = "https://maker.ifttt.com/trigger/" + options.event + "/with/key/" + config.key

  var values = {
    value1: options.value1 || options.value1 || context.button.name,
    value2: options.value2 || options.value2 || context.action.name,
    value3: options.value3 || options.value3 || context.button.mac
  }

  debug('Calling url with values', iftttUrl, values)

  return request.post({ url: iftttUrl, json: values })
}


