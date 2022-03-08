'use strict';

const Env = use('Env');
const axios = require('axios');

class Help {
  static sendPushNotification(device, message, data) {
    const restKey = Env.get('ONE_SIGNAL_KEY');
    const appID = Env.get('ONE_SIGNAL_APP_KEY');
    try {
      axios.post(
        'https://onesignal.com/api/v1/notifications',
        {
          app_id: appID,
          contents: { en: message },
          include_player_ids: Array.isArray(device) ? device : [device],
          data,
        }, {
          headers: {
            Authorization: `Basic ${restKey}`,
          },
        },
      );
    } catch (er) {
      // eslint-disable-next-line no-console
      console.log(er);
    }
  }
}

module.exports = Help;
