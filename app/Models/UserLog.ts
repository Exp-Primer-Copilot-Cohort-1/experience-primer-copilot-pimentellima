import Mongoose, { Schema } from '@ioc:Mongoose'

export const UserLogSchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('user_logs', UserLogSchema)
