import Mongoose, { Schema } from '@ioc:Mongoose'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import { STATUS_ACTIVITY, type IActivity } from 'App/Types/IActivity'

import { COLLECTION_NAME as COLLECTION_CLIENT_NAME } from './Client'
import { COLLECTION_NAME as COLLECTION_HEALTH_INSURANCE_NAME } from './HealthInsurance'
import { COLLECTION_NAME as COLLECTION_PROCEDURE_NAME } from './Procedure'
import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
import { COLLECTION_NAME as COLLECTION_USER_NAME } from './User'
interface IActivityModel extends Omit<IActivity, 'prof' | 'client'> {
	prof: Schema.Types.ObjectId
	client: Schema.Types.ObjectId
}

export const COLLECTION_NAME = 'activities'

/**
 * Define o esquema para uma atividade no sistema.
 *
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - date
 *         - hour_start
 *         - hour_end
 *         - status
 *         - procedures
 *         - client
 *         - prof
 *         - active
 *         - unity_id
 *         - scheduled
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: A data da atividade.
 *         hour_start:
 *           type: string
 *           description: O horário de início da atividade.
 *         hour_end:
 *           type: string
 *           description: O horário de término da atividade.
 *         status:
 *           type: string
 *           enum: [PENDING, PAID, CANCELED]
 *           description: O status do pagamento da atividade.
 *         procedures:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - _id
 *               - minutes
 *               - color
 *               - price
 *             properties:
 *               _id:
 *                 type: string
 *                 description: O ID do procedimento.
 *               minutes:
 *                 type: number
 *                 description: A duração do procedimento em minutos.
 *               color:
 *                 type: string
 *                 description: A cor associada ao procedimento.
 *               price:
 *                 type: number
 *                 description: O preço do procedimento.
 *               health_insurance:
 *                 type: string
 *                 description: O ID do convênio associado ao procedimento.
 *         payment:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *               description: O valor pago pela atividade.
 *             date:
 *               type: string
 *               format: date
 *               description: A data do pagamento.
 *             paymentForm:
 *               type: string
 *               description: A forma de pagamento utilizada para a atividade.
 *         client:
 *           type: string
 *           description: O ID do cliente associado à atividade.
 *         obs:
 *           type: string
 *           description: Quaisquer observações sobre a atividade.
 *         prof:
 *           type: string
 *           description: O ID do profissional associado à atividade.
 *         active:
 *           type: boolean
 *           description: Se a atividade está ativa ou não.
 *         unity_id:
 *           type: string
 *           description: O ID da unidade associada à atividade.
 *         scheduled:
 *           type: string
 *           enum: [SCHEDULED, CANCELED, COMPLETED]
 *           description: O status da atividade.
 *         started_at:
 *           type: string
 *           format: date-time
 *           description: A data e hora em que a atividade começou.
 *         finished_at:
 *           type: string
 *           format: date-time
 *           description: A data e hora em que a atividade terminou.
 *         type:
 *           type: string
 *           enum: [MARKED, PENDING, AWAIT]
 *           description: O tipo de atividade.
 *       example:
 *         date: '2022-01-01'
 *         hour_start: '08:00'
 *         hour_end: '09:00'
 *         status: PENDING
 *         procedures:
 *           - _id: '123456789012345678901234'
 *             minutes: 60
 *             color: '#FF0000'
 *             price: 100
 *             health_insurance: '123456789012345678901234'
 *         payment:
 *           amount: 100
 *           date: '2022-01-01'
 *           paymentForm: CREDIT_CARD
 *         client: '123456789012345678901234'
 *         obs: 'Paciente chegou atrasado.'
 *         prof: '123456789012345678901234'
 *         active: true
 *         unity_id: '123456789012345678901234'
 *         scheduled: SCHEDULED
 *         started_at: '2022-01-01T08:00:00.000Z'
 *         finished_at: '2022-01-01T09:00:00.000Z'
 *         type: MARKED
 */
const ActivitySchema = new Schema<IActivityModel>(
	{
		date: {
			type: Date,
			required: true,
		},
		hour_start: {
			type: String,
			required: true,
		},
		hour_end: {
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
					required: false,
					ref: COLLECTION_HEALTH_INSURANCE_NAME,
				},
			},
		],
		payment: {
			required: false,
			type: {
				amount: {
					type: Number,
					required: false,
				},
				date: {
					type: Date,
					required: false,
				},
				paymentForm: {
					type: String,
					required: false,
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
			required: false,
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
		scheduled: {
			type: String,
			required: true,
			enum: Object.values(AppointmentStatus),
			default: AppointmentStatus.SCHEDULED,
		},
		started_at: {
			type: Date,
			required: false,
		},
		finished_at: {
			type: Date,
			required: false,
		},
		type: {
			type: String,
			required: false,
			enum: Object.values(STATUS_ACTIVITY),
			default: STATUS_ACTIVITY.MARKED,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ActivitySchema.index({ prof: 1 }, { unique: false })
ActivitySchema.index({ client: 1 }, { unique: false })
ActivitySchema.index({ unity_id: 1, scheduled: 1, date: 1, type: 1 }, { unique: false })

export enum COLLECTIONS_REFS {
	PROFS = 'prof',
	UNITIES = 'unity_id',
	HEALTH_INSURANCES = 'procedures.health_insurance',
	PROCEDURES = 'procedures._id',
	CLIENTS = 'client',
}

export default Mongoose.model<IActivityModel>(
	COLLECTION_NAME,
	ActivitySchema,
	COLLECTION_NAME,
)
