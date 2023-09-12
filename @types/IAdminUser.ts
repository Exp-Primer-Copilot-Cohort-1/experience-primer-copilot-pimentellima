import { ObjectId } from '@ioc:Mongoose'
import Document from 'App/Core/domain/entities/validations/document'
import Email from 'App/Core/domain/entities/validations/email'
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
	type: 'admin' | 'admin_prof'
	avatar: string
	created_at: Date
	updated_at: Date
}
