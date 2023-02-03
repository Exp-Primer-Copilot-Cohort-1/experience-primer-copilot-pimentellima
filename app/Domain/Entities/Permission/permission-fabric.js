const PermissionEntityV2 = require('./permission-entity-user')
/**
 * @class PermissionsFabricProf
 * @property {PermissionEntityV2} PermissionsEntity
 * @property {string} type
 * @property {string} unity_id
 * @property {string} user_id
 *
 **/
class PermissionsFabric {

  /**
   * @param {PermissionEntityV2} permissions
   * @param {string} unity_id
   * @param {'admin' | 'admin_prof' | 'sec' | 'prof'} type
   */
  constructor(permissions, unity_id = null, type = 'admin') {
    /** @type {PermissionEntityV2} */
    this.PermissionsEntity = permissions
    this.type = type
    this.unity_id = unity_id
  }

  static async buildPermissions(permissions = null, unity_id) {
    if (!unity_id) throw new Error('Unidade é obrigatória')

    const PERMISSIONS_DEFAULTS = await PermissionEntityV2.build(permissions)

    if (!permissions) PERMISSIONS_DEFAULTS.defineAllPermissionByTrue()

    PERMISSIONS_DEFAULTS.defineUnityID(unity_id)

    return PERMISSIONS_DEFAULTS
  }

  static async buildAdmin(permissions = null, unity_id) {
    const PERMISSIONS_DEFAULTS = await this.buildPermissions(permissions, unity_id)
    return new PermissionsFabric(PERMISSIONS_DEFAULTS, unity_id, 'admin')
  }

  static async buildAdminProf(permissions = null, unity_id) {
    const PERMISSIONS_DEFAULTS = await this.buildPermissions(permissions, unity_id)
    return new PermissionsFabric(PERMISSIONS_DEFAULTS, unity_id, 'admin_prof')
  }

  static async buildSec(permissions = null, unity_id) {
    const PERMISSIONS_DEFAULTS = await this.buildPermissions(permissions, unity_id)

    if (!permissions) {
      PERMISSIONS_DEFAULTS.defineResponseSheetPermissions(null, false)
      PERMISSIONS_DEFAULTS.defineHistoricResponseSheetPermissions(null, false)
      PERMISSIONS_DEFAULTS.defineProfessionalsPermissions(null, false)
      PERMISSIONS_DEFAULTS.defineProceduresPermissions(null, false)
      PERMISSIONS_DEFAULTS.defineCategoriesPermissions(null, false)
      PERMISSIONS_DEFAULTS.defineHistoricChartsPermissions(null, false)
      PERMISSIONS_DEFAULTS.defineChartsPermissions(null, false)
    }
    return new PermissionsFabric(PERMISSIONS_DEFAULTS, unity_id, 'sec')
  }

  static async buildProf(permissions = null, unity_id) {
    const PERMISSIONS_DEFAULTS = await this.buildPermissions(permissions, unity_id)
    return new PermissionsFabric(PERMISSIONS_DEFAULTS, unity_id, 'prof')
  }

  defineDefaultPermissions(permissions) {
    this.PermissionsEntity = permissions
    return this
  }

  async params() {
    const { user_id, ...rest } = await this.PermissionsEntity.params()

    return Object.assign({}, {
      ...rest,
      type: this.type,
      unity_id: this.unity_id,
    });
  }
}

module.exports = PermissionsFabric
