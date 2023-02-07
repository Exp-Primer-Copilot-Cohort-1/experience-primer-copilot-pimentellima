'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Answer extends Model {
  static get objectIDs() {
    return ['_id', 'form_id'];
  }

  form() {
    return this.belongsTo('App/Models/Form');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  activity() {
    return this.belongsTo('App/Models/Activity');
  }
}

module.exports = Answer;
