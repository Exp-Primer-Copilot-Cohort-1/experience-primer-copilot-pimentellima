import { model, Schema } from '@ioc:Mongoose'
import { ICategory } from 'Types/ICategory'

const CategorySchema = new Schema<ICategory>(
	{
		name: {
			type: String,
			required: true,
		},
		prof: {
			value: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
		},
		active: {
			type: Boolean,
			required: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default model<ICategory>('categories', CategorySchema)
