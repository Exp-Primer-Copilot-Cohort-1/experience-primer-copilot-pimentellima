import Mongoose, { Schema } from '@ioc:Mongoose'
import { IAccount } from 'App/Types/IAccount'
import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
import { COLLECTION_NAME as COLLECTION_USER_NAME } from './User'

export const COLLECTION_NAME = 'accounts'

/**
 * Esquema do Mongoose para a coleção de contas.
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - name
 *         - cash
 *         - date
 *         - bank
 *         - unity_id
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único gerado automaticamente pelo MongoDB.
 *         name:
 *           type: string
 *           description: Nome da conta.
 *         cash:
 *           type: number
 *           description: Saldo da conta.
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data de criação da conta.
 *         bank:
 *           type: string
 *           description: Nome do banco da conta.
 *         active:
 *           type: boolean
 *           description: Indica se a conta está ativa ou não.
 *         unity_id:
 *           type: string
 *           description: Identificador único da unidade associada à conta.
 *         description:
 *           type: string
 *           description: Descrição opcional da conta.
 *         user_id:
 *           type: string
 *           description: Identificador único do usuário associado à conta.
 *       example:
 *         name: Conta Corrente
 *         cash: 1000.0
 *         date: 2022-01-01T00:00:00.000Z
 *         bank: Banco do Brasil
 *         active: true
 *         unity_id: 61d1f5c6a6e8f7b4c9e8f7d1
 *         description: Conta principal da empresa.
 */
const AccountSchema = new Schema<IAccount>(
	{
		name: {
			type: String,
			required: true,
		},
		cash: {
			type: Number,
			required: true,
			default: 0,
		},
		date: {
			type: Date,
			required: true,
		},
		bank: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_UNITY_NAME,
		},
		description: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_USER_NAME,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

AccountSchema.index({ unity_id: 1, active: 1, name: 1 }, { unique: true })

export default Mongoose.model<IAccount>(COLLECTION_NAME, AccountSchema)
