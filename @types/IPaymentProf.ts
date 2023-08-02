import { ObjectId } from 'mongoose'

export interface IPaymentProf {
	_id?: string | ObjectId
	value: number
	percent: number
	participation_id?: string | ObjectId
	procedure: {
		label: string
		value: string | ObjectId
	}
	health_insurance: {
		label: string
		value: string | ObjectId
	}
	prof: {
		label: string
		value: string | ObjectId
	}
	active: boolean
	unity_id: string | ObjectId
}

export interface ParticipationPrice {
	_id?: string | ObjectId
	abs: number
	percent: number
	active: boolean
	date_start: Date
	date_end?: Date
}

export interface IPaymentParticipations {
	_id?: string | ObjectId
	prices: ParticipationPrice[]
	procedure: {
		label: string
		value: string | ObjectId
	}
	health_insurance: {
		label: string
		value: string | ObjectId
	}
	prof: {
		label: string
		value: string | ObjectId
	}
	unity_id: string | ObjectId
}
