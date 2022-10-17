/* eslint-disable no-underscore-dangle */

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class AdminController {
  async activeUser({ params }) {
    const user = await User.where({ _id: params._id }).firstOrFail();

    user.active = true;

    await user.save();

    return user;
  }

  async findAll() {
    const users = await User.where({
      active: false,
    })
      .select(['_id', 'email', 'active'])
      .fetch();

    return users;
  }
}

module.exports = AdminController;
