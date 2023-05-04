import Mongoose, { Schema } from '@ioc:Mongoose';

const FinancialCategorySchema = new Schema<any>({});

export default Mongoose.model<any>(
	'financial_categories',
	FinancialCategorySchema,
);
