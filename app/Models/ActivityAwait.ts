import Mongoose, { Schema } from '@ioc:Mongoose'
import { PaymentStatus } from 'App/Helpers'
import { IActivityAwait, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { Generic } from 'App/Types/ITransaction'
import { COLLECTION_NAME } from './Activity'

interface IActivityAwaitModel extends Omit<IActivityAwait, 'prof' | 'client'> {
	prof: Schema.Types.ObjectId | Generic
	client: Schema.Types.ObjectId | Generic
}

export enum COLLECTION_REFS {
	CLIENTS = 'client',
	PROFS = 'prof',
	HEALTH_INSURANCE = 'procedures.health_insurance',
	PROCEDURES = 'procedures._id',
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityAwait:
 *       type: object
 *       properties:
 *         procedures:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 format: uuid
 *               minutes:
 *                 type: number
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               health_insurance:
 *                 type: string
 *                 format: uuid
 *           description: Lista de procedimentos da atividade
 *         status:
 *           type: string
 *           enum: [PENDING, PAID, CANCELED]
 *           description: Status do pagamento da atividade
 *         client:
 *           type: string
 *           format: uuid
 *           description: ID do cliente associado à atividade
 *         obs:
 *           type: string
 *           description: Observações sobre a atividade
 *         prof:
 *           type: string
 *           format: uuid
 *           description: ID do profissional associado à atividade
 *         active:
 *           type: boolean
 *           description: Indica se a atividade está ativa ou não
 *         unity_id:
 *           type: string
 *           format: uuid
 *           description: ID da unidade associada à atividade
 *         type:
 *           type: string
 *           enum: [AWAIT, DONE]
 *           description: Tipo da atividade
 *       required:
 *         - procedures
 *         - status
 *         - client
 *         - prof
 *         - active
 *         - unity_id
 */
const ActivityAwaitSchema = new Schema<IActivityAwaitModel>(
	{
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
					type: Number,
					required: true,
				},
				health_insurance: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'health_insurances',
				},
			},
		],
		status: {
			type: String,
			required: true,
			enum: Object.values(PaymentStatus),
			default: PaymentStatus.PENDING,
		},
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'clients',
		},
		obs: {
			type: String,

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
			default: STATUS_ACTIVITY.AWAIT,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IActivityAwaitModel>(
	'activity_awaits',
	ActivityAwaitSchema,
	COLLECTION_NAME,
)
