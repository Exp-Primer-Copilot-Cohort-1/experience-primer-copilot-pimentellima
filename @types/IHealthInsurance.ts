import { ObjectId } from '@ioc:Mongoose'
import { IProf } from './IProf'

export interface IHealthInsurance {
	_id: string
	name: string
	register_code: string
	carence: number
	profs: IProf[]
	active: boolean
	unity_id: ObjectId | string
	created_at: Date | string
	updated_at: Date | string
}
