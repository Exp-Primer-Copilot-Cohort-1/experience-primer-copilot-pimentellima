import { ObjectId } from '@ioc:Mongoose'

export interface IHoliday {
	_id?: ObjectId | string
	date: string
	name: string
	type: 'nacional' | 'estadual' | 'municipal'
}
