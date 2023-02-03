'use strict';
const mongoose = require('mongoose');

const SELECTS = require('../../SelectsQuery/user-select');

const promiseErrorHandler = require('../../utils/promise-err-handler');
const PermissionEntityV2 = require('../../Domain/Entities/Permission/permission-entityV2')
const PermissionDefaultAdmin = require('../../Domain/Entities/Permission/permission-default-admin')


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Unity = use('App/Models/Unity');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const PermissionsV2Model = use('App/Models/PermissionsV2');

const sessionFirstCreatePermissions = async ({ user_id, unity_id, type }) => {
  try {
    return await PermissionsV2Model
      .where('user_id', user_id)
      .firstOrFail()
  } catch (error) {
    const PERMISSIONS_DEFAULTS = (await PermissionEntityV2.build(null)).params()
    let PERMISSIONS_ADMIN = null

    if (type === 'admin' || type === 'admin_prof') {
      PERMISSIONS_ADMIN = (await PermissionDefaultAdmin.build(PERMISSIONS_DEFAULTS)).params()
    }
    const PERMISSIONS = PERMISSIONS_ADMIN || PERMISSIONS_DEFAULTS

    try {
      await PermissionsV2Model.create({ ...PERMISSIONS, user_id, unity_id });
    } catch (error) {
      console.log(error)
    }

  }
}

class SessionController {
  /**
   * Sing in using email and password.
   * @param {import('adonisjs-types').Http.Context} ctx
   * @return {Object}
   */
  async store(/** @type Adonis.Http.Context */{ request, auth, response }) {
    const { email, password } = request.only(['email', 'password']);

    const [error, user] = await promiseErrorHandler(
      User.query()
        .with('unity')
        .where('email', email)
        .firstOrFail('password', password)
    )

    if (error) {
      return response.status(401).send({
        message: 'Usuário e/ou senha inválidos',
      });
    }

    const unity = await Unity.query()
      .firstOrFail('_id', user.unity_id);

    const dateNow = new Date();

    if (user.active === false) {
      return response.status(403).send({
        message: 'Usuário não está ativo',
      });
    }

    if (unity.date_expiration && new Date(unity.date_expiration) < dateNow) {
      return response.status(402).send({
        message: 'Sua Unidade está expirada, entre em contato com os responsáveis',
      });
    }

    const token = await auth.withRefreshToken().attempt(email, password);

    await sessionFirstCreatePermissions({ user_id: user._id, unity_id: user.unity_id, type: user.type })

    return { user, token };
  }

  async refreshToken({ request, auth }) {
    const refreshTokenInput = request.input('refresh_token');
    return await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshTokenInput, true);
  }

  async getUser({ auth }) {
    const authUser = await auth.getUser();

    const user = await User.where({
      _id: authUser._id
    })
      .select(SELECTS)
      .with('unity')
      .with('answer')
      .with('activity')
      .with('userLog')
      .firstOrFail();

    return user;
  }

  async checkToken({ auth }) {
    try {
      await auth.check()
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }
}

module.exports = SessionController;
