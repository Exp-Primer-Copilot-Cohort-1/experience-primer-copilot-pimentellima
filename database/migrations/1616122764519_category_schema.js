"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategorySchema extends Schema {
  up() {
    this.create("categories", (collection) => {
      collection.index("name_index", { name: 1 });
      collection.index("active_index", { active: 1 });
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CategorySchema;
