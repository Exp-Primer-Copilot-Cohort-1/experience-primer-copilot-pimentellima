import { model, Schema } from '@ioc:Mongoose'

const PaymentActivitySchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model('payment_activities', PaymentActivitySchema)
