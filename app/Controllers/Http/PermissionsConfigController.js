'use strict';

const PermissionsUnity = require('../../Domain/Entities/Permission/permission-entity-unity');
const PermissionsGeneric = require('../../Domain/Entities/Permission/permissions-generic');

const PermissionsConfigModel = use('App/Models/PermissionsConfig');
const UnityModel = use('App/Models/Unity');

class PermissionsConfigController {
  async generateConfig({ request, auth }) {
    const config = await PermissionsUnity.build();
    config.defineAllPermissionByTrue();
    const unities = await UnityModel.all();
    return config.params;
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
