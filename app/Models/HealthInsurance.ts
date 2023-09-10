import Mongoose, { Schema } from '@ioc:Mongoose'
import { IHealthInsurance } from 'Types/IHealthInsurance'

interface IHealthInsuranceModel extends Omit<IHealthInsurance, 'profs'> {
	profs: Schema.Types.ObjectId[]
}

const HealthInsuranceSchema = new Schema<IHealthInsuranceModel>(
	{
		name: { type: String, required: true },
		register_code: { type: String },
		carence: { type: Number },
		profs: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'users',
				_id: false,
			},
		],
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
HealthInsuranceSchema.index({ unity_id: 1, profs: 1, active: 1 }, { unique: false })

export default Mongoose.model<IHealthInsuranceModel>(
	'health_insurances',
	HealthInsuranceSchema,
)
