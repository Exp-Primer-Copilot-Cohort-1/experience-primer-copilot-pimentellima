import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import type { IProfile } from 'App/Types/IUser'

import { COLLECTION_NAME as COLLECTION_UNITY_NAME } from './Unity'
import { COLLECTION_NAME } from './User'

const ProfileSchema = new Schema<IProfile>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			immutable: true,
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
			ref: COLLECTION_UNITY_NAME,
			required: true,
			immutable: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
		avatar: {
			type: String,

		},
		show_lack: {
			type: Boolean,
		},
		gender: {
			type: String,
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
		phone: {
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

ProfileSchema.pre('save', async function (next) {
	if (this.isNew) {
		this.document = await encrypt(this.document.replace(/\D/g, ''))
	}
	next()
})

ProfileSchema.post('find', async function (docs) {
	for (const doc of docs) {
		const numbers = doc?.document?.replace(/\D/g, '')

		if (doc?.document && !(numbers.length === 11 || numbers.length === 14)) {
			doc.document = await decrypt(doc.document)
		}
	}
})

ProfileSchema.post('findOne', async function (doc) {
	doc.document = await decrypt(doc.document)
})

ProfileSchema.index({ unity_id: 1, email: 1, document: 1 }, { unique: true })

export default Mongoose.model<IProfile>('profile', ProfileSchema, COLLECTION_NAME)
