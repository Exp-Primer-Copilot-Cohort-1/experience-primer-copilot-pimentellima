import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentProf } from 'Types/IPaymentProf'

const PaymentProfSchema = new Schema<IPaymentProf>(
	{
		value: { type: Number, required: true },
		percent: { type: Number, required: true },
		procedure: {
			label: { type: String, required: true },
			value: { type: Schema.Types.ObjectId, ref: 'Procedure', required: true },
		},
		health_insurance: {
			label: { type: String, required: true },
			value: {
				type: Schema.Types.ObjectId,
				ref: 'HealthInsurance',
				required: true,
			},
		},
		prof: {
			label: { type: String, required: true },
			value: { type: Schema.Types.ObjectId, ref: 'Prof', required: true },
		},
		active: { type: Boolean, default: true },
		unity_id: { type: Schema.Types.ObjectId, ref: 'Unity', required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IPaymentProf>('payment_profs', PaymentProfSchema)
