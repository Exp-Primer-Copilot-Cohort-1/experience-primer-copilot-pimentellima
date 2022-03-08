"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.collection("users", (collection) => {
      collection.index("document_index", { document: 1 });
      collection.index("is_document_index", { is_document: 1 });
    });
  }

  down() {
    this.collection("users", (collection) => {
      collection.dropIndex("is_document_index");
      collection.dropIndex("document_index");
    });
  }
}

module.exports = UserSchema;
