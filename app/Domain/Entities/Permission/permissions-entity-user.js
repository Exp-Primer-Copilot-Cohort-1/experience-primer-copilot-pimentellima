const PermissionsEntityV2 = require('./permissions-entity-v2')

class PermissionEntityOfUser extends PermissionsEntityV2 {

  constructor() {
    super()
  }

  defineUserID(user_id) {
    this.user_id = user_id;
    return this;
  }

  /**
   * @param {{
   * $name: string,
   * $route: string,
   * DELETE: boolean,
   * PUT: boolean,
   * POST: boolean,
   *  GET: boolean,
   * }} permissions
   * @param {string} id
   * @param {string} unity_id
   * @returns {Promise<PermissionEntityOfUser>}
   *
   */

  static async build(permissions = null, user_id = null, id = null, unity_id = null) {
    const PERMISSIONS = new PermissionEntityOfUser()
      .defineID(id)
      .defineUnityID(unity_id)
      .defineUserID(user_id)

    if (!permissions) {
      return await PERMISSIONS.buildDefault();
    }


    return PERMISSIONS
      .definePermissions(permissions);
  }

  get params() {
    const props = super.params;
    return {
      ...props,
      user_id: this.user_id,
    };
  }

}

module.exports = PermissionEntityOfUser;
