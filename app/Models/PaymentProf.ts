import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentProf } from 'Types/IPaymentProf'

const PaymentProfSchema = new Schema<IPaymentProf>(
	{
		value: { type: Number, required: false, default: 0 },
		percent: { type: Number, required: false, default: 0 },
		procedure: {
			label: { type: String, required: true },
			value: { type: Schema.Types.ObjectId, ref: 'procedures', required: true },
		},
		health_insurance: {
			label: { type: String, required: true },
			value: {
				type: Schema.Types.ObjectId,
				ref: 'health_insurances',
				required: true,
			},
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IPaymentProf>('payment_profs', PaymentProfSchema)
