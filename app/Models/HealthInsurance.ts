import Mongoose, { Schema } from '@ioc:Mongoose'
import { IHealthInsurance } from 'Types/IHealthInsurance'

const ProfSchema = new Schema({
	value: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users',
	},
	label: { type: String, required: true },
})

const HealthInsuranceSchema = new Schema<IHealthInsurance>(
	{
		name: { type: String, required: true },
		register_code: { type: String },
		carence: { type: Number },
		profs: [ProfSchema],
		active: { type: Boolean, default: true },
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IHealthInsurance>(
	'health_insurances',
	HealthInsuranceSchema,
)
