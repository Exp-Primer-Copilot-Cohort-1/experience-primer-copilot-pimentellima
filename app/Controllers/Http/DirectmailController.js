/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');

const Directmail = use('App/Models/Directmail');

class DirectmailController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const directsMail = Directmail.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .fetch();
        return directsMail;
      }
      const directsMail = Directmail.where({
        unity_id: userLogged.unity_id,
      })
        .fetch();
      return directsMail;
    } catch (err) {
      console.log(err);
      return response
        .status(err.status)
        .send({ error: { message: err } });
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'description', 'prof']);

    const directsMail = await Directmail.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });
    return directsMail;
  }

  async update({ params, request }) {
    const directsMail = await Directmail.where({ _id: params.id }).first();
    if (directsMail) {
      const data = request.only(['name', 'description', 'active', 'prof']);
      directsMail.merge(data);
      await directsMail.save();
      return directsMail;
    }
    return false;
  }

  async show({ params }) {
    const directsMail = await Directmail.where({ _id: params.id })
      .firstOrFail();

    return directsMail;
  }

  async destroy({ params }) {
    const directsMail = await Directmail.where({ _id: params.id }).firstOrFail();
    await directsMail.delete();
  }
}

module.exports = DirectmailController;
