"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FormSchema extends Schema {
  up() {
    this.create("forms", (collection) => {
      collection.index("category_id_index", { category_id: 1 });
      collection.index("name_index", { name: 1 });
      collection.index("questions_index", { questions: 1 });
      collection.index("active_index", { active: 1 });
    });
  }

  down() {
    this.drop("forms");
  }
}

module.exports = FormSchema;
