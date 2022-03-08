'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class RoomUser extends Model {
  room() {
    return this.belongsTo('App/Models/Room');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = RoomUser;
