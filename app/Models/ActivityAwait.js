'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ActivityAwait extends Model {
  user() {
    return this.belongsTo('App/Models/User', 'client_id', '_id');
  }
}

module.exports = ActivityAwait;
