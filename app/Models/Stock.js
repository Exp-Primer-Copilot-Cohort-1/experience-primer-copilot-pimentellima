'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Stock extends Model {
  stocklog() {
    return this.hasMany('App/Models/Stockslog', '_id', 'stocks_id');
  }
}

module.exports = Stock;
