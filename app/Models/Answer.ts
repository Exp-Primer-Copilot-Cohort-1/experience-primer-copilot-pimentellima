import Mongoose, { Schema } from '@ioc:Mongoose'
import { IAnswer } from 'Types/IAnswer'

const AnswerSchema = new Schema<IAnswer>(
	{},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IAnswer>('answers', AnswerSchema)
