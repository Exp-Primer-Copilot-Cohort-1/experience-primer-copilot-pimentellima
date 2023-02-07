const PermissionsGenericEntity = require('./permissions-generic')
const PERMISSIONS = require('../../Constants/permissions');

class PermissionEntityV2 {

  constructor() {
    /** @type {PermissionsGenericEntity[]} */
    this._permissions = [];
    this._map = new Map();
  }

  defineUnityID(id = null) {
    this.unity_id = id;
    return this;
  }

  defineID(id = null) {
    this._id = id;
    return this;
  }

  get params() {

    const permissions = this._permissions.map((permission) => ({
      ...permission.params,
      name: permission._name,
    }));

    return {
      permissions,
      _id: this._id,
      unity_id: this.unity_id,
    };
  }

  async buildDefault() {
    Object.keys(PERMISSIONS).forEach(async (key) => {
      const permissions = await PermissionsGenericEntity.build(PERMISSIONS[key])
      this._permissions.push(permissions);
    });

    return this;
  }

  defineAllPermissionByTrue() {

    this._permissions.forEach((permission) => {
      permission.defineAllPermissionByTrue();
    });

    return this;
  }

  defineAllPermissionByFalse() {

    this._permissions.forEach((permission) => {
      permission.defineAllPermissionByFalse();
    });

    return this;
  }

}

module.exports = PermissionEntityV2;
