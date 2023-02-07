import { describe, expect, it } from 'vitest'

import PermissionsFabricUnities from './permissions-fabric-unities'

describe('should test unitary fabric', () => {
  it('Should Instance Of Permission Entity of Unity', async () => {
    const permissions = await PermissionsFabricUnities.build({ type: 'admin', unity_id: '123' })
    expect(permissions).toBeInstanceOf(PermissionsFabricUnities)
  })
})
