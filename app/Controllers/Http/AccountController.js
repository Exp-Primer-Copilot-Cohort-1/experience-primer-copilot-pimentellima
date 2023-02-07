/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');

const Account = use('App/Models/Account');
class AccountController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const accounts = Account.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .fetch();
        return accounts;
      }
      const accounts = Account.where({
        unity_id: userLogged.unity_id,
      })
        .fetch();
      return accounts;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'value', 'date', 'bank']);
    const accounts = await Account.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });
    return accounts;
  }

  async update({ params, request }) {
    const accounts = await Account.where({ _id: params.id }).first();
    if (accounts) {
      const data = request.only(['name', 'value', 'date', 'bank', 'active']);
      accounts.merge(data);
      await accounts.save();
      return accounts;
    }
    return false;
  }

  async show({ params }) {
    const accounts = await Account.where({ _id: params.id })
      .firstOrFail();

    return accounts;
  }

  async destroy({ params }) {
    const accounts = await Account.where({ _id: params.id }).firstOrFail();
    await accounts.delete();
  }
}

module.exports = AccountController;
