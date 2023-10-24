import { ObjectId } from '@ioc:Mongoose'
import Document from 'App/Core/domain/entities/validations/document'
import Email from 'App/Core/domain/entities/validations/email'
import { ROLES } from 'App/Roles/types'
import { IDaysOffice } from './IDaysOffice'

export type IAdminUser = {
	_id: string | ObjectId
	unity_id: string
	name: string
	date_expiration?: string
	password: string
	active: boolean
	email: string | Email
	document: string | Document
	celphone: string
	dayOfTrade?: IDaysOffice
	franchised?: boolean
	type: ROLES.ADMIN | ROLES.ADMIN_PROF | ROLES.FRANCHISEE_ADMIN
	avatar?: string
	created_at?: Date
	updated_at?: Date
}
