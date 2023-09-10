import Mongoose, { Schema } from '@ioc:Mongoose'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import type { IActivity } from 'Types/IActivity'

interface IActivityModel extends Omit<IActivity, 'prof' | 'client'> {
	prof: Schema.Types.ObjectId
	client: Schema.Types.ObjectId
}

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
				value: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'procedures',
				},
				label: {
					type: String,
					required: true,
				},
				minutes: {
					type: Number,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
				val: {
					type: String,
					required: true,
				},
				health_insurance: {
					value: {
						type: Schema.Types.ObjectId,
						required: false,
						ref: 'health_insurances',
					},
					label: {
						type: String,
						required: false,
					},
					price: {
						type: String,
						required: false,
					},
				},
				_id: false,
			},
		],
		payment: {
			required: false,
			type: {
				cost_center: Schema.Types.ObjectId,
				category: Schema.Types.ObjectId,
				bank: Schema.Types.ObjectId,
				price: Number,
				date: Date,
				description: String,
				paymentForm: String,
				installment: Boolean,
				installments: Number,
			},
			default: {},
			_id: false,
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'clients',
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'users',
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
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
			default: 'marked',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ActivitySchema.index({ 'prof.value': 1 }, { unique: false })
ActivitySchema.index({ 'client.value': 1 }, { unique: false })
ActivitySchema.index({ unity_id: 1, scheduled: 1, date: 1, type: 1 }, { unique: false })

export default Mongoose.model<IActivityModel>('activities', ActivitySchema, 'activities')
