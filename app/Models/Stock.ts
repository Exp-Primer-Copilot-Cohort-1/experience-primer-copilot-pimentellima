import Mongoose, { Schema } from "@ioc:Mongoose";
import { IStock } from "Types/IStock";

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
	{ timestamps: true }
);

export default Mongoose.model<IStock>("stocks", StockSchema);
