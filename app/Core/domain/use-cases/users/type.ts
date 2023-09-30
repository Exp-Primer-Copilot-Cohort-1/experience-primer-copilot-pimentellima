import { ROLES } from 'App/Roles/types'

export type Password = { password: string }

export type CreatePasswordProps = {
	password?: string
	email: string
	type: ROLES
}
