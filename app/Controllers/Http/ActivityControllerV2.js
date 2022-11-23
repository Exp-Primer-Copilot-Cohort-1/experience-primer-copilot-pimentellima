/* eslint-disable lines-around-directive */
/* eslint-disable no-underscore-dangle */
'use strict';

const mongoose = require('mongoose');

const Activity = use('App/Models/Activity');

class ActivityControllerV2 {
  async findAllActivitiesByUser({ auth }) {
    const userLogged = auth.user;

    const activities = await Activity
      .where({
        unity_id: userLogged.unity_id,
        active: true,
        user_id: mongoose.Types.ObjectId(userLogged._id),
        status: {
          $ne: ['not_count'],
        },
        scheduled: {
          $ne: ['not_count'],
        },
      })
      .fetch();

    return activities;
  }
}

module.exports = ActivityControllerV2;
