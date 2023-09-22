import Mongoose, { Schema } from '@ioc:Mongoose'
import { ITransaction } from 'App/Types/ITransaction'

import { COLLECTION_NAME as COLLECTION_ACCOUNTS_NAME } from './Account'
import { COLLECTION_NAME as COLLECTION_CLIENTS_NAME } from './Client'
import { COLLECTION_NAME as COLLECTION_COST_CENTERS_NAME } from './CostCenter'
import { COLLECTION_NAME as COLLECTION_FINANCIAL_CATEGORIES_NAME } from './FinancialCategory'
import { COLLECTION_NAME as COLLECTION_HEALTH_INSURANCE_NAME } from './HealthInsurance'
import { COLLECTION_NAME as COLLECTION_PAYMENT_PARTICIPATIONS_NAME } from './PaymentParticipations'
import { COLLECTION_NAME as COLLECTION_PROCEDURES_NAME } from './Procedure'
import { COLLECTION_NAME as COLLECTION_STOCKS_NAME } from './Stock'
import { COLLECTION_NAME as COLLECTION_UNITIES_NAME } from './Unity'
import { COLLECTION_NAME as COLLECTION_USERS_NAME } from './User'

const schemaDefault = (collection: string) => ({
	type: Schema.Types.ObjectId,
	ref: collection,
	required: false,
})

interface ITransactionModel
	extends Omit<
		ITransaction,
		'prof' | 'client' | 'account' | 'financial_category' | 'cost_center'
	> {
	prof: Schema.Types.ObjectId
	client?: Schema.Types.ObjectId
	account?: Schema.Types.ObjectId
	cost_center?: Schema.Types.ObjectId
	financial_category?: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'transactions'

export enum COLLECTION_REFS {
	UNITIES = 'unity_id',
	FINANCIAL_CATEGORIES = 'financial_category',
	ACCOUNTS = 'account',
	COST_CENTERS = 'cost_center',
	PROFS = 'prof',
	CLIENTS = 'client',
}

/**
 * Esquema de transações.
 * @swagger
 * components:
 *   schemas:
 *     Transactions:
 *       type: object
 *       properties:
 *         group_by:
 *           type: string
 *           description: ID da atividade relacionada à transação.
 *         prof:
 *           type: string
 *           description: ID do profissional relacionado à transação.
 *         client:
 *           type: string
 *           description: ID do cliente relacionado à transação.
 *         procedures:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID do procedimento relacionado à transação.
 *               minutes:
 *                 type: number
 *                 description: Duração do procedimento em minutos.
 *               price:
 *                 type: number
 *                 description: Preço do procedimento.
 *               health_insurance:
 *                 type: string
 *                 description: ID do convênio relacionado ao procedimento.
 *               payment_participation:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *                     description: ID da participação do pagamento relacionada ao procedimento.
 *                   price:
 *                     type: number
 *                     description: Preço da participação do pagamento.
 *                   percent:
 *                     type: number
 *                     description: Percentual da participação do pagamento.
 *               stock:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID do estoque relacionado ao procedimento.
 *                     quantity:
 *                       type: number
 *                       description: Quantidade do estoque.
 *                     price_cost:
 *                       type: number
 *                       description: Preço de custo do estoque.
 *                     price_final:
 *                       type: number
 *                       description: Preço final do estoque.
 *         account:
 *           type: string
 *           description: ID da conta relacionada à transação.
 *         cost_center:
 *           type: string
 *           description: ID do centro de custo relacionado à transação.
 *         financial_category:
 *           type: string
 *           description: ID da categoria financeira relacionada à transação.
 *         amount:
 *           type: number
 *           description: Valor da transação.
 *         paymentForm:
 *           type: string
 *           description: Forma de pagamento da transação.
 *         paid:
 *           type: boolean
 *           description: Indica se a transação foi paga.
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data da transação.
 *         description:
 *           type: string
 *           description: Descrição da transação.
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Tipo da transação.
 *         occurrences:
 *           type: string
 *           enum: [once, daily, weekly, biweekly, monthly]
 *           description: Frequência da transação.
 *         installment:
 *           type: boolean
 *           description: Indica se a transação é parcelada.
 *         installmentCurrent:
 *           type: number
 *           description: Número da parcela atual.
 *         installments:
 *           type: number
 *           description: Número total de parcelas.
 *         active:
 *           type: boolean
 *           description: Indica se a transação está ativa.
 *         unity_id:
 *           type: string
 *           description: ID da unidade relacionada à transação.
 *       required:
 *         - group_by
 *         - account
 *         - cost_center
 *         - financial_category
 *         - amount
 *         - paymentForm
 *         - date
 *         - type
 *         - occurrences
 *         - installment
 *         - installmentCurrent
 *         - installments
 *         - active
 */
const TransactionsSchema = new Schema<ITransactionModel>(
	{
		group_by: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'activities',
		},
		prof: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_USERS_NAME,
			required: false,
		},
		client: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_CLIENTS_NAME,
			required: false,
		},

		procedures: {
			required: false,
			type: [
				{
					_id: schemaDefault(COLLECTION_PROCEDURES_NAME),
					minutes: {
						type: Number,
						required: false,
					},
					price: {
						type: Number,
						required: true,
					},
					health_insurance: schemaDefault(COLLECTION_HEALTH_INSURANCE_NAME),
					payment_participation: {
						type: {
							value: schemaDefault(COLLECTION_PAYMENT_PARTICIPATIONS_NAME),
							price: {
								type: Number,
								required: true,
							},
							percent: {
								type: Number,
								required: true,
							},
						},
						required: true,
						_id: false,
					},
					stock: {
						type: [
							{
								_id: schemaDefault(COLLECTION_STOCKS_NAME),
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
						required: false,
						default: [],
					},
				},
			],
		},
		account: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_ACCOUNTS_NAME,
			required: true,
		},
		cost_center: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_COST_CENTERS_NAME,
		},
		financial_category: {
			type: Schema.Types.ObjectId,
			ref: COLLECTION_FINANCIAL_CATEGORIES_NAME,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentForm: {
			type: String,
			required: true,
		},
		paid: {
			type: Boolean,
			required: false,
			default: true,
		},
		date: {
			type: Date,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: true,
			enum: ['income', 'expense'],
			default: 'expense',
		},
		occurrences: {
			type: String,
			required: false,
			enum: ['once', 'daily', 'weekly', 'biweekly', 'monthly'],
			default: 'once',
		},
		installment: {
			type: Boolean,
			required: false,
			default: false,
		},
		installmentCurrent: {
			type: Number,
			required: false,
			default: 1,
		},
		installments: {
			type: Number,
			required: false,
			default: 1,
		},
		active: {
			type: Boolean,
			required: false,
			default: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
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

TransactionsSchema.index(
	{ unity_id: 1, date: 1, total: 1, type: 1, paid: 1, active: 1 },
	{ unique: false },
)
TransactionsSchema.index({ unity_id: 1, occurrences: 1, active: 1 }, { unique: false })
TransactionsSchema.index({ prof: 1, unity_id: 1 }, { unique: false })
TransactionsSchema.index({ group_by: 1, unity_id: 1 }, { unique: false })

export default Mongoose.model(COLLECTION_NAME, TransactionsSchema)
