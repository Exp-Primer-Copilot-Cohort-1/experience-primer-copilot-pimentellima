'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class AdminController {
  async activeUser({ params }) {
    const user = await User.where({ email: params.email }).firstOrFail();

    user.active = true;

    await user.save();

    return user;
  }
}

module.exports = AdminController;
