/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');

const CostCenter = use('App/Models/CostCenter');
class CostCenterController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const costCenters = CostCenter.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .fetch();
        return costCenters;
      }
      const costCenters = CostCenter.where({
        unity_id: userLogged.unity_id,
      })
        .fetch();
      return costCenters;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name']);
    const costCenters = await CostCenter.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });
    return costCenters;
  }

  async update({ params, request }) {
    const costCenters = await CostCenter.where({ _id: params.id }).first();
    if (costCenters) {
      const data = request.only(['name', 'active']);
      costCenters.merge(data);
      await costCenters.save();
      return costCenters;
    }
    return false;
  }

  async show({ params }) {
    const costCenters = await CostCenter.where({ _id: params.id })
      .firstOrFail();

    return costCenters;
  }

  async destroy({ params }) {
    const costCenters = await CostCenter.where({ _id: params.id }).firstOrFail();
    await costCenters.delete();
  }
}

module.exports = CostCenterController;
