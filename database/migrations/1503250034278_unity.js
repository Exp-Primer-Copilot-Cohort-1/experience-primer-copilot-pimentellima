'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UnitySchema extends Schema {
  up() {
    this.create('unities', (collection) => {
      collection.index('name_index', { name: 1 });
      collection.index('active_index', { active: 1 });
    });
  }

  down() {
    this.drop('unities');
  }
}

module.exports = UnitySchema;
