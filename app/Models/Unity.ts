import Mongoose, { Schema } from '@ioc:Mongoose'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import { IPhone, IUnity } from 'Types/IUnity'
import { HolidaySchemaHelper } from './helpers/Holiday'

export const UnitySchema = new Schema<IUnity>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		active: {
			type: Boolean,
			required: true,
		},
		address: {
			type: String,
			required: false,
		},
		address_number: {
			type: String,
			required: false,
		},
		avatar: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: false,
		},
		cep: {
			type: String,
			required: false,
		},
		cnaes: {
			type: Array,
			required: false,
		},
		complement: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: false,
		},
		date_expiration: {
			type: Date,
			required: true,
		},
		document: {
			type: String,
			required: true,
			unique: true,
		},
		is_company: {
			type: Boolean,
			required: true,
		},
		name_company: {
			type: String,
			required: false,
		},
		neighborhood: {
			type: String,
			required: false,
		},
		obs: {
			type: String,
			required: false,
		},
		phones: new Mongoose.SchemaTypeOptions<IPhone[]>(),
		site: {
			type: String,
			required: false,
		},
		state: {
			type: String,
			required: false,
		},
		revenue_reports: {
			type: Object,
			required: false,
		},
		holidays: {
			type: [HolidaySchemaHelper],
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

UnitySchema.index(
	{
		country: 1,
		state: 1,
		city: 1,
		neighborhood: 1,
		address: 1,
		address_number: 1,
	},
	{ unique: true },
)

UnitySchema.pre('save', async function (next) {
	if (this.isNew) {
		this.document =
			this.document && (await encrypt(this.document?.replace(/\D/g, '')))
		this.cnaes = this.cnaes && (await encrypt(this.cnaes))
	}

	next()
})

UnitySchema.post('find', async function (docs) {
	for (const doc of docs) {
		try {
			if (doc?.document) {
				doc.document = await decrypt(doc.document)
			}

			if (doc?.cnaes) {
				doc.cnaes = await decrypt(doc.cnaes)
			}
		} catch (error) {
			console.log('erro na descriptação')
		}
	}
})

UnitySchema.post('findOne', async function (doc) {
	try {
		if (doc?.document) {
			doc.document = await decrypt(doc.document)
		}

		if (doc?.cnaes) {
			doc.cnaes = await decrypt(doc.cnaes)
		}
	} catch (error) {
		console.log('erro na descriptação')
	}
})

export default Mongoose.model<IUnity>('unities', UnitySchema, 'unities')
