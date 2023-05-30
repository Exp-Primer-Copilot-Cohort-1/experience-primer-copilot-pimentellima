import { TYPE_PERMISSIONS } from './types'

export const createPermission = (name: string, type: TYPE_PERMISSIONS) => {
	return `${name}.${type}`
}
