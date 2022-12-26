'use strict';

const SELECTS = require('../../SelectsQuery/user-select');

const mongoose = require('mongoose');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');


const fetchUserByType = async (type, unityId, active = true) => await User.where({
  unity_id: mongoose.Types.ObjectId(unityId),
  active,
  type: {
    $in: type,
  },
})
  .select(SELECTS)
  .sort('-name')
  .with('unity')
  .with('answer')
  .with('activity')
  .with('userLog')
  .fetch();

class UserControllerV2 {
  async findAllUsersClientsInative({ auth }) {
    const userLogged = auth.user;

    const clients = await fetchUserByType(['client'], userLogged.unity_id, false);

    return clients || [];
  }

  async findAllUsersClients({ auth }) {
    const userLogged = auth.user;

    const clients = await fetchUserByType(['client'], userLogged.unity_id);

    return clients || [];
  }

  async findAllUsersProfs({ auth }) {
    const userLogged = auth.user;

    const professionals = await fetchUserByType(['prof', 'admin_prof'], userLogged.unity_id);

    return professionals || [];
  }

  async findAllUsersProfsInative({ auth }) {
    const userLogged = auth.user;

    const professionals = await fetchUserByType(['prof', 'admin_prof'], userLogged.unity_id, false);

    return professionals || [];
  }

  async findAllUsersSecs({ auth }) {
    const userLogged = auth.user;

    const secs = await fetchUserByType(['sec'], userLogged.unity_id);

    return secs || [];
  }

  async findAllUsersSecsInative({ auth }) {
    const userLogged = auth.user;

    const secs = await fetchUserByType(['sec'], userLogged.unity_id, false);

    return secs || [];
  }

  async findUserProfsByID({ params }) {
    const user = await User.where({
      _id: params.id,
      type: {
        $in: ['prof', 'admin_prof'],
      },
    })
      .select(SELECTS)
      .with('unity')
      .with('answer')
      .with('activity')
      .with('userLog')
      .firstOrFail();

    return user;
  }

  async findUserClientByID({ params }) {
    const user = await User.where({ _id: params.id, type: 'client' })
      .select(SELECTS)
      .with('unity')
      .with('answer')
      .with('activity')
      .with('userLog')
      .firstOrFail();

    return user;
  }
}

module.exports = UserControllerV2;
