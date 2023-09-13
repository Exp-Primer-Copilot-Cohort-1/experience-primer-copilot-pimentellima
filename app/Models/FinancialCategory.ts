import Mongoose, { Schema } from '@ioc:Mongoose'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'

const FinancialCategorySchema = new Schema<IFinancialCategory>(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['revenue', 'expense'],
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
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

FinancialCategorySchema.index({ unity_id: 1, name: 1, type: 1 }, { unique: true })

export default Mongoose.model<IFinancialCategory>(
	'financial_categories',
	FinancialCategorySchema,
)
