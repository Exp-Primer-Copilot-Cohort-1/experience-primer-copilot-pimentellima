import { ObjectId } from '@ioc:Mongoose'

// Prof Interface
export interface Prof {
	value: ObjectId
	label: string
}

// Profs Interface
export interface Profs {
	prof: Prof
}

// Particular Interface
export interface IHealthInsurance {
	_id: string
	name: string
	register_code: string
	carence: number
	profs: Profs[]
	active: boolean
	unity_id: ObjectId | string
	created_at: Date | string
	updated_at: Date | string
}
