import { ObjectId } from '@ioc:Mongoose'
import { IBilling } from './IBilling'
import { IHoliday } from './IHoliday'
import { Generic } from './ITransaction'

/* eslint-disable @typescript-eslint/naming-convention */
export type IUnity = {
	_id: string | ObjectId
	name: string
	is_company?: boolean
	document: string
	date_expiration?: Date
	franchised: boolean
	coordinator?: string | ObjectId | Generic
	active: boolean
	created_at?: Date
	updated_at?: Date
	email: string
	street?: string
	address_number?: string
	avatar?: string
	cep?: string
	city?: string
	cnaes?: string
	complement?: string
	country?: string
	neighborhood?: string
	obs?: string
	phones?: IPhone[]
	site?: string
	state?: string
	revenue_reports?: Map<string, IBilling>
	holidays?: Array<IHoliday>
	created_by?: string | ObjectId
	franchise?: string | ObjectId
}

export type IProfileUnity = {
	_id: string | ObjectId
	name: string
	is_company?: boolean
	document?: string
	coordinator?: string | ObjectId
	email?: string
	street?: string
	address_number?: string
	avatar?: string
	cep?: string
	city?: string
	cnaes?: string
	complement?: string
	country?: string
	neighborhood?: string
	obs?: string
	phones?: IPhone[]
	site?: string
	state?: string
}

export type IPhone = Nullable<{
	value: string
	id: number
}>
