import { ObjectId } from '@ioc:Mongoose'
import { Generic } from './ITransaction'

export interface IDefaultConfig {
	_id: ObjectId | string
	bank: Generic | string
	cost_center: Generic | string
	payment_form: Generic | string
}
