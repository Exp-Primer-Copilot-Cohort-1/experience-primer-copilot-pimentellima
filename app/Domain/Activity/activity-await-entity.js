/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

class ActivityAwaitEntity {
  constructor(activity) {
    this.map = new Map();

    Object.keys(activity).forEach((key) => {
      this.map.set(key, activity[key]);
    });

    if (activity.client !== undefined) {
      this.map.set('client', {
        value: mongoose.Types.ObjectId(activity.client._id),
        label: activity.client.name,
        celphone: activity.client.celphone,
      });
    }

    if (activity.prof !== undefined) {
      this.map.set('prof', {
        value: mongoose.Types.ObjectId(activity.prof._id),
        label: activity.prof.name,
      });
    }

    if (activity.procedures !== undefined) {
      this.map.set('procedures', {
        value: mongoose.Types.ObjectId(activity.procedures._id),
        label: activity.procedures.name,
      });
    }

    if (activity.health_insurance !== undefined) {
      this.map.set('health_insurance', {
        value: mongoose.Types.ObjectId(activity.health_insurance._id),
        label: activity.health_insurance.name,
      });
    }
  }

  params() {
    return Object.fromEntries(this.map);
  }
}

module.exports = ActivityAwaitEntity;
