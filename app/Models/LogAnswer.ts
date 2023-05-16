import { Schema, model } from '@ioc:Mongoose'

const LogAnswerSchema = new Schema<any>(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model<any>('log_answers', LogAnswerSchema)
