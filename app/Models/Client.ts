import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import type { IUserClient } from 'Types/IClient'

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         name:
 *           type: string
 *           required: true
 *         avatar:
 *           type: string
 *         birth_date:
 *           type: string
 *         genrer:
 *           type: string
 *         document:
 *           type: string
 *           required: false
 *         celphone:
 *           type: string
 *           required: true
 *         phone:
 *           type: string
 *         naturalness:
 *           type: string
 *         nationality:
 *           type: string
 *         profession:
 *           type: string
 *         observation:
 *           type: string
 *         sms_checked:
 *           type: boolean
 *         mail_checked:
 *           type: boolean
 *         email:
 *           type: string
 *           format: email
 *           required: true
 *         unity_id:
 *           type: string
 *           required: true
 *         active:
 *           type: boolean
 *           default: true
 *         partner:
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
 *       required:
 *         - name
 *         - celphone
 *         - email
 *         - unity_id
 */

const ClientSchema = new Schema<IUserClient>(
	{
		name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		birth_date: {
			type: String,
		},
		genrer: {
			type: String,
			default: 'not informed',
		},
		document: {
			type: String,
		},
		celphone: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		naturalness: {
			type: String,
		},
		nationality: {
			type: String,
		},
		profession: {
			type: String,
		},
		observation: {
			type: String,
		},
		sms_checked: {
			type: Boolean,
			default: false,
		},
		mail_checked: {
			type: Boolean,
			default: false,
		},
		email: {
			type: String,

			default: '',
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		partner: {
			type: String,
		},
		due_date: {
			type: Date,
		},
		cep: {
			type: String,
		},
		street: {
			type: String,
		},
		address_number: {
			type: String,
		},
		complement: {
			type: String,
		},
		neighborhood: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

ClientSchema.pre('save', async function (next) {
	if (!this.document) return next()

	if (this.isNew) {
		this.document = await encrypt(this.document?.replace(/\D/g, ''))
	}

	next()
})

ClientSchema.post('find', async function (docs) {
	for (const doc of docs) {
		if (doc?.document) {
			doc.document = await decrypt(doc.document)
		}
	}
})

ClientSchema.post('findOne', async function (doc) {
	if (doc?.document) {
		doc.document = await decrypt(doc.document)
	}
})

export default Mongoose.model<IUserClient>('clients', ClientSchema, 'clients')
