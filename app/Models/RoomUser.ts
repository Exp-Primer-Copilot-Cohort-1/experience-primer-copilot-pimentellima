import { model, Schema } from '@ioc:Mongoose'
import { IRoomUser } from 'Types/IRoomUser'

const RoomUserSchema = new Schema<IRoomUser>(
	{
		user_id: { type: Schema.Types.ObjectId, required: true },
		room_id: { type: Schema.Types.ObjectId, required: true },
		read: { type: Boolean, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model<IRoomUser>('room_users', RoomUserSchema)
