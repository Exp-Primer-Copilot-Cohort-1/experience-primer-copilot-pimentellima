import Mongoose, { Schema } from '@ioc:Mongoose'
import type { ICategory } from 'App/Types/ICategory'

interface ICategoryModel extends Omit<ICategory, 'prof'> {
	prof: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'categories'

const CategorySchema = new Schema<ICategoryModel>(
	{
		name: {
			type: String,
			required: true,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'users',
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

CategorySchema.index({ unity_id: 1 }, { unique: true })
CategorySchema.index({ prof: 1 }, { unique: false })

export default Mongoose.model<ICategoryModel>(COLLECTION_NAME, CategorySchema)
