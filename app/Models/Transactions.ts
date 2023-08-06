import Mongoose, { Schema } from '@ioc:Mongoose'
import { ITransaction } from 'Types/ITransaction'

const schemaDefault = (colection: string) => ({
	type: Schema.Types.ObjectId,
	ref: colection,
	required: false,
})

const TransactionsSchema = new Schema<ITransaction>(
	{
		group_by: {
			type: String,
			required: true,
		},
		prof: {
			value: schemaDefault('users'),
			label: {
				type: String,
				required: false,
			},
			_id: false,
		},
		client: {
			value: schemaDefault('clients'),
			label: {
				type: String,
				required: false,
			},
			_id: false,
		},
		// Array de procedimentos
		procedures: {
			required: false,
			type: [
				{
					value: schemaDefault('procedures'),
					label: {
						type: String,
						required: false,
					},
					health_insurance: {
						type: {
							value: schemaDefault('health_insurances'),
							label: String,
						},
						required: true,
					},
					payment_participation: {
						type: {
							value: Schema.Types.ObjectId,
							price: Number,
							percent: Number,
						},
						required: true,
					},
					_id: false,
				},
			],
		},
		bank: {
			value: schemaDefault('banks'),
			label: {
				type: String,
				required: false,
			},
			_id: false,
		},
		cost_center: {
			value: schemaDefault('cost_centers'),
			label: {
				type: String,
				required: false,
			},
			_id: false,
		},
		category: {
			value: schemaDefault('financial_categories'),
			label: {
				type: String,
				required: false,
			},
			_id: false,
		},
		value: {
			type: Number,
			required: true,
		},
		paymentForm: {
			type: String,
			required: true,
		},
		paid: {
			type: Boolean,
			required: false,
			default: true,
		},
		date: {
			type: Date,
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
			default: 'expense',
		},
		occurrences: {
			type: String,
			required: false,
			enum: ['once', 'daily', 'weekly', 'biweekly', 'monthly'],
			default: 'once',
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
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('transactions', TransactionsSchema)
