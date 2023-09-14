import Mongoose, { Schema } from '@ioc:Mongoose'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { COLLECTION_NAME as COLLECTION_UNITIES_NAME } from './Unity'
export const COLLECTION_NAME = 'financial_categories'

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
			ref: COLLECTION_UNITIES_NAME,
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
	COLLECTION_NAME,
	FinancialCategorySchema,
)
