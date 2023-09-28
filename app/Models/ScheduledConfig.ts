import Mongoose, { Schema } from '@ioc:Mongoose'
import { IDaysOffice } from 'App/Types/IDaysOffice'
import { COLLECTION_NAME as COLLECTION_NAME_UNITIES } from './Unity'
export const COLLECTION_NAME = 'scheduled_config'

/**
 * Define o esquema de dados para as configurações de agenda do profissional.
 * @swagger
 * components:
 *   schemas:
 *     ScheduledConfig:
 *       type: object
 *       required:
 *         - name
 *         - unity_id
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da configuração de agendamento.
 *         unity_id:
 *           type: string
 *           description: ID da unidade associada à configuração de agendamento.
 *         schedule_obs:
 *           type: string
 *           description: Observações adicionais sobre o agendamento.
 *         show_lack:
 *           type: boolean
 *           description: Define se a falta deve ser exibida na lista de agendamentos.
 *         exib_minutes:
 *           type: number
 *           description: Define o tempo de exibição do agendamento em minutos.
 *         is_friday:
 *           type: boolean
 *           description: Define se o agendamento é válido para sexta-feira.
 *         is_saturday:
 *           type: boolean
 *           description: Define se o agendamento é válido para sábado.
 *         is_sunday:
 *           type: boolean
 *           description: Define se o agendamento é válido para domingo.
 *         is_monday:
 *           type: boolean
 *           description: Define se o agendamento é válido para segunda-feira.
 *         is_tuesday:
 *           type: boolean
 *           description: Define se o agendamento é válido para terça-feira.
 *         is_wednesday:
 *           type: boolean
 *           description: Define se o agendamento é válido para quarta-feira.
 *         is_thursday:
 *           type: boolean
 *           description: Define se o agendamento é válido para quinta-feira.
 *         hour_end:
 *           type: string
 *           description: Define a hora de término do agendamento.
 *         hour_start:
 *           type: string
 *           description: Define a hora de início do agendamento.
 *         hour_end_lunch:
 *           type: string
 *           description: Define a hora de término do intervalo de almoço.
 *         hour_start_lunch:
 *           type: string
 *           description: Define a hora de início do intervalo de almoço.
 *         lunch_time_active:
 *           type: boolean
 *           description: Define se o intervalo de almoço está ativo para o agendamento.
 *       example:
 *         name: Configuração de agendamento 1
 *         unity_id: 60f9f3d3a3c4d5f7d8c7b3a1
 *         schedule_obs: Agendamento para reunião semanal
 *         show_lack: true
 *         exib_minutes: 60
 *         is_friday: true
 *         is_saturday: false
 *         is_sunday: false
 *         is_monday: true
 *         is_tuesday: true
 *         is_wednesday: true
 *         is_thursday: true
 *         hour_end: 18:00
 *         hour_start: 09:00
 *         hour_end_lunch: 13:00
 *         hour_start_lunch: 12:00
 *         lunch_time_active: true
 */
const ScheduledConfigSchema = new Schema<IDaysOffice>(
	{
		name: {
			type: String,
			required: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: COLLECTION_NAME_UNITIES,
			required: true,
		},
		schedule_obs: {
			type: String,

		},
		show_lack: {
			type: Boolean,

		},
		exib_minutes: {
			type: Number,

		},
		is_friday: {
			type: Boolean,

		},
		is_saturday: {
			type: Boolean,

		},
		is_sunday: {
			type: Boolean,

		},
		is_monday: {
			type: Boolean,

		},
		is_tuesday: {
			type: Boolean,

		},
		is_wednesday: {
			type: Boolean,

		},
		is_thursday: {
			type: Boolean,

		},
		hour_end: {
			type: String,

		},
		hour_start: {
			type: String,

		},
		hour_end_lunch: {
			type: String,

		},
		hour_start_lunch: {
			type: String,

		},
		lunch_time_active: {
			type: Boolean,

		},
		receive_email_in_the_new_appointment: {
			type: Boolean,

		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IDaysOffice>(
	COLLECTION_NAME,
	ScheduledConfigSchema,
	'users',
)
