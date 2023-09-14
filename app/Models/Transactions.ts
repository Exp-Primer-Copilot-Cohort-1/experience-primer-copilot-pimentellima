import Mongoose, { Schema } from '@ioc:Mongoose'
import { ITransaction } from 'App/Types/ITransaction'

const schemaDefault = (collection: string) => ({
	type: Schema.Types.ObjectId,
	ref: collection,
	required: false,
})

interface ITransactionModel
	extends Omit<
		ITransaction,
		'prof' | 'client' | 'account' | 'financial_category' | 'cost_center'
	> {
	prof: Schema.Types.ObjectId
	client?: Schema.Types.ObjectId
	account?: Schema.Types.ObjectId
	cost_center?: Schema.Types.ObjectId
	financial_category?: Schema.Types.ObjectId
}

const TransactionsSchema = new Schema<ITransactionModel>(
	{
		group_by: {
			type: String,
			required: true,
		},
		prof: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: false,
		},
		client: {
			type: Schema.Types.ObjectId,
			ref: 'clients',
			required: false,
		},
		// Array de procedimentos
		procedures: {
			required: false,
			type: [
				{
					value: schemaDefault('procedures'),
					color: {
						type: String,
						required: false,
					},
					minutes: {
						type: Number,
						required: false,
					},
					price: {
						type: Number,
						required: true,
					},
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
						_id: false,
					},
					payment_participation: {
						type: {
							value: schemaDefault('payment_participations'),
							price: Number,
							percent: Number,
						},
						required: true,
						_id: false,
					},
					stock: {
						type: [
							{
								value: schemaDefault('stocks'),
								quantity: Number,
								price_cost: Number,
								price_final: Number,
							},
						],
						required: false,
						_id: false,
						default: [],
					},
					_id: false,
				},
			],
		},
		account: {
			type: Schema.Types.ObjectId,
			ref: 'accounts',
			required: false,
		},
		cost_center: {
			type: Schema.Types.ObjectId,
			required: false,
			ref: 'cost_centers',
		},
		financial_category: {
			type: Schema.Types.ObjectId,
			ref: 'financial_categories',
			required: false,
		},
		total: {
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

TransactionsSchema.index(
	{ unity_id: 1, date: 1, total: 1, type: 1, paid: 1, active: 1 },
	{ unique: false },
)
TransactionsSchema.index({ unity_id: 1, occurrences: 1, active: 1 }, { unique: false })
TransactionsSchema.index({ prof: 1, unity_id: 1 }, { unique: false })
TransactionsSchema.index({ group_by: 1, unity_id: 1 }, { unique: false })

export default Mongoose.model('transactions', TransactionsSchema)
