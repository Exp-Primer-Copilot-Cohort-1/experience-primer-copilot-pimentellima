import Mongoose, { Schema } from '@ioc:Mongoose';

export const UserLogSchema = new Schema(
	{},
	{
		timestamps: true,
	},
);

export default Mongoose.model('user_logs', UserLogSchema);
