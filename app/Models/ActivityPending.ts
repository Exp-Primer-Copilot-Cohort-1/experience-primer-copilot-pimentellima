import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus } from 'App/Helpers'
import { IActivityPending, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { COLLECTION_NAME } from './Activity'
import { COLLECTION_NAME as COLLECTION_CLIENT_NAME } from './Client'
import { COLLECTION_NAME as COLLECTION_HEALTH_INSURANCE_NAME } from './HealthInsurance'
import { COLLECTION_NAME as COLLECTION_PROCEDURE_NAME } from './Procedure'
import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
import { COLLECTION_NAME as COLLECTION_USER_NAME } from './User'

interface IActivityPendingModel extends Omit<IActivityPending, 'prof' | 'client'> {
	prof: Schema.Types.ObjectId
	client: Schema.Types.ObjectId
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityPending:
 *       type: object
 *       properties:
 *         group_id:
 *           type: string
 *           description: ID do grupo da atividade pendente.
 *         status:
 *           type: string
 *           description: Status da atividade pendente.
 *           enum: [PENDING, APPROVED, REJECTED]
 *         procedures:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID do procedimento.
 *               minutes:
 *                 type: number
 *                 description: Tempo em minutos do procedimento.
 *               color:
 *                 type: string
 *                 description: Cor do procedimento.
 *               price:
 *                 type: string
 *                 description: Preço do procedimento.
 *               health_insurance:
 *                 type: string
 *                 description: ID do convênio de saúde.
 *           description: Lista de procedimentos da atividade pendente.
 *         payment:
 *           type: object
 *           description: Informações de pagamento da atividade pendente.
 *         client:
 *           type: string
 *           description: ID do cliente da atividade pendente.
 *         obs:
 *           type: string
 *           description: Observações da atividade pendente.
 *         prof:
 *           type: string
 *           description: ID do profissional responsável pela atividade pendente.
 *         active:
 *           type: boolean
 *           description: Indica se a atividade pendente está ativa.
 *         unity_id:
 *           type: string
 *           description: ID da unidade da atividade pendente.
 *         type:
 *           type: string
 *           description: Tipo da atividade pendente.
 *           enum: [PENDING, APPROVED, REJECTED]
 *       required:
 *         - group_id
 *         - status
 *         - procedures
 *         - client
 *         - prof
 *         - active
 *         - unity_id
 */
const ActivityPendingSchema = new Schema<IActivityPendingModel>(
	{
		is_recurrent: {
			type: Boolean,
			required: true,
			default: true,
		},
		group_id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
		},
		procedures: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: COLLECTION_PROCEDURE_NAME,
				},
				minutes: {
					type: Number,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				health_insurance: {
					type: Schema.Types.ObjectId,
					ref: COLLECTION_HEALTH_INSURANCE_NAME,
				},
			},
		],
		payment: {
			type: {
				amount: {
					type: Number,
				},
				date: {
					type: Date,
				},
				paymentForm: {
					type: String,
				},
			},
			default: {},
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_CLIENT_NAME,
		},
		obs: {
			type: String,
			default: null,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_USER_NAME,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: COLLECTION_UNITY_NAME,
		},
		type: {
			type: String,
			default: STATUS_ACTIVITY.PENDING,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ActivityPendingSchema.index({ prof: 1 }, { unique: false })
ActivityPendingSchema.index({ client: 1 }, { unique: false })
ActivityPendingSchema.index({ unity_id: 1, scheduled: 1, date: 1, type: 1 }, { unique: false })

export default Mongoose.model<IActivityPendingModel>(
	'activities_pending',
	ActivityPendingSchema,
	COLLECTION_NAME,
)
