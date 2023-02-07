const PermissionEntityOfUnity = require('../../Entities/Permission/permissions-entity-unity')

class PermissionsUnityFabric {


  constructor() {
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
  static async build({ permissions = null, unity_id, type, _id }) {
    if (!unity_id) throw new Error('Unidade é obrigatória')

    const PERMISSIONS_DEFAULTS = await PermissionEntityOfUnity.build({ permissions, unity_id })

    if (!permissions) PERMISSIONS_DEFAULTS.defineAllPermissionByTrue()

    PERMISSIONS_DEFAULTS.defineUnityID(unity_id)

    return PERMISSIONS_DEFAULTS
  }

  static input(permissions) {
    return {
      permissions: permissions
    }
  }

  static output(permissions) {
    return {
      permissions: permissions
    }
  }

}

module.exports = PermissionsUnityFabric
