/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const Mail = use('Mail');
const { format, parseISO } = require('date-fns');

class SyncPush {
  static get key() {
    return 'SyncPush';
  }

  async handle(job) {
    const { data } = job;
    if (data && data.data) {
      try {
        await Mail.send(
          'emails.activity',
          {
            date: format(parseISO(data.data.date), 'dd/MM/yyyy'),
          },
          (message) => {
            message.from('drperformancesystem@gmail.com');
            message.to(data.data.email);
            message.subject('Uma nova atividade');
          },
        );
      } catch (e) {
        console.log('error sending', e);
      }
    }
    if (data.alertUser) {
      try {
        await Mail.send(
          'emails.confirm_user',
          {
            activity: data.alertUser.activity._id,
          },
          (message) => {
            message.from('drperformancesystem@gmail.com');
            message.to(data.alertUser.activity.client.email);
            message.subject('Confirme sua consulta');
          },
        );
      } catch (e) {
        console.log('error sending', e);
      }
    }
  }
}

module.exports = SyncPush;
