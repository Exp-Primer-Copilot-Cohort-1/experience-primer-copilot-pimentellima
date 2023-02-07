'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class PermissionsConfig extends Model {
  static get objectIDs() {
    return ['_id', 'unity_id'];
  }

  unity() {
    return this.belongsTo('App/Models/Unity', 'unity_id', '_id');
  }
}

module.exports = PermissionsConfig;
