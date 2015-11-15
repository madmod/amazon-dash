'use strict'

module.exports = {
  network_interface: 'en0',
  buttons: [
    {
      name: 'Button 1',
      mac: '74:c2:46:a7:4d:02',
      action: 'dash-button-1-pushed'
    },
    {
      name: 'Button 2',
      mac: '10:ae:60:e9:89:17',
      action: 'dash-button-2-pushed'
    }
  ],
  actions: [
    {
      name: 'dash-button-1-pushed',
      plugin: 'mqtt'
    },
    {
      name: 'dash-button-2-pushed',
      plugin: 'mqtt'
    }
  ],
  plugins: [
    {
      name: 'ifttt',
      key: 'cp59SfExRXOmbs4yGjqxxl'
    },
    {
      name: 'mqtt',
      broker: 'server.local',
      topic: 'amazon-dash'
    },
    {
      name: 'pushover',
      users: [
        {
          name: 'John',
          user: process.env['PUSHOVER_USER'],
          token: process.env['PUSHOVER_TOKEN']
        },
  //      {
  //        name: 'Hayden',
  //        user: 'uSJ6sKQsGjQjRb6YNPeeDrZ3bgHQW2',
  //        token: 'aoPQRh5hztcmCe1fm4HeaKt8AHw3nT'
  //      }
      ]
    }
  ]
}
