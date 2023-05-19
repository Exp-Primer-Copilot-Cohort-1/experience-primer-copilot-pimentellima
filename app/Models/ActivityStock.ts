import { model, Schema } from '@ioc:Mongoose'

const ActivityStockSchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model('activity_stocks', ActivityStockSchema)
