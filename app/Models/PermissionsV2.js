'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class PermissionsV2 extends Model {
  static get objectIDs() {
    return ['_id', 'user_id', 'unity_id'];
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', '_id');
  }

  unity() {
    return this.belongsTo('App/Models/Unity', 'unity_id', '_id');
  }
}

module.exports = PermissionsV2;
