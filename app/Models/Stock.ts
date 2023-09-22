import Mongoose, { Schema } from '@ioc:Mongoose'
import { IStock } from 'App/Types/IStock'

export const COLLECTION_NAME = 'stocks'

/**
 * Representa um lote de estoque.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Batch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do lote.
 *         quantity:
 *           type: number
 *           description: Quantidade do lote.
 *         minimum_quantity:
 *           type: number
 *           description: Quantidade mínima permitida para o lote.
 *         date_batch:
 *           type: string
 *           format: date-time
 *           description: Data de validade do lote.
 *         price_cost:
 *           type: string
 *           description: Preço de custo do lote.
 *         price_final:
 *           type: string
 *           description: Preço final de venda do lote.
 *     Stock:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do estoque.
 *         batches:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Batch'
 *           description: Lotes do estoque.
 *         single_lot:
 *           type: boolean
 *           description: Indica se o estoque possui apenas um lote.
 *         stock_automatic:
 *           type: boolean
 *           description: Indica se o estoque é gerenciado automaticamente.
 *         active:
 *           type: boolean
 *           description: Indica se o estoque está ativo.
 *         unity_id:
 *           type: string
 *           description: ID da unidade relacionada ao estoque.
 */
const StockSchema = new Schema<IStock>(
	{
		name: { type: String, required: true },
		batches: [
			{
				name: { type: String, required: false },
				quantity: { type: Number, required: true },
				minimum_quantity: { type: Number, required: true },
				date_batch: { type: Date, required: false },
				price_cost: { type: String, required: true },
				price_final: { type: String, required: true },
			},
		],
		single_lot: { type: Boolean, required: true },
		stock_automatic: { type: Boolean, required: true },
		active: { type: Boolean, required: true },
		unity_id: { type: Schema.Types.ObjectId, required: true },
	},
	{ timestamps: true },
)

StockSchema.index({ unity_id: 1, name: 1, active: 1 }, { unique: false })
StockSchema.index(
	{
		unity_id: 1,
		'batches.date_batch': 1,
		'batches.quantity': 1,
		'batches.price_cost': 1,
		'batches.price_final': 1,
		active: 1,
	},
	{ unique: false },
)

export default Mongoose.model<IStock>(COLLECTION_NAME, StockSchema)
