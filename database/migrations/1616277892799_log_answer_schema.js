"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LogAnswerSchema extends Schema {
  up() {
    this.create("log_answers", (collection) => {
      collection.index("form_id_index", { form_id: 1 });
      collection.index("user_id_index", { user_id: 1 });
      collection.index("answers_index", { answers: 1 });
      collection.index("active_index", { active: 1 });
    });
  }

  down() {
    this.drop("log_answers");
  }
}

module.exports = LogAnswerSchema;
