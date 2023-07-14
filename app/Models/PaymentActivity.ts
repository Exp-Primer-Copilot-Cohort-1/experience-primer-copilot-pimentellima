import Mongoose, { Schema } from '@ioc:Mongoose'

const PaymentActivitySchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('payment_activities', PaymentActivitySchema)
