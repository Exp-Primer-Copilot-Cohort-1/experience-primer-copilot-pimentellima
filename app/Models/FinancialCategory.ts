import { Schema, model } from "@ioc:Mongoose";

const FinancialCategorySchema = new Schema<any>({
})

export default model<any>('financial_categories', FinancialCategorySchema);
