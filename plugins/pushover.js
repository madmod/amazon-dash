'use strict'

var Pushover = require('pushover-notifications')



module.exports = function pushoverPlugin(options, config, context) {
  var push = new Pushover({
    user: config.user,
    token: config.token
  })

  _.each(users, function (user) {
    push.send({
      user: user.user,
      token: user.token,
      title: 'Uh oh ' + user.name,
      message: 'Someone pushed the button with id '+ id +'!',
      sound: 'magic'
    })
  })
}


