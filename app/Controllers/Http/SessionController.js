'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Unity = use('App/Models/Unity');

class SessionController {
  /**
   * Sing in using email and password.
   * @param {import('adonisjs-types').Http.Context} ctx
   * @return {Object}
   */
  async store(/** @type Adonis.Http.Context */{ request, auth, response }) {
    const { email, password } = request.only(['email', 'password']);

    const user = await User.query()
      .with('unity')
      .where('email', email)
      .firstOrFail('password', password);
    const unity = await Unity.query()
      .firstOrFail('_id', user.unity_id);

    const dateNow = new Date();

    if (user.active === false) {
      return response.status(401).send({
        error: 'Usuário não está ativo',
      });
    }

    if (unity.date_expiration && new Date(unity.date_expiration) < dateNow) {
      return response.status(401).send({
        error: 'Sua Unidade está expirada, entre em contato com os responsáveis',
      });
    }

    const token = await auth.withRefreshToken().attempt(email, password);
    return { user, token };
  }

  async refreshToken({ request, auth }) {
    const refreshTokenInput = request.input('refresh_token');
    return await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshTokenInput, true);
  }
}

module.exports = SessionController;
