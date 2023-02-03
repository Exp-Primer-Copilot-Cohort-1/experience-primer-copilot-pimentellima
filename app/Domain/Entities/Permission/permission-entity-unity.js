const PermissionEntityV2 = require('./permission-entity-v2')

class PermissionEntityOfUnity extends PermissionEntityV2 {

  constructor() {
    super()
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
   * @returns {Promise<PermissionEntityOfUnity>}
   *
   */

  static async build(permissions = null, id = null, unity_id = null) {
    const PERMISSIONS = new PermissionEntityOfUnity()
      .defineID(id)
      .defineUnityID(unity_id)

    if (!permissions) {
      return await PERMISSIONS.buildDefault();
    }


    return PERMISSIONS
      .definePermissions(permissions);
  }

}

module.exports = PermissionEntityOfUnity;
