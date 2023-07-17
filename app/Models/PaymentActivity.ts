import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentActivity } from 'Types/IPaymentActivity'

const schemaDefault = (colection: string) => ({
	type: Schema.Types.ObjectId,
	ref: colection,
	required: false,
})

const PaymentActivitySchema = new Schema<IPaymentActivity>(
	{
		bank: {
			id: schemaDefault('banks'),
			name: {
				type: String,
				required: false,
			},
		},
		cost_center: {
			id: schemaDefault('cost_centers'),
			name: {
				type: String,
				required: false,
			},
		},
		category: {
			id: schemaDefault('financial_categories'),
			name: {
				type: String,
				required: false,
			},
		},
		value: {
			type: String,
			required: true,
		},
		paymentForm: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: true,
			enum: ['income', 'expense'],
		},
		installment: {
			type: Boolean,
			required: false,
			default: false,
		},
		installmentCurrent: {
			type: Number,
			required: false,
			default: 1,
		},
		installments: {
			type: Number,
			required: false,
			default: 1,
		},
		active: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('payment_activities', PaymentActivitySchema)
