import Mongoose, { Schema } from '@ioc:Mongoose'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { COLLECTION_NAME as COLLECTION_NAME_ACCOUNT } from './Account'
import { COLLECTION_NAME as COLLECTION_NAME_COST_CENTER } from './CostCenter'
import { COLLECTION_NAME as COLLECTION_NAME_UNITY } from './Unity'
/**
 * Esquema de configuração padrão.
 * @swagger
 * components:
 *   schemas:
 *     DefaultConfig:
 *       type: object
 *       required:
 *         - bank
 *         - cost_center
 *         - payment_form
 *       properties:
 *         bank:
 *           type: object
 *           properties:
 *             value:
 *               type: string
 *               format: uuid
 *             label:
 *               type: string
 *           example:
 *             value: 5f4e8d6f4e5d4f6e5d4f6e5d
 *             label: Banco do Brasil
 *         cost_center:
 *           type: object
 *           properties:
 *             value:
 *               type: string
 *               format: uuid
 *             label:
 *               type: string
 *           example:
 *             value: 5f4e8d6f4e5d4f6e5d4f6e5d
 *             label: Centro de custo 1
 *         payment_form:
 *           type: object
 *           properties:
 *             value:
 *               type: string
 *               format: uuid
 *             label:
 *               type: string
 *             key:
 *               type: string
 *           example:
 *             value: 5f4e8d6f4e5d4f6e5d4f6e5d
 *             label: Forma de pagamento 1
 *             key: 01
 *       example:
 *         bank:
 *           value: 5f4e8d6f4e5d4f6e5d4f6e5d
 *           label: Banco do Brasil
 *         cost_center:
 *           value: 5f4e8d6f4e5d4f6e5d4f6e5d
 *           label: Centro de custo 1
 *         payment_form:
 *           value: 5f4e8d6f4e5d4f6e5d4f6e5d
 *           label: Forma de pagamento 1
 *           key: 01
 */
const DefaultConfigSchema = new Schema<{ configs: IDefaultConfig }>(
	{
		configs: {
			bank: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: COLLECTION_NAME_ACCOUNT,
			},
			cost_center: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: COLLECTION_NAME_COST_CENTER,
			},
			payment_form: {
				type: String,
				required: true,
			},
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export enum COLLECTION_REFS {
	BANK = 'configs.bank',
	COST_CENTER = 'configs.cost_center',
}

export default Mongoose.model<{ configs: IDefaultConfig }>(
	'default_configs',
	DefaultConfigSchema,
	COLLECTION_NAME_UNITY,
)
