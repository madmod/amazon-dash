'use strict'

var _ = require('lodash');

var Pushover = require('pushover-notifications')


module.exports = function pushoverPlugin(options, config, context) {
  var push = new Pushover({
    user: config.user,
    token: config.token
  })

  var users = config.users;

  _.each(users, function (user) {
    push.send({
      user: user.user,
      token: user.token,
      title: 'Uh oh ' + user.name,
      message: 'Someone pushed the button with name '+ context.button +'!',
      sound: 'magic'
    })
  })
}


