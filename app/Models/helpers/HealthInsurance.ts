import { Schema } from '@ioc:Mongoose'

export const HealthInsuranceSchemaHelper = new Schema(
	{
		value: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'health_insurances',
		},
		label: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'health_insurances',
		timestamps: false,
		_id: false,
	},
)
