import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus } from 'App/Helpers'
import { IActivityPending, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { COLLECTION_NAME } from './Activity'

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
					ref: 'procedures',
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
					type: String,
					required: true,
				},
				health_insurance: {
					type: Schema.Types.ObjectId,
					required: false,
				},
			},
		],
		payment: {
			required: false,
			default: {},
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'clients',
		},
		obs: {
			type: String,
			required: false,
			default: null,
		},
		prof: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'users',
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		unity_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'unities',
		},
		type: {
			type: String,
			required: false,
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

export default Mongoose.model<IActivityPendingModel>(
	'activities_pending',
	ActivityPendingSchema,
	COLLECTION_NAME,
)
