'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ActivitySchema extends Schema {
  up() {
    this.create('activities', (collection) => {
      collection.index('user_id_index', { user_id: 1 });
      collection.index('date_index', { date: 1 });
      collection.index('hour_start_index', { hour_start: 1 });
      collection.index('hour_end_index', { hour_end: 1 });
      collection.index('active_index', { active: 1 });
    });
  }

  down() {
    this.drop('activities');
  }
}

module.exports = ActivitySchema;
