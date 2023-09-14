import { ObjectId } from '@ioc:Mongoose';
import { AppointmentStatus, PaymentStatus } from '../Helpers';

export type HealthInsurance = {
	info: { value: string; label: string }
	price: string
}

export enum STATUS_ACTIVITY {
	AWAIT = 'await',
	PENDING = 'pending',
	MARKED = 'marked',
}

export type Procedure = {
	info: {
		value: string
		label: string
	}
	minutes: number
	color: string
	val: number
	health_insurance: HealthInsurance
}

export type Client = {
	value: string
	label: string
	celphone: string
	email?: string
	partner?: string | null
}

export type Prof = {
	value: string
	label: string
}

export type ActivityPayment = {
	cost_center: string | ObjectId
	financial_category: string | ObjectId
	account: string | ObjectId
	total: number
	date: Date
	description?: string
	paymentForm: string
	installment: boolean
	installments?: number
}

export interface IAbstractActivity {
	_id: string | ObjectId
	procedures: Procedure[]
	client: Client | string
	obs?: string
	prof: Prof | string
	active: boolean
	status: PaymentStatus
	unity_id: string | ObjectId
	prof_id: string | ObjectId
	created_at: Date
	updated_at: Date
}

export interface IActivityAwait {
	_id: string | ObjectId
	procedures: Procedure[]
	type: STATUS_ACTIVITY.AWAIT
	client: Client
	obs?: string
	prof: Prof
	active: boolean
	status: PaymentStatus
	unity_id: string | ObjectId
	prof_id: string | ObjectId
	created_at: Date
	updated_at: Date
}

export interface IActivityPending {
	_id: string | ObjectId
	group_id: string
	procedures: Procedure[]
	type: STATUS_ACTIVITY.PENDING
	client: Client | ObjectId
	obs?: string
	prof: Prof | ObjectId
	active: boolean
	status: PaymentStatus
	payment?: ActivityPayment
	unity_id: string | ObjectId
	prof_id: string | ObjectId
	created_at: Date
	updated_at: Date
}

export interface IActivity {
	_id?: string | ObjectId
	type?: STATUS_ACTIVITY.MARKED
	date: Date | string
	hour_start: string
	hour_end: string
	status: PaymentStatus
	procedures: Procedure[]
	client: Client | ObjectId | string
	prof: Prof | ObjectId | string
	active?: boolean
	unity_id?: string | ObjectId
	scheduled?: AppointmentStatus
	payment?: ActivityPayment
	obs?: string
	started_at?: Date
	finished_at?: Date
	created_at?: Date
	updated_at?: Date
}

type DateValues = {
	date: string
	hour_start: string
	hour_end: string
}

export type ActivityValues = {
	_id?: string
	prof: Prof
	client: Client
	procedures: Procedure[]
	obs?: string
} & DateValues

export type ActivityAwaitValues = {
	_id?: string
	prof: Prof
	client: Client
	procedures: Procedure[]
	obs?: string
}

export type ActivityPendingValues = {
	prof: Prof
	client: Client
	procedures: Procedure[]
	obs?: string
}

export type RecurrentActivityValues = {
	pending: number
	values: {
		prof: Prof
		client: Client
		procedures: Procedure[]
		obs?: string
	}
	dates: DateValues[]
}
