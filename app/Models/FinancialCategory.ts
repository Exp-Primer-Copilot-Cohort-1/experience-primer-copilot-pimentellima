import Mongoose, { Schema } from '@ioc:Mongoose'

const FinancialCategorySchema = new Schema<any>(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<any>('financial_categories', FinancialCategorySchema)
