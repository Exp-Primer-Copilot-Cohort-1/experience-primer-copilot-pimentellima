'use strict';

const Permission = use('App/Models/Permission');
class PermissionController {
  async index() {
    try {
      const permissions = Permission.fetch();
      return permissions;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.all();

    const permissions = await Permission.create({
      ...data,
      unity_id: userLogged.unity_id,
    });
    return permissions;
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    const permissions = await Permission.where({ _id: params.id }).first();
    if (permissions) {
      const data = request.all();
      permissions.merge({
        ...data,
        unity_id: userLogged.unity_id,
      });
      await permissions.save();
      return permissions;
    }
  }

  async show({ auth }) {
    const userLogged = auth.user;
    const permissions = await Permission.where({
      unity_id: userLogged.unity_id,
    }).first();
    return permissions;
  }
}

module.exports = PermissionController;
