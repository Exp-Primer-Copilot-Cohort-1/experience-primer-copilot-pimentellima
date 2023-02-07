'use strict';

const PermissionsUnity = require('../../Domain/Entities/Permission/permissions-entity-unity');

const PermissionsConfigModel = use('App/Models/PermissionsConfig');
const UnityModel = use('App/Models/Unity');

class PermissionsConfigController {
  async generateConfig({ request, auth }) {

    const unities = await UnityModel.all();

    const config = await Promise.all(unities.rows.map(async (unity) => {
      const permissions = await PermissionsUnity.build({ type: "admin", unity_id: unity._id });
      return permissions.params;
    }));

    return config;
  }
  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.all();

    const permissions = await PermissionsConfigModel.create({
      ...data,
      unity_id: userLogged.unity_id,
    });
    return permissions;
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    try {
      const permissions = await PermissionsConfigModel.where({ _id: params.id }).firstOrFail();
      const data = request.all();
      permissions.merge({
        ...data,
        unity_id: userLogged.unity_id,
      });
      await permissions.save();
      return permissions;
    } catch (error) {
      return response.status(404).send({ message: 'Permissão não encontrada' });
    }
  }

  async show({ auth }) {
    const userLogged = auth.user;
    const permissions = await PermissionsConfigModel.where({
      unity_id: userLogged.unity_id,
    }).first();
    return permissions;
  }
}

module.exports = PermissionsConfigController;
