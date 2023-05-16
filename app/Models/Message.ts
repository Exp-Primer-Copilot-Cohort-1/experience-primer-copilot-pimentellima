import { Schema, model } from '@ioc:Mongoose'

const MessageSchema = new Schema<any>(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model<any>('messages', MessageSchema)
