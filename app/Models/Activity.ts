import Mongoose, { Schema } from '@ioc:Mongoose'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import type { IActivity } from 'Types/IActivity'

const ActivitySchema = new Schema<IActivity>(
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
					type: String,
					required: true,
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
						type: String,
						required: false,
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
			},
		],
		payment: {
			required: false,
			default: {},
		},
		client: {
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			celphone: {
				type: String,
				required: false,
				default: null,
			},
			email: {
				type: String,
				required: false,
				default: null,
			},
			partner: {
				type: new Schema(
					{
						value: {
							type: String,
							validate: {
								validator: function (v) {
									return !this.partner || (v && this.partner?.label)
								},
								message: (props) =>
									'Se "partner" é fornecido, "value" e "label" devem ser fornecidos!',
							},
						},
						label: {
							type: String,
							validate: {
								validator: function (v) {
									return !this.partner || (v && this.partner.value)
								},
								message: (props) =>
									'Se "partner" é fornecido, "value" e "label" devem ser fornecidos!',
							},
						},
					},
					{ _id: false },
				), // {_id: false} evita que o Mongoose crie um ID automático para o subdocumento
				required: false,
			},
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		scheduled: {
			type: String,
			required: true,
			enum: Object.values(AppointmentStatus),
			default: AppointmentStatus.SCHEDULED,
		},
		prof_id: {
			type: Schema.Types.ObjectId,
			required: true,
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

ActivitySchema.pre('find', function () {
	this.where({ $in: ['marked', undefined] })
})

ActivitySchema.index({ 'prof.value': 1 }, { unique: false })
ActivitySchema.index({ 'client.value': 1 }, { unique: false })
ActivitySchema.index({ unity_id: 1, scheduled: 1, date: 1, type: 1 }, { unique: false })

export default Mongoose.model<IActivity>('activities', ActivitySchema, 'activities')
