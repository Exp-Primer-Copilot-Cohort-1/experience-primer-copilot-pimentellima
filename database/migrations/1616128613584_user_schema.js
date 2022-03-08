"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.collection("users", (collection) => {
      collection.index("type_index", { type: 1 });
    });
  }

  down() {
    this.collection("users", (collection) => {
      collection.dropIndex("type_index");
    });
  }
}

module.exports = UserSchema;
