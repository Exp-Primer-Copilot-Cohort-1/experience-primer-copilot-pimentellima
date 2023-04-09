import { Schema, model } from "@ioc:Mongoose";
import { ICostCenter } from 'Types/ICostCenter'

const CostCenterSchema = new Schema<ICostCenter>({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    unity_id: { type: Schema.Types.ObjectId, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
  
  export default model<ICostCenter>('ExpenseCategory', CostCenterSchema);