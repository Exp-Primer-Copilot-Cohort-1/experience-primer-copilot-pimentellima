'use strict';

const PermissionEntityV2 = require('../Domain/Entities/Permission/permission-entityV2')
const PermissionsV2Model = use('App/Models/PermissionsV2');

/**
 * AuthPermission
 * @class
 * @description Middleware to check if user has permission to access a resource
 * @param {Object} request - Request object
 * @param {Object} response - Response object
 * @param {Object} auth - Auth object
 * @param {Function} next - Next function
 * @returns {Promise}
 */
class AuthPermission {
  async handle({ request, response, auth }, next) {
    const { user } = auth;

    try {
      const permissions = await PermissionsV2Model
        .where('user_id', user._id)
        .firstOrFail()
      // console.log(user._id, request.url(), request.method())
      // const hasPermission = await permission.hasPermission(request.url(), request.method());
      return await next();
    } catch (error) {
      console.log(error)
      return response.status(403).json({
        message: 'Você não tem permissão para acessar este recurso',
      });
    }

  }
}

module.exports = AuthPermission;
