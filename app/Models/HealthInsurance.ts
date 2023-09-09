import Mongoose, { Schema } from '@ioc:Mongoose'
import { IHealthInsurance } from 'Types/IHealthInsurance'
import { ProfSchemaHelper } from './helpers'

const HealthInsuranceSchema = new Schema<IHealthInsurance>(
	{
		name: { type: String, required: true },
		register_code: { type: String },
		carence: { type: Number },
		profs: [ProfSchemaHelper],
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

HealthInsuranceSchema.index({ unity_id: 1, register_code: 1, name: 1 }, { unique: true })
HealthInsuranceSchema.index(
	{ unity_id: 1, 'profs.value': 1, active: 1 },
	{ unique: false },
)

export default Mongoose.model<IHealthInsurance>(
	'health_insurances',
	HealthInsuranceSchema,
)
