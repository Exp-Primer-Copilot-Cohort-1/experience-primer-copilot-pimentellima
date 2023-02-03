const PERMISSIONS = require('../../Constants/permissions');

class PermissionsGenericEntity {

  constructor(name) {

    if (!PERMISSIONS[name]) {
      throw new Error("Invalid permissions name");
    }

    this._map = new Map();
    this._name = name;
  }

  /**
   * @param {{
   *  $name: string,
   *  $route: string,
   *  DELETE: boolean,
   *  PUT: boolean,
   *  POST: boolean,
   *  GET: boolean,
   * }} permissions
   * @returns
   */
  static async build(permissions = {
    $name: "GENERIC",
    $route: "generic",
    DELETE: false,
    PUT: false,
    POST: false,
    GET: false,
  }) {
    const PermissionsEntity = new PermissionsGenericEntity(permissions.$name)

    return PermissionsEntity
      .definePermissions(permissions);
  }

  get params() {
    return Object.fromEntries(this._map);
  }

  definePermissionsDelete(permission = false) {
    this._map.set(PERMISSIONS?.[this._name]?.DELETE, permission);
    return this;
  }

  definePermissionsPut(permission = false) {
    this._map.set(PERMISSIONS?.[this._name]?.PUT, permission);
    return this;
  }

  definePermissionsPost(permission = false) {
    this._map.set(PERMISSIONS?.[this._name]?.POST, permission);
    return this;
  }

  definePermissionsGet(permission = false) {
    this._map.set(PERMISSIONS?.[this._name]?.GET, permission);
    return this;
  }

  hasBoolean = (value) => typeof value === 'boolean' ? value : false;

  /**
   * @param {Object} permissions
   * @return {PermissionsGenericEntity}
   */
  definePermissions(permissions = {}) {
    return this
      .definePermissionsDelete(this.hasBoolean(permissions?.DELETE))
      .definePermissionsPut(this.hasBoolean(permissions?.PUT))
      .definePermissionsPost(this.hasBoolean(permissions?.POST))
      .definePermissionsGet(this.hasBoolean(permissions?.GET))
  }

  defineAllPermissionByTrue() {
    return this.definePermissions({
      DELETE: true,
      PUT: true,
      POST: true,
      GET: true,
    });
  }

  defineAllPermissionByFalse() {
    return this.definePermissions({
      DELETE: false,
      PUT: false,
      POST: false,
      GET: false,
    });
  }

}

module.exports = PermissionsGenericEntity;
