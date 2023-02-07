'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Room extends Model {
  messages() {
    return this.hasMany('App/Models/Message', '_id', 'room_id');
  }

  unity() {
    return this.belongsTo('App/Models/Unity');
  }

  room_users() {
    return this.hasMany('App/Models/RoomUser');
  }
}

module.exports = Room;
