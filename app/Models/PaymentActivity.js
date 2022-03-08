'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaymentActivity extends Model {
  activity() {
    return this.belongsTo("App/Models/Activity");
  }
}

module.exports = PaymentActivity
