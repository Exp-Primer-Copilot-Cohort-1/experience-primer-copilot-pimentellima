import Mongoose, { Schema } from '@ioc:Mongoose'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import { STATUS_ACTIVITY, type IActivity } from 'App/Types/IActivity'

import { COLLECTION_NAME as COLLECTION_CLIENT_NAME } from './Client'
import { COLLECTION_NAME as COLLECTION_HEALTH_INSURANCE_NAME } from './HealthInsurance'
import { COLLECTION_NAME as COLLECTION_PROCEDURE_NAME } from './Procedure'
import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
import { COLLECTION_NAME as COLLECTION_USER_NAME } from './User'
interface IActivityModel extends Omit<IActivity, 'prof' | 'client'> {
	prof: Schema.Types.ObjectId
	client: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'activities'

const ActivitySchema = new Schema<IActivityModel>(
	{
		date: {
			type: Date,
		},
		hour_start: {
			type: String,
		},
		hour_end: {
			type: String,
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
		},
		procedures: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: COLLECTION_PROCEDURE_NAME,
				},
				minutes: {
					type: Number,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				health_insurance: {
					type: Schema.Types.ObjectId,
					required: false,
					ref: COLLECTION_HEALTH_INSURANCE_NAME,
				},
			},
		],
		payment: {
			required: false,
			type: {
				amount: {
					type: Number,
					required: false,
				},
				date: {
					type: Date,
					required: false,
				},
				paymentForm: {
					type: String,
					required: false,
				},
			},
			default: {},
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_CLIENT_NAME,
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_USER_NAME,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_UNITY_NAME,
		},
		scheduled: {
			type: String,
			required: true,
			enum: Object.values(AppointmentStatus),
			default: AppointmentStatus.SCHEDULED,
		},
		started_at: {
			type: Date,
			required: false,
		},
		finished_at: {
			type: Date,
			required: false,
		},
		type: {
			type: String,
			required: false,
			enum: Object.values(STATUS_ACTIVITY),
			default: STATUS_ACTIVITY.MARKED,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ActivitySchema.index({ prof: 1 }, { unique: false })
ActivitySchema.index({ client: 1 }, { unique: false })
ActivitySchema.index({ unity_id: 1, scheduled: 1, date: 1, type: 1 }, { unique: false })

export enum COLLECTIONS_REFS {
	PROFS = 'prof',
	UNITIES = 'unity_id',
	HEALTH_INSURANCES = 'procedures.health_insurance',
	PROCEDURES = 'procedures._id',
	CLIENTS = 'client',
}

export default Mongoose.model<IActivityModel>(
	COLLECTION_NAME,
	ActivitySchema,
	COLLECTION_NAME,
)
