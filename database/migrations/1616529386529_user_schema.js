"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.collection("users", (collection) => {
      collection.index("avatar_index", { avatar: 1 });
    });
  }

  down() {
    this.collection("users", (collection) => {
      collection.dropIndex("avatar_index");
    });
  }
}

module.exports = UserSchema;
