import Mongoose, { Schema } from '@ioc:Mongoose'
import type { ICategory } from 'App/Types/ICategory'
import { COLLECTION_NAME as COLLECTION_NAME_USER } from './User'
interface ICategoryModel extends Omit<ICategory, 'prof'> {
	prof: Schema.Types.ObjectId
}

export enum COLLECTIONS_REFS {
	PROF = 'prof',
	UNITY = 'unity_id',
}

export const COLLECTION_NAME = 'categories'

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - prof
 *         - unity_id
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria.
 *         prof:
 *           type: string
 *           description: ID do usuário que criou a categoria.
 *         active:
 *           type: boolean
 *           description: Indica se a categoria está ativa ou não.
 *         unity_id:
 *           type: string
 *           description: ID da unidade à qual a categoria pertence.
 *       example:
 *         name: Categoria 1
 *         prof: 60d7c8a9d7d8c4f4c8b7d6a5
 *         active: true
 *         unity_id: 60d7c8a9d7d8c4f4c8b7d6a5
 */
const CategorySchema = new Schema<ICategoryModel>(
	{
		name: {
			type: String,
			required: true,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_NAME_USER,
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
