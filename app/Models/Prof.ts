import Hash from '@ioc:Adonis/Core/Hash'
import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import type { IUser } from 'App/Types/IUser'

/**
 * @swagger
 * components:
 *   schemas:
 *     Prof:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         name:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           format: email
 *           required: true
 *         password:
 *           type: string
 *           format: password
 *           required: true
 *         celphone:
 *           type: string
 *           required: true
 *         document:
 *           type: string
 *           required: true
 *         unity_id:
 *           type: string
 *           required: true
 *         type:
 *           type: string
 *           required: true
 *         active:
 *           type: boolean
 *           default: false
 *         avatar:
 *           type: string
 *         due_date:
 *           type: string
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
 *         rememberMeToken:
 *           type: string
 */
const ProfSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		celphone: {
			type: String,
			required: true,
		},
		document: {
			type: String,
			required: true,
		},

		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
		avatar: {
			type: String,

		},
		due_date: {
			type: String,

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
		gender: {
			type: String,

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
		rememberMeToken: {
			type: String,

		},
		permissions: {
			type: Array,

		},
		blacklist: {
			type: Array,

		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ProfSchema.pre('save', async function (next) {
	if (process.env.NODE_ENV === 'test') return next()

	if (this.isNew) {
		this.password = await Hash.make(this?.password)
		this.document = await encrypt(this.document.replace(/\D/g, ''))
	}
	next()
})

ProfSchema.post('find', async function (docs) {
	if (process.env.NODE_ENV === 'test') return

	for (const doc of docs) {
		const numbers = doc?.document?.replace(/\D/g, '')

		if (doc?.document && !(numbers.length === 11 || numbers.length === 14)) {
			doc.document = await decrypt(doc.document)
		}
	}
})

ProfSchema.post('findOne', async function (doc) {
	if (process.env.NODE_ENV === 'test') return

	const numbers = doc?.document?.replace(/\D/g, '')

	if (doc?.document && !(numbers.length === 11 || numbers.length === 14)) {
		doc.document = await decrypt(doc.document)
	}
})

ProfSchema.index({ email: 1, document: 1, unity_id: 1 }, { unique: true })

export default Mongoose.model<IUser>('profs', ProfSchema, 'users')
