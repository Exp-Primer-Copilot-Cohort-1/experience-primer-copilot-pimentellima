/* eslint-disable camelcase */
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
    const users = await User.select(['_id', 'email', 'active', 'unity_id', 'name'])
      .fetch();

    return users;
  }

  async findAllInatives() {
    const users = await User.where({
      active: false,
    })
      .select(['_id', 'email', 'active', 'unity_id', 'name'])
      .fetch();

    return users;
  }

  async findAllByProfs() {
    const { type } = request.only(['type']);

    const users = await User.where({
      type: { $regex: new RegExp(`.*${type}.*`) },
    })
      .select(['_id', 'email', 'active', 'unity_id', 'name'])
      .fetch();

    return users;
  }

  async findAllByUnity() {
    const { unity_id } = request.only(['unity_id']);

    const users = await User.where({
      type: { $regex: new RegExp(`.*${unity_id}.*`) },
    })
      .select(['_id', 'email', 'active', 'unity_id', 'name'])
      .fetch();

    return users;
  }
}

module.exports = AdminController;
