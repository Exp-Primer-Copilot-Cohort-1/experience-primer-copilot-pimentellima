/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

'use strict';

const mongoose = require('mongoose');

const Env = use('Env');
const Room = use('App/Models/Room');
const Message = use('App/Models/Message');
const RoomUser = use('App/Models/RoomUser');
const User = use('App/Models/User');

// const Help = use('App/Common');

const { broadcast } = require('../../utils/socket.utils');

class RoomController {
  async index({auth, response}) {
    const supMail = Env.get('MAIL_SUPPORT');

    if (auth.user.email === supMail) {
      const rooms = await Room.where({ support: true })
        .with('messages', (build) => build.with('user'))
        .with('unity')
        .with('room_users', (build) => build.with('user'))
        .fetch();

      return rooms;
    }
    return response
      .status(err.status)
      .send({ error: { message: 'Usuário não tem permissão' } });
  }

  async showMyChatsUnread({auth}) {
    const userLogged = auth.user;

    const rooms = await RoomUser
      .where({user_id: userLogged._id, read: false})
      .with('room', (builder) => builder.with('room_users'))
      .fetch();

    return rooms;
  }

  async showByUnity({params, auth}) {
    try {
      const {user} = auth;

      const rooms = await RoomUser
        .where({user_id: mongoose.Types.ObjectId(user._id)})
        .with('room')
        .fetch();
      if (rooms) {
        const roomsJson = rooms.toJSON();
        const arData = [];
        for (const room of roomsJson) {
          if (room) {
            const roomNew = await Room
              .where({_id: mongoose.Types.ObjectId(room.room_id), support: false})
              .with('room_users', (build) => build.with('user'))
              .with('messages', (build) => build.with('user'))
              .first();
            arData.push(roomNew);
          }
        }
        const returnChat = arData.find((room) => {
          if (room) {
            const newRoom = room.toJSON();
            if (
              newRoom.room_users
          && newRoom.room_users.length === 2
          && newRoom.room_users.find(
            (usr) => usr.user._id === params.userId,
          )
          && newRoom.room_users.find((usr) => `${usr.user_id}` === `${user._id}`)
            ) {
              return room;
            }
          }
        });

        if (!returnChat) {
          const newRoom = await Room.create({
            active: true,
            unity_id: mongoose.Types.ObjectId(user.unity_id),
            support: false,
          });
          await RoomUser.create({
            user_id: mongoose.Types.ObjectId(user._id),
            room_id: mongoose.Types.ObjectId(newRoom._id),
            read: true,
          });
          await RoomUser.create({
            user_id: mongoose.Types.ObjectId(params.userId),
            room_id: mongoose.Types.ObjectId(newRoom._id),
            read: true,
          });
          return newRoom;
        }
        const roomUsers = await RoomUser.where({room_id: returnChat._id}).fetch();
        const roomUsersJson = roomUsers.toJSON().filter((usr) => `${usr.user_id}` === `${user._id}`);
        for (const roomUser of roomUsersJson) {
          const roomUserUpdate = await RoomUser.where({_id: roomUser._id}).first();
          if (roomUserUpdate) {
            roomUserUpdate.merge({
              read: true,
            });
            await roomUserUpdate.save();
          }
        }

        return returnChat;
      }

      // if (!returnChat) {
      const newRoom = await Room.create({
        active: true,
        unity_id: mongoose.Types.ObjectId(user.unity_id),
        support: false,
      });
      await RoomUser.create({
        user_id: mongoose.Types.ObjectId(user._id),
        room_id: mongoose.Types.ObjectId(newRoom._id),
        read: true,
      });
      await RoomUser.create({
        user_id: mongoose.Types.ObjectId(params.userId),
        room_id: mongoose.Types.ObjectId(newRoom._id),
        read: true,
      });

      return newRoom;
    } catch (er) {
      console.log(er);
      return null;
    }
  }

