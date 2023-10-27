import Mongoose, { Schema } from '@ioc:Mongoose'
import { IProcedure } from 'App/Types/IProcedure'

import { COLLECTION_NAME as COLLECTION_HEALTH_INSURANCE_NAME } from './HealthInsurance'
import { COLLECTION_NAME as COLLECTION_STOCKS_NAME } from './Stock'
import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
import { COLLECTION_NAME as COLLECTION_USER_NAME } from './User'
interface IProcedureModel extends Omit<IProcedure, 'profs' | 'health_insurances'> {
	profs: Schema.Types.ObjectId[]
	health_insurances: {
		_id: Schema.Types.ObjectId
		price: number
	}[]
}

export const COLLECTION_NAME = 'procedures'

/**
 * Representa o modelo de dados de um procedimento.
 * @swagger
 * components:
 *   schemas:
 *     Procedure:
 *       type: object
 *       properties:
 *         active:
 *           type: boolean
 *           description: Indica se o procedimento está ativo.
 *         color:
 *           type: string
 *           description: Cor do procedimento.
 *         name:
 *           type: string
 *           description: Nome do procedimento.
 *         minutes:
 *           type: number
 *           description: Duração do procedimento em minutos.
 *         profs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: Lista de profissionais que podem realizar o procedimento.
 *         health_insurances:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do convênio de saúde.
 *               price:
 *                 type: number
 *                 description: Preço do procedimento para o convênio de saúde.
 *           description: Lista de convênios de saúde que cobrem o procedimento e seus respectivos preços.
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do produto.
 *               quantity:
 *                 type: number
 *                 description: Quantidade de produtos necessários para realizar o procedimento.
 *               price_cost:
 *                 type: number
 *                 description: Preço de custo do produto.
 *               price_final:
 *                 type: number
 *                 description: Preço final do produto.
 *           description: Lista de produtos necessários para realizar o procedimento e seus respectivos preços.
 *         unity_id:
 *           type: string
 *           format: uuid
 *           description: ID da unidade onde o procedimento pode ser realizado.
 *       required:
 *         - color
 *         - name
 *         - minutes
 *         - profs
 *         - health_insurances
 *         - products
 *         - unity_id
 */
const ProcedureSchema = new Schema<IProcedureModel>(
	{
		active: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		minutes: {
			type: Number,
			required: true,
		},
		profs: [
			{
				_id: false,
				type: Schema.Types.ObjectId,
				ref: COLLECTION_USER_NAME,
			},
		],
		health_insurances: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: COLLECTION_HEALTH_INSURANCE_NAME,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
		products: [
			{
				_id: false,
				value: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: COLLECTION_STOCKS_NAME,
				},
				label: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price_cost: {
					type: Number,
					required: true,
				},
				price_final: {
					type: Number,
					required: true,
				},
			},
		],
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_UNITY_NAME,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ProcedureSchema.index({ unity_id: 1, name: 1, prof: 1, active: 1 }, { unique: false })

ProcedureSchema.index({ unity_id: 1, health_insurance: 1, active: 1 }, { unique: false })

ProcedureSchema.index({ unity_id: 1, minutes: 1, active: 1 }, { unique: false })

export enum COLLECTIONS_REFS {
	PROFS = 'profs',
	HEALTH_INSURANCES = 'health_insurances._id',
	STOCKS = 'products',
}

export default Mongoose.model<IProcedureModel>(COLLECTION_NAME, ProcedureSchema)
