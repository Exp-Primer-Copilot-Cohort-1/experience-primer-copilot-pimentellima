import { model, Schema } from '@ioc:Mongoose'
import { IRoom } from 'Types/IRoom'

const RoomSchema = new Schema<IRoom>(
	{
		active: { type: Boolean, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
		support: { type: Boolean, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model<IRoom>('rooms', RoomSchema)