  async showBySupportUnity({auth}) {
    const supMail = Env.get('MAIL_SUPPORT');
    try {
      const {user} = auth;

      const rooms = await RoomUser
        .where({user_id: mongoose.Types.ObjectId(user._id)})
        .with('room')
        .fetch();
      if (rooms) {
        const roomsJson = rooms.toJSON();
        const arData = [];
        for (const room of roomsJson) {
          const roomNew = await Room
            .where({_id: mongoose.Types.ObjectId(room.room_id), support: true})
            .with('room_users', (build) => build.with('user'))
            .with('messages', (build) => build.with('user'))
            .first();
          arData.push(roomNew);
        }
        const returnChat = arData.find((room) => {
          if (room) {
            const newRoom = room.toJSON();
            if (
              newRoom.room_users
            && newRoom.room_users.length === 2
            && newRoom.room_users.find(
              (usr) => usr.user.email === supMail,
            )
            && newRoom.room_users.find((usr) => `${usr.user_id}` === `${user._id}`)
            ) {
              return room;
            }
          }
        });
        const userSup = await User.where({ email: supMail }).first();
        if (!returnChat) {
          const newRoom = await Room.create({
            active: true,
            unity_id: mongoose.Types.ObjectId(user.unity_id),
            support: true,
          });
          await RoomUser.create({
            user_id: mongoose.Types.ObjectId(user._id),
            room_id: mongoose.Types.ObjectId(newRoom._id),
            read: true,
          });
          await RoomUser.create({
            user_id: mongoose.Types.ObjectId(userSup._id),
            room_id: mongoose.Types.ObjectId(newRoom._id),
            read: true,
          });
          return newRoom;
        }
        const roomUsers = await RoomUser.where({room_id: returnChat._id}).fetch();
        const roomUsersJson = roomUsers.toJSON().filter((usr) => `${usr.user_id}` === `${user._id}`);
        for (const roomUser of roomUsersJson) {
          const roomUserUpdate = await RoomUser.where({_id: roomUser._id}).first();
          if (roomUserUpdate) {
            roomUserUpdate.merge({
              read: true,
            });
            await roomUserUpdate.save();
          }
        }
        return returnChat;
      }

      // if (!returnChat) {
      const userSup = await User.where({ email: supMail }).first();
      const newRoom = await Room.create({
        active: true,
        unity_id: mongoose.Types.ObjectId(user.unity_id),
        support: true,
      });
      await RoomUser.create({
        user_id: mongoose.Types.ObjectId(user._id),
        room_id: mongoose.Types.ObjectId(newRoom._id),
        read: true,
      });
      await RoomUser.create({
        user_id: mongoose.Types.ObjectId(userSup._id),
        room_id: mongoose.Types.ObjectId(newRoom._id),
        read: true,
      });

      return newRoom;
    } catch (er) {
      console.log(er);
      return false;
    }
  }

  async createMessage({
    params, request, response, auth,
  }) {
    try {
      const userLogged = auth.user;
      const room = await Room.find(params.id);
      if (!room) {
        return response.notFound('The room doesn\'t exist');
      }

      const data = request.only(['message', 'is_file', 'file']);
      const message = await Message.create({
        ...data,
        room_id: mongoose.Types.ObjectId(room._id),
        user_id: mongoose.Types.ObjectId(userLogged._id),
      });

      const roomUsers = await RoomUser.where({room_id: room._id}).fetch();
      const roomUsersJson = roomUsers.toJSON().filter((usr) => `${usr.user_id}` !== `${userLogged._id}`);
      for (const roomUser of roomUsersJson) {
        const roomUserUpdate = await RoomUser.where({_id: roomUser._id}).first();
        if (roomUserUpdate) {
          roomUserUpdate.merge({
            read: false,
          });
          await roomUserUpdate.save();
        }
      }

      const mess = await Message.query().with('user').with('room').where('_id', message._id)
        .first();
      broadcast(`${room._id}`, 'room:newMessage', mess);

      return message;
    } catch (er) {
      console.log(er);
      return null;
    }
  }
}

module.exports = RoomController;
