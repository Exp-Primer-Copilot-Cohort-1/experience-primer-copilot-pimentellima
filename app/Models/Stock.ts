import { model, Schema } from '@ioc:Mongoose';
import { IStock } from 'Types/IStock';

const StockSchema = new Schema<IStock>(
    {
        name: { type: String, required: true },
        price_cost: { type: Number, required: true },
        price_final: { type: Number, required: true },
        quantity: { type: Number, required: true },
        quantity_add: { type: Number, required: true },
        date_batch: { type: Date, default: null },
        batch: { type: String, default: null },
        stock_automatic: { type: Boolean, required: true },
        quantity_minimun: { type: Number, required: true },
        active: { type: Boolean, required: true },
        unity_id: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

export default model<IStock>('stocks', StockSchema);
