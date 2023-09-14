import Mongoose, { Schema } from '@ioc:Mongoose'
import { IStock } from 'App/Types/IStock'

export const COLLECTION_NAME = 'stocks'

const StockSchema = new Schema<IStock>(
	{
		name: { type: String, required: true },
		batches: [
			{
				name: { type: String, required: false },
				quantity: { type: Number, required: true },
				minimum_quantity: { type: Number, required: true },
				date_batch: { type: Date, required: false },
				price_cost: { type: String, required: true },
				price_final: { type: String, required: true },
			},
		],
		single_lot: { type: Boolean, required: true },
		stock_automatic: { type: Boolean, required: true },
		active: { type: Boolean, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{ timestamps: true },
)

StockSchema.index({ unity_id: 1, name: 1, active: 1 }, { unique: false })
StockSchema.index(
	{
		unity_id: 1,
		'batches.date_batch': 1,
		'batches.quantity': 1,
		'batches.price_cost': 1,
		'batches.price_final': 1,
		active: 1,
	},
	{ unique: false },
)

export default Mongoose.model<IStock>(COLLECTION_NAME, StockSchema)
