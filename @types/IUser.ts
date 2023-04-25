/* eslint-disable @typescript-eslint/naming-convention */
// Generated by https://quicktype.io
import { ObjectId } from '@ioc:Mongoose'
import type { IDaysOffice } from './IDaysOffice'

export interface IUser extends IDaysOffice {
	_id: string
	name: string
	email: string
	password: string
	celphone: string
	document: string
	unity_id: ObjectId | string
	type: 'admin' | 'admin_prof' | 'prof' | 'sec'
	active: boolean
	avatar: string
	due_date: string
	created_at: Date
	updated_at: Date
	schedule_obs: string
	show_lack: boolean
	rememberMeToken?: string
}
