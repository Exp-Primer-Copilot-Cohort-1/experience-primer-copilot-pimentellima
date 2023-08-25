import { ROLES } from 'App/Roles/types'

export type Password = string

export type CreatePasswordProps = {
	password?: Password
	email: string
	type: ROLES
}
