import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import type { IUserClient } from 'Types/IClient'

interface IUserClientModel extends Omit<IUserClient, 'prof'> {
	partners: Schema.Types.ObjectId
}

const COLLECTION_NAME = 'clients'

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
 *         gender:
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
		form_answers: [
			{
				form: {
					id: { type: Mongoose.Types.ObjectId, required: true },
					name: { type: String, required: true }
				},
				activity_id: { type: Mongoose.Types.ObjectId, required: true },
				field_answers: [
					{
						question: {
							type: String,
							required: true,
						},
						answer: {
							type: String,
							required: true,
						},
					},
				],
			},
		],
		avatar: {
			type: String,
		},
		birth_date: {
			type: String,
		},
		gender: {
			type: String,
			default: 'not_informed',
		},
		document: {
			type: String,
		},
		rg: {
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
			type: Schema.Types.ObjectId,
			required: false,
			default: null,
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
	if (this.isNew) {
		this.document =
			this.document && (await encrypt(this.document?.replace(/\D/g, '')))
		this.rg = this.rg && (await encrypt(this.rg?.replace(/\D/g, '')))
	}

	next()
})

ClientSchema.post('find', async function (docs) {
	for (const doc of docs) {
		try {
			if (doc?.document) {
				doc.document = await decrypt(doc.document)
			}

			if (doc?.rg) {
				doc.rg = await decrypt(doc.rg)
			}
		} catch (error) {
			console.log('erro na descriptação')
		}
	}
})

ClientSchema.post('findOne', async function (doc) {
	try {
		if (doc?.document) {
			doc.document = await decrypt(doc.document)
		}

		if (doc?.rg) {
			doc.rg = await decrypt(doc.rg)
		}
	} catch (error) {
		console.log('erro na descriptação')
	}
})

ClientSchema.index({ unity_id: 1, name: 1, celphone: 1, birth_date: 1 }, { unique: true })
ClientSchema.index({ unity_id: 1, name: 1, email: 1, birth_date: 1 }, { unique: true })
ClientSchema.index({ unity_id: 1, rg: 1, document: 1, active: 1 }, { unique: false })

// enum de como as coleções referências são chamadas na collection de clientes
export enum COLLECTIONS {
	PARTNERS = 'partner',
	UNITIES = 'unity_id',
}

export default Mongoose.model<IUserClientModel>(COLLECTION_NAME, ClientSchema)
