import Mongoose, { Schema } from '@ioc:Mongoose'

const ActivityAwaitSchema = new Schema(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model('activity_awaits', ActivityAwaitSchema)
