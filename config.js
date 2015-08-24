'use strict'

module.exports = {
  network_interface: 'en0',
  buttons: [
    {
      name: 'Button 1',
      mac: '74:c2:46:a7:4d:02',
      action: 'Turn on monitors'
    },
    {
      name: 'Button 2',
      mac: '02:0f:b5:a7:4d:02',
      action: 'Doorbell'
    }
  ],
  actions: [
    {
      name: 'Turn on monitors',
      plugin: 'ifttt',
      options: {
        event: 'turn_on_monitors'
      }
    },
    {
      name: 'Doorbell',
      plugin: 'pushover',
      options: {
        users: 'all',
        title: 'Doorbell',
        message: 'Someone rang the doorbell!',
        sound: 'magic'
      }
    }
  ],
  plugins: [
    {
      name: 'ifttt',
      key: 'cp59SfExRXOmbs4yGjqxxl'
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
