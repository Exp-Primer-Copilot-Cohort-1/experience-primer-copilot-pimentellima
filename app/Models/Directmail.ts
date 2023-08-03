import Mongoose, { Schema } from '@ioc:Mongoose'
import { IDirectmail } from 'Types/IDirectmail'

const DirectmailSchema = new Schema<IDirectmail>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		prof: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		client: {
			value: { type: String, required: true },
			label: { type: String, required: true },
		},
		active: { type: Boolean, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IDirectmail>('directmails', DirectmailSchema)
