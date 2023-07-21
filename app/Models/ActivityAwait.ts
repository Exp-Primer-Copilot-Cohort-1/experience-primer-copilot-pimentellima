import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus } from 'App/Helpers'
import { IActivityAwait } from 'Types/IActivity'

const ActivityAwaitSchema = new Schema<IActivityAwait>(
	{
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
				status: {
					type: String,
					required: true,
					enum: Object.values(PaymentStatus),
					default: PaymentStatus.PENDING,
				},
			},
		],
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
		prof_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		type: {
			type: String,
			required: false,
			default: 'await',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IActivityAwait>(
	'activity_awaits',
	ActivityAwaitSchema,
	'activities',
)
