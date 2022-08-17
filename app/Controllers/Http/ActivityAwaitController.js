'use strict';

const mongoose = require('mongoose');
const ActivityAwaitEntity = require('../../Domain/Entities/Activity/activity-await-entity');

const Activity = use('App/Models/ActivityAwait');
class ActivityAwaitController {
  async index({ auth, response }) {
    const userLogged = auth.user;
    const typeUsersValid = ['admin', 'admin_prof', 'sec', 'prof'];
    try {
      if (typeUsersValid.includes(userLogged.type)) {
        const activities = Activity.where({
          unity_id: userLogged.unity_id,
        })
          .with('user')
          .sort('+created_at')
          .fetch();
        return activities;
      }

      return [];
    } catch (err) {
      return response.status(400).send({
        error: {
          message: 'Houve um erro no servidor, tente novamente mais tarde',
        },
      });
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only([
      'client',
      'obs',
      'prof',
      'partner',
      'phone',
      'all_day',
      'health_insurance',
      'procedures',
    ]);

    const activityAwait = new ActivityAwaitEntity(data);

    const activity = await Activity.create({
      ...activityAwait.params(),
      active: true,
      unity_id: userLogged.unity_id,
      client_id: mongoose.Types.ObjectId(data.client.value),
    });
    return activity;
  }

  async update({ params, request, response }) {
    const activity = await Activity.where({ _id: params.id }).firstOrFail();
    if (activity) {
      const data = request.only([
        'client',
        'obs',
        'prof',
        'partner',
        'phone',
        'all_day',
        'active',
        'health_insurance',
        'procedures',
      ]);

      const activityAwait = new ActivityAwaitEntity(data);

      activity.merge({
        ...activityAwait.params(),
      });
      await activity.save();
      return activity;
    }
    return response.status(400).send({
      error: {
        message: 'Atividade não encontrada',
      },
    });
  }
}

module.exports = ActivityAwaitController;
