'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (collection) => {
      collection.index('unity_id_index', { unity_id: 1 });
      collection.index('name_index', { name: 1 });
      collection.index('email_index', { email: 1 });
      collection.index('password_index', { password: 1 });
      collection.index('active_index', { active: 1 });
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
