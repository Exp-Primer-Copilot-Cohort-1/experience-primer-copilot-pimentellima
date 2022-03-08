"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TokensSchema extends Schema {
  up() {
    this.create("tokens", (collection) => {
      collection.index("user_id_index", { user_id: 1 });
      collection.index("token_index", { token: 1 });
      collection.index("type_index", { v: 1 });
      collection.index("is_revoked_index", { is_revoked: 1 });
    });
  }

  down() {
    this.drop("tokens");
  }
}

module.exports = TokensSchema;
