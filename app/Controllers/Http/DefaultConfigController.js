/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');

const DefaultConfig = use('App/Models/DefaultConfig');
class DefaultConfigController {
  async index({ auth }) {
    const userLogged = auth.user;
    try {
      const defaultConfigs = DefaultConfig.where({
        unity_id: userLogged.unity_id,
      })
        .fetch();
      return defaultConfigs;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'bank', 'cost_center', 'payment_form', 'days']);
    const defaultConfigs = await DefaultConfig.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });
    return defaultConfigs;
  }

  async update({ params, request }) {
    const defaultConfigs = await DefaultConfig.where({ _id: params.id }).first();
    if (defaultConfigs) {
      const data = request.only(['name', 'bank', 'cost_center', 'payment_form', 'active', 'days']);
      defaultConfigs.merge(data);
      await defaultConfigs.save();
      return defaultConfigs;
    }
    return false;
  }

  async show({ params }) {
    const defaultConfigs = await DefaultConfig.where({ _id: params.id })
      .firstOrFail();

    return defaultConfigs;
  }

  async destroy({ params }) {
    const defaultConfigs = await DefaultConfig.where({ _id: params.id }).firstOrFail();
    await defaultConfigs.delete();
  }
}

module.exports = DefaultConfigController;
