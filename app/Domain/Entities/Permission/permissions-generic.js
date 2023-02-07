const PERMISSIONS = require('../../Constants/permissions');

class PermissionsGenericEntity {

  constructor(name) {

    if (!PERMISSIONS[name]) {
      throw new Error("Invalid permissions name");
    }

    this._map = new Map();
    this.$name = PERMISSIONS[name].$name;
    this.$route = PERMISSIONS[name].$route;
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
    const props = Object.fromEntries(this._map);
    return {
      $name: this.$name,
      $route: this.$route,
      ...props,
    }
  }

  definePermissionsDelete(permission = false) {
    this._map.set(PERMISSIONS?.[this.$name]?.DELETE, permission);
    return this;
  }

  definePermissionsPut(permission = false) {
    this._map.set(PERMISSIONS?.[this.$name]?.PUT, permission);
    return this;
  }

  definePermissionsPost(permission = false) {
    this._map.set(PERMISSIONS?.[this.$name]?.POST, permission);
    return this;
  }

  definePermissionsGet(permission = false) {
    this._map.set(PERMISSIONS?.[this.$name]?.GET, permission);
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
