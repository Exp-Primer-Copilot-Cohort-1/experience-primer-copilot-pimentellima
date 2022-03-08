'use strict';

const User = use('App/Models/User');
const Mail = use('Mail');
class RecoverController {
  async store({ request }) {
    const data = request.only(['email']);
    const user = await User.where({ email: data.email }).firstOrFail();

    const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const pwdLen = 6;
    const randPassword = Array(pwdLen)
      .fill(pwdChars)
      .map((x) => x[Math.floor(Math.random() * x.length)])
      .join('');

    user.merge({ password: randPassword });
    await user.save();
    await Mail.send(
      'emails.forgot_password',
      {
        name: user.name,
        password: randPassword,
      },
      (message) => {
        message.from('drperformancesystem@gmail.com');
        message.to(user.email);
        message.subject(`Sua nova senha: ${randPassword}`);
      },
    );
    return user;
  }
}

module.exports = RecoverController;
