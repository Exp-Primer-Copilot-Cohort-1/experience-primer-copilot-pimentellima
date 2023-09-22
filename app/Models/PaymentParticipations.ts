import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentParticipations } from 'App/Types/IPaymentProf'

interface IPaymentParticipationsModel
	extends Omit<IPaymentParticipations, 'prof' | 'health_insurance' | 'procedure'> {
	prof: Schema.Types.ObjectId
	health_insurance: Schema.Types.ObjectId
	procedure: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'payment_participations'

/**
 * Representa as participações de pagamento de um profissional de saúde em um determinado procedimento.
 * @swagger
 * components:
 *   schemas:
 *     PaymentParticipations:
 *       type: object
 *       properties:
 *         prices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               abs:
 *                 type: number
 *                 description: Valor absoluto do preço.
 *               percent:
 *                 type: number
 *                 description: Valor percentual do preço.
 *               date_start:
 *                 type: string
 *                 format: date-time
 *                 description: Data de início da vigência do preço.
 *               date_end:
 *                 type: string
 *                 format: date-time
 *                 description: Data de término da vigência do preço.
 *               active:
 *                 type: boolean
 *                 description: Indica se o preço está ativo ou não.
 *             required:
 *               - abs
 *               - percent
 *             example:
 *               - abs: 100
 *                 percent: 0
 *                 date_start: '2022-01-01T00:00:00.000Z'
 *                 date_end: '2022-12-31T23:59:59.999Z'
 *                 active: true
 *         prof:
 *           type: string
 *           description: ID do profissional de saúde.
 *         procedure:
 *           type: string
 *           description: ID do procedimento.
 *         health_insurance:
 *           type: string
 *           description: ID do convênio médico.
 *         unity_id:
 *           type: string
 *           description: ID da unidade de saúde.
 *       required:
 *         - prices
 *         - prof
 *         - procedure
 *         - health_insurance
 *         - unity_id
 */
const PaymentParticipations = new Schema<IPaymentParticipationsModel>(
	{
		prices: {
			type: [
				{
					abs: { type: Number, default: 0 },
					percent: { type: Number, default: 0 },
					date_start: { type: Date, default: Date.now },
					date_end: { type: Date },
					active: { type: Boolean, default: true },
				},
			],
			default: [],
		},
		prof: { type: Schema.Types.ObjectId, ref: 'users', required: true },
		procedure: { type: Schema.Types.ObjectId, ref: 'procedures', required: true },
		health_insurance: {
			type: Schema.Types.ObjectId,
			ref: 'health_insurances',
			required: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
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

PaymentParticipations.index(
	{ prof: 1, procedure: 1, health_insurance: 1 },
	{ unique: true },
)

PaymentParticipations.pre('save', function (next) {
	// 'this' se refere ao documento que está sendo salvo
	this.prices.forEach((price) => {
		// verifica se 'active' foi modificado e se é 'false'
		if (price.active === false && price.date_end == null) {
			// seta 'date_end' para a data atual
			price.date_end = new Date()
		}
	})

	// passa para o próximo middleware/handler
	next()
})

PaymentParticipations.pre('save', function (next) {
	if (this.isModified('prices')) {
		this.prices.forEach((price, index) => {
			// se não for o último elemento do array (o novo adicionado), seta 'active' como false
			if (index !== this.prices.length - 1) {
				price.active = false
				// seta 'date_end' para a data atual se ainda não estiver definido
				if (price.date_end == null) {
					price.date_end = new Date()
				}
			}
		})
	}

	next()
})

export default Mongoose.model<IPaymentParticipationsModel>(
	COLLECTION_NAME,
	PaymentParticipations,
)
