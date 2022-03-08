/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');

const Picture = use('App/Models/Picture');

class PictureController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const pictures = Picture.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .fetch();
        return pictures;
      }
      const pictures = Picture.where({
        unity_id: userLogged.unity_id,
      })
        .fetch();
      return pictures;
    } catch (err) {
      console.log(err);
      return response
        .status(err.status)
        .send({ error: { message: err } });
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['url', 'client', 'date']);

    const pictures = await Picture.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
      prof_id: userLogged._id,
    });
    return pictures;
  }

  async update({ params, request }) {
    const pictures = await Picture.where({ _id: params.id }).first();
    if (pictures) {
      const data = request.only(['url', 'client', 'date', 'active']);
      pictures.merge(data);
      await pictures.save();
      return pictures;
    }
    return false;
  }

  async show({ params }) {
    const pictures = await Picture.where({ _id: params.id })
      .with('client')
      .firstOrFail();

    return pictures;
  }

  async destroy({ params }) {
    const pictures = await Picture.where({ _id: params.id }).firstOrFail();
    await pictures.delete();
  }
}

module.exports = PictureController;
