'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Picture extends Model {
  prof() {
    return this.belongsTo('App/Models/User', 'prof_id', '_id');
  }
}

module.exports = Picture;
