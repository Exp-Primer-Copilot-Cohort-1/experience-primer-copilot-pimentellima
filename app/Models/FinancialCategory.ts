import Mongoose, { Schema } from '@ioc:Mongoose'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'
import { COLLECTION_NAME as COLLECTION_UNITIES_NAME } from './Unity'
export const COLLECTION_NAME = 'financial_categories'

import mongoose, { Document } from 'mongoose'

/**
 * Interface que representa a categoria financeira.
 */
export interface IFinancialCategory extends Document {
	name: string
	type: 'revenue' | 'expense'
	active: boolean
	unity_id: mongoose.Types.ObjectId
	created_at: Date
	updated_at: Date
}

/**
 * Esquema da categoria financeira.
 * @swagger
 * components:
 *   schemas:
 *     FinancialCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria financeira.
 *         type:
 *           type: string
 *           enum: [revenue, expense]
 *           description: Tipo da categoria financeira (receita ou despesa).
 *         active:
 *           type: boolean
 *           description: Indica se a categoria financeira está ativa ou não.
 *         unity_id:
 *           type: string
 *           description: ID da unidade relacionada à categoria financeira.
 *       required:
 *         - name
 *         - type
 *         - unity_id
 */
const FinancialCategorySchema = new Schema<IFinancialCategory>(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['revenue', 'expense'],
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: COLLECTION_UNITIES_NAME,
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

FinancialCategorySchema.index({ unity_id: 1, name: 1, type: 1 }, { unique: true })

export default Mongoose.model<IFinancialCategory>(
	COLLECTION_NAME,
	FinancialCategorySchema,
)
