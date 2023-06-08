import Mongoose, { Schema } from '@ioc:Mongoose'
import type { ICategory } from 'Types/ICategory'

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
			ref: 'unities',
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<ICategory>('categories', CategorySchema)
