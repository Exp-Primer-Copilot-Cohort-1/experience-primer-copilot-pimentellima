'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Form extends Model {
  static get objectIDs() {
    return ['_id', 'category_id'];
  }

  category() {
    return this.belongsTo('App/Models/Category');
  }

  answers() {
    return this.hasMany('App/Models/Answer');
  }

  logAnswers() {
    return this.hasMany('App/Models/LogAnswer');
  }
}

module.exports = Form;
