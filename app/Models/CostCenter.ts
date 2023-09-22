import Mongoose, { Schema } from '@ioc:Mongoose'
import { ICostCenter } from 'App/Types/ICostCenter'
import { COLLECTION_NAME as COLLECTION_UNITIES_NAME } from './Unity'

export const COLLECTION_NAME = 'cost_centers'

/**
 * Representa o esquema de um centro de custo.
 * @swagger
 * components:
 *   schemas:
 *     CostCenter:
 *       type: object
 *       required:
 *         - name
 *         - unity_id
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do centro de custo.
 *         active:
 *           type: boolean
 *           description: Indica se o centro de custo está ativo ou não.
 *         unity_id:
 *           type: string
 *           description: ID da unidade associada ao centro de custo.
 *       example:
 *         name: Centro de custo 1
 *         active: true
 *         unity_id: 60f7c5c3d7c1a1f9c6d1a1f9
 */
const CostCenterSchema = new Schema<ICostCenter>(
	{
		name: { type: String, required: true },
		active: { type: Boolean, required: true, default: true },
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_UNITIES_NAME,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

CostCenterSchema.index({ unity_id: 1 }, { unique: true })

export default Mongoose.model<ICostCenter>(COLLECTION_NAME, CostCenterSchema)
