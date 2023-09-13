import Mongoose, { Schema } from '@ioc:Mongoose'
import type { IUser } from 'App/Types/IUser'

/**
 * @swagger
 * components:
 *   schemas:
 *     ScheduledConfig:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         name:
 *           type: string
 *           required: true
 *         unity_id:
 *           type: string
 *           required: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         schedule_obs:
 *           type: string
 *         show_lack:
 *           type: boolean
 *         exib_minutes:
 *           type: integer
 *         is_friday:
 *           type: boolean
 *         is_saturday:
 *           type: boolean
 *         is_sunday:
 *           type: boolean
 *         is_monday:
 *           type: boolean
 *         is_tuesday:
 *           type: boolean
 *         is_wednesday:
 *           type: boolean
 *         is_thursday:
 *           type: boolean
 *         hour_end:
 *           type: string
 *         hour_start:
 *           type: string
 *         hour_end_lunch:
 *           type: string
 *         hour_start_lunch:
 *           type: string
 *         lunch_time_active:
 *           type: boolean
 */
const ScheduledConfigSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
			required: true,
		},
		schedule_obs: {
			type: String,
			required: false,
		},
		show_lack: {
			type: Boolean,
			required: false,
		},
		exib_minutes: {
			type: Number,
			required: false,
		},
		is_friday: {
			type: Boolean,
			required: false,
		},
		is_saturday: {
			type: Boolean,
			required: false,
		},
		is_sunday: {
			type: Boolean,
			required: false,
		},
		is_monday: {
			type: Boolean,
			required: false,
		},
		is_tuesday: {
			type: Boolean,
			required: false,
		},
		is_wednesday: {
			type: Boolean,
			required: false,
		},
		is_thursday: {
			type: Boolean,
			required: false,
		},
		hour_end: {
			type: String,
			required: false,
		},
		hour_start: {
			type: String,
			required: false,
		},
		hour_end_lunch: {
			type: String,
			required: false,
		},
		hour_start_lunch: {
			type: String,
			required: false,
		},
		lunch_time_active: {
			type: Boolean,
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

export default Mongoose.model<IUser>('scheduled_config', ScheduledConfigSchema, 'users')
