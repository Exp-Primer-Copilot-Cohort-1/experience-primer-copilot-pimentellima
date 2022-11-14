const Mail = use('Mail');
const Log = require('../../../../config/log');

class MailEntity {
  constructor() {
    this.to = 'ti@dpsystem.com.br';
  }

  /**
   *
   * @param {{
   *  edge: 'activity.edge'
   * | 'confirm-user.edge'
   * | 'confirm.edge'
   * | 'forgot-password.edge'
   * | 'create.edge'
   * | 'forgot-password-text.edge'
   * | 'new-account.edge'
   * | 'welcome.edge',
   *  props: object,
   *  email: string,
   *  title: string
   * }} params
   */
  async sendMail({
    edge, props, email, title,
  }) {
    try {
      await Mail.send(edge, props, (message) => {
        message.from(this.to);
        message.to(email);
        message.subject(title);
      });

      return Log.info(`Email enviado para ${email} - ${title}`);
    } catch (error) {
      return Log.error('Erro ao enviar email', error);
    }
  }
}

const mailEntity = new MailEntity();

module.exports = mailEntity;
