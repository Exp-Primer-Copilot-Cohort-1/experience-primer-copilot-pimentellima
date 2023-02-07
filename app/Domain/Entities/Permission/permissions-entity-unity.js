const PermissionEntityV2 = require('./permissions-entity-v2')

class PermissionEntityOfUnity extends PermissionEntityV2 {

  constructor() {
    super()
  }

  /**
   *
   *
   * @param {{
   *  id: string,
   *  unity_id: string,
   *  type: 'admin' | 'admin_prof' | 'sec' | 'prof',
   *  permissions: {
   *    $name: string,
   *    $route: string,
   *    DELETE: boolean,
   *    PUT: boolean,
   *    POST: boolean,
   *    GET: boolean,
   * }}} props
   * @returns {Promise<PermissionEntityOfUnity>}
   *
   */

  static async build({
    permissions = null,
    id = null,
    unity_id = null,
    type = 'admin'
  }) {
    if (!unity_id) throw new Error('Unidade é obrigatória')

    const PERMISSIONS = new PermissionEntityOfUnity()
      .defineID(id)
      .defineUnityID(unity_id)
      .defineType(type);

    if (!permissions) {
      return await PERMISSIONS.buildDefault();
    }

    return PERMISSIONS
      .definePermissions(permissions)
  }


  defineType(type) {
    this.type = type
    return this
  }

  get params() {
    const props = super.params;
    return {
      ...props,
      type: this.type,
    };
  }
}

module.exports = PermissionEntityOfUnity;
