import { model, Schema } from '@ioc:Mongoose';


const ActivityPayMonthSchema = new Schema(
	{


	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

export default model('activity_pay_months', ActivityPayMonthSchema);
