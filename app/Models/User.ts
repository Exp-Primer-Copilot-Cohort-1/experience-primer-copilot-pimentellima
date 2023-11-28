import Hash from '@ioc:Adonis/Core/Hash'
import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import type { IUser } from 'App/Types/IUser'

import { ROLES } from 'App/Roles/types'

export const COLLECTION_NAME = 'users'

const roles = [
	ROLES.FRANCHISEE_ADMIN,
	ROLES.SUPERADMIN
]

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - celphone
 *         - document
 *         - unity_id
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário.
 *         email:
 *           type: string
 *           description: Email do usuário.
 *         password:
 *           type: string
 *           description: Senha do usuário.
 *         celphone:
 *           type: string
 *           description: Número de celular do usuário.
 *         document:
 *           type: string
 *           description: Número do documento do usuário.
 *         unity_id:
 *           type: string
 *           description: ID da unidade do usuário.
 *         type:
 *           type: string
 *           description: Tipo de usuário.
 *         active:
 *           type: boolean
 *           description: Indica se o usuário está ativo.
 *         avatar:
 *           type: string
 *           description: URL da imagem do avatar do usuário.
 *         due_date:
 *           type: string
 *           description: Data de vencimento do usuário.
 *         schedule_obs:
 *           type: string
 *           description: Observações sobre o agendamento do usuário.
 *         show_lack:
 *           type: boolean
 *           description: Indica se o usuário deve mostrar a falta.
 *         exib_minutes:
 *           type: number
 *           description: Quantidade de minutos que o usuário deve exibir.
 *         is_friday:
 *           type: boolean
 *           description: Indica se o usuário trabalha na sexta-feira.
 *         gender:
 *           type: string
 *           description: Gênero do usuário.
 *         is_saturday:
 *           type: boolean
 *           description: Indica se o usuário trabalha no sábado.
 *         is_sunday:
 *           type: boolean
 *           description: Indica se o usuário trabalha no domingo.
 *         is_monday:
 *           type: boolean
 *           description: Indica se o usuário trabalha na segunda-feira.
 *         is_tuesday:
 *           type: boolean
 *           description: Indica se o usuário trabalha na terça-feira.
 *         is_wednesday:
 *           type: boolean
 *           description: Indica se o usuário trabalha na quarta-feira.
 *         is_thursday:
 *           type: boolean
 *           description: Indica se o usuário trabalha na quinta-feira.
 *         hour_end:
 *           type: string
 *           description: Hora de término do expediente do usuário.
 *         hour_start:
 *           type: string
 *           description: Hora de início do expediente do usuário.
 *         hour_end_lunch:
 *           type: string
 *           description: Hora de término do intervalo de almoço do usuário.
 *         hour_start_lunch:
 *           type: string
 *           description: Hora de início do intervalo de almoço do usuário.
 *         lunch_time_active:
 *           type: boolean
 *           description: Indica se o intervalo de almoço está ativo.
 *         rememberMeToken:
 *           type: string
 *           description: Token de lembrar-me do usuário.
 *         permissions:
 *           type: array
 *           description: Lista de permissões do usuário.
 *           items:
 *             type: string
 *         blacklist:
 *           type: array
 *           description: Lista de itens na lista negra do usuário.
 *           items:
 *             type: string
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: mypassword
 *         celphone: +55 11 99999-9999
 *         document: 123.456.789-00
 *         unity_id: 60f6c7d5d7b9b5a4c8d1c5f1
 *         type: admin
 *         active: true
 *         avatar: https://example.com/avatar.jpg
 *         due_date: 2022-12-31
 *         schedule_obs: "Observações sobre o agendamento"
 *         show_lack: true
 *         exib_minutes: 60
 *         is_friday: true
 *         gender: male
 *         is_saturday: false
 *         is_sunday: false
 *         is_monday: true
 *         is_tuesday: true
 *         is_wednesday: true
 *         is_thursday: true
 *         hour_end: "18:00"
 *         hour_start: "08:00"
 *         hour_end_lunch: "13:00"
 *         hour_start_lunch: "12:00"
 *         lunch_time_active: true
 *         rememberMeToken: "mytoken"
 *         permissions: ["read", "write"]
 *         blacklist: ["item1", "item2"]
 */
const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			immutable: true,
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
			immutable: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			required: true,
			immutable: function () {
				const franchiseeAdmin = roles.includes(this.type)
				return this.type && !franchiseeAdmin;
			},
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
		gender: {
			type: String,

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
		rememberMeToken: {
			type: String,

		},
		permissions: {
			type: Array,

		},
		blacklist: {
			type: Array,
		},
		performs_medical_appointments: {
			type: Boolean,
			default: false,
		},
		board: String,
		occupation_code: String,
		profession: String,
		record: String,
		specialty: String,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await Hash.make(this.password)
	}
	if (this.isNew) {
		this.document = await encrypt(this.document.replace(/\D/g, ''))
	}
	next()
})

UserSchema.post('find', async function (docs) {
	for (const doc of docs) {
		const numbers = doc?.document?.replace(/\D/g, '')

		if (doc?.document && !(numbers.length === 11 || numbers.length === 14)) {
			doc.document = await decrypt(doc.document)
		}
	}
})

UserSchema.post('findOne', async function (doc) {
	const numbers = doc?.document?.replace(/\D/g, '')

	if (doc?.document && !(numbers.length === 11 || numbers.length === 14)) {
		doc.document = await decrypt(doc.document)
	}
})

UserSchema.index({ unity_id: 1, email: 1, document: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })

export default Mongoose.model<IUser>(COLLECTION_NAME, UserSchema)
