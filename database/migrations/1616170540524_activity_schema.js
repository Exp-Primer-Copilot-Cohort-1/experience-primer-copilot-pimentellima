"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ActivitySchema extends Schema {
  up() {
    this.collection("activities", (collection) => {
      collection.index("description_index", { description: 1 });
    });
  }

  down() {
    this.collection("activities", (collection) => {
      collection.dropIndex("description_index");
    });
  }
}

module.exports = ActivitySchema;
