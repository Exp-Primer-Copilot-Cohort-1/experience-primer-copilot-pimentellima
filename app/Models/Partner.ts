import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPartner } from 'App/Types/IPartner'
import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
export const COLLECTION_NAME = 'partners'

/**
 * Esquema do Mongoose para um parceiro.
 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do parceiro.
 *         active:
 *           type: boolean
 *           description: Indica se o parceiro está ativo ou não.
 *         unity_id:
 *           type: string
 *           description: ID da unidade associada ao parceiro.
 *       required:
 *         - name
 *         - unity_id
 */
const PartnerSchema = new Schema<IPartner>(
	{
		name: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: true
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			immutable: true,
			ref: COLLECTION_UNITY_NAME
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

PartnerSchema.index({ unity_id: 1, name: 1 }, { unique: true })

export default Mongoose.model<IPartner>(COLLECTION_NAME, PartnerSchema)
