'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ActivityStock extends Model {
  activity() {
    return this.belongsTo("App/Models/Activity", "activity_id", "_id");
  }
}

module.exports = ActivityStock
