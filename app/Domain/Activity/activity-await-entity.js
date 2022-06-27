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
      this.map.set('procedures', activity.procedures?.map((procedure) => ({
        value: procedure?.value || null,
        label: procedure?.label || null,
        minutes: procedure?.minutes || null,
        color: procedure?.color || null,
        val: procedure?.val || null,
        health_insurance: {
          value: procedure?.health_insurance?.value || null,
          label: procedure?.health_insurance?.label || null,
        },
        status: procedure?.status || null,
      })));
    }

    if (activity.health_insurance !== undefined) {
      this.map.set('health_insurance', activity.health_insurance?.map((healthInsurance) => ({
        value: healthInsurance?.value || null,
        label: healthInsurance?.label || null,
      })));
    }
  }

  params() {
    return Object.fromEntries(this.map);
  }
}

module.exports = ActivityAwaitEntity;
